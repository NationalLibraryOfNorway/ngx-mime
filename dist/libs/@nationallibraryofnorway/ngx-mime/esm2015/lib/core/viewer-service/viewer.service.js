import { Injectable, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, interval, Subject, Subscription, } from 'rxjs';
import { distinctUntilChanged, sample } from 'rxjs/operators';
import { ModeService } from '../../core/mode-service/mode.service';
import { AltoService } from '../alto-service/alto.service';
import { CalculateCanvasGroupPositionFactory } from '../canvas-group-position/calculate-canvas-group-position-factory';
import { CanvasService } from '../canvas-service/canvas-service';
import { ClickService } from '../click-service/click.service';
import { createSvgOverlay } from '../ext/svg-overlay';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';
import { PinchStatus } from '../models/pinchStatus';
import { Side } from '../models/side';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { Rect } from './../models/rect';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { CanvasGroupMask } from './canvas-group-mask';
import { DefaultGoToCanvasGroupStrategy, } from './go-to-canvas-group-strategy';
import { OptionsFactory } from './options.factory';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';
import { SwipeUtils } from './swipe-utils';
import { TileSourceStrategyFactory } from './tile-source-strategy-factory';
import { DefaultZoomStrategy } from './zoom-strategy';
export class ViewerService {
    constructor(zone, clickService, canvasService, modeService, viewerLayoutService, iiifContentSearchService, styleService, altoService) {
        this.zone = zone;
        this.clickService = clickService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.styleService = styleService;
        this.altoService = altoService;
        this.overlays = [];
        this.tileSources = [];
        this.isCanvasPressed = new BehaviorSubject(false);
        this.currentCenter = new Subject();
        this.currentCanvasIndex = new BehaviorSubject(0);
        this.currentHit = new Subject();
        this.osdIsReady = new BehaviorSubject(false);
        this.swipeDragEndCounter = new SwipeDragEndCounter();
        this.pinchStatus = new PinchStatus();
        this.isManifestPaged = false;
        this.currentSearch = null;
        this.rotation = new BehaviorSubject(0);
        this.dragStatus = false;
        /**
         * Scroll-handler
         */
        this.scrollHandler = (event) => {
            const zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, event.scroll);
            // Scrolling up
            if (event.scroll > 0) {
                this.zoomInGesture(event.position, zoomFactor);
                // Scrolling down
            }
            else if (event.scroll < 0) {
                this.zoomOutGesture(event.position, zoomFactor);
            }
        };
        /**
         * Pinch-handler
         */
        this.pinchHandler = (event) => {
            this.pinchStatus.active = true;
            const zoomFactor = event.distance / event.lastDistance;
            // Pinch Out
            if (event.distance >
                event.lastDistance + ViewerOptions.zoom.pinchZoomThreshold) {
                this.zoomInPinchGesture(event, zoomFactor);
                // Pinch In
            }
            else if (event.distance + ViewerOptions.zoom.pinchZoomThreshold <
                event.lastDistance) {
                this.zoomOutPinchGesture(event, zoomFactor);
            }
        };
        /**
         * Single-click-handler
         * Single-click toggles between page/dashboard-mode if a page is hit
         */
        this.singleClickHandler = (event) => {
            var _a;
            const tileIndex = this.getOverlayIndexFromClickEvent(event);
            const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
            if (requestedCanvasGroupIndex !== -1) {
                this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
            }
            else {
                this.calculateCurrentCanvasGroup((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
            }
            this.modeService.toggleMode();
        };
        /**
         * Double-click-handler
         * Double-click dashboard-mode should go to page-mode
         * Double-click page-mode should
         *    a) Zoom in if page is fitted vertically, or
         *    b) Fit vertically if page is already zoomed in
         */
        this.dblClickHandler = (event) => {
            var _a;
            // Page is fitted vertically, so dbl-click zooms in
            if (this.modeService.mode === ViewerMode.PAGE) {
                this.modeService.mode = ViewerMode.PAGE_ZOOMED;
                this.zoomStrategy.zoomIn(ViewerOptions.zoom.dblClickZoomFactor, event.position);
            }
            else {
                this.modeService.mode = ViewerMode.PAGE;
                const canvasIndex = this.getOverlayIndexFromClickEvent(event);
                const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
                if (requestedCanvasGroupIndex >= 0) {
                    this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
                }
                else {
                    this.calculateCurrentCanvasGroup((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
                }
            }
        };
        this.dragHandler = (e) => {
            this.viewer.panHorizontal = true;
            if (this.modeService.isPageZoomed()) {
                const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
                const vpBounds = this.getViewportBounds();
                const pannedPastCanvasGroup = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, vpBounds);
                const direction = e.direction;
                if ((pannedPastCanvasGroup === Side.LEFT &&
                    SwipeUtils.isDirectionInRightSemicircle(direction)) ||
                    (pannedPastCanvasGroup === Side.RIGHT &&
                        SwipeUtils.isDirectionInLeftSemicircle(direction))) {
                    this.viewer.panHorizontal = false;
                }
            }
        };
    }
    get onRotationChange() {
        return this.rotation.asObservable().pipe(distinctUntilChanged());
    }
    get onCenterChange() {
        return this.currentCenter.asObservable();
    }
    get onCanvasGroupIndexChange() {
        return this.currentCanvasIndex.asObservable().pipe(distinctUntilChanged());
    }
    get onHitChange() {
        return this.currentHit.asObservable().pipe(distinctUntilChanged());
    }
    get onOsdReadyChange() {
        return this.osdIsReady.asObservable().pipe(distinctUntilChanged());
    }
    initialize() {
        this.unsubscribe();
        this.subscriptions = new Subscription();
    }
    getViewer() {
        return this.viewer;
    }
    getTilesources() {
        return this.tileSources;
    }
    getOverlays() {
        return this.overlays;
    }
    getZoom() {
        return this.zoomStrategy.getZoom();
    }
    getMinZoom() {
        return this.zoomStrategy.getMinZoom();
    }
    getMaxZoom() {
        return this.zoomStrategy.getMaxZoom();
    }
    home() {
        if (!this.osdIsReady.getValue()) {
            return;
        }
        this.zoomStrategy.setMinZoom(this.modeService.mode);
        this.goToCanvasGroupStrategy.centerCurrentCanvas();
        this.zoomStrategy.goToHomeZoom();
    }
    goToPreviousCanvasGroup() {
        this.goToCanvasGroupStrategy.goToPreviousCanvasGroup(this.currentCanvasIndex.getValue());
    }
    goToNextCanvasGroup() {
        this.goToCanvasGroupStrategy.goToNextCanvasGroup(this.currentCanvasIndex.getValue());
    }
    goToCanvasGroup(canvasGroupIndex, immediately) {
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: canvasGroupIndex,
            immediately: immediately,
        });
    }
    goToCanvas(canvasIndex, immediately) {
        const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: canvasGroupIndex,
            immediately: immediately,
        });
    }
    highlight(searchResult) {
        this.clearHightlight();
        if (this.viewer) {
            if (searchResult.q) {
                this.currentSearch = searchResult;
            }
            const rotation = this.rotation.getValue();
            for (const hit of searchResult.hits) {
                for (const rect of hit.rects) {
                    const canvasRect = this.canvasService.getCanvasRect(hit.index);
                    if (canvasRect) {
                        let width = rect.width;
                        let height = rect.height;
                        let x = canvasRect.x;
                        let y = canvasRect.y;
                        /* hit rect are relative to each unrotated page canvasRect so x,y must be adjusted by the remaining space */
                        switch (rotation) {
                            case 0:
                                x += rect.x;
                                y += rect.y;
                                break;
                            case 90:
                                x += canvasRect.width - rect.y - rect.height;
                                y += rect.x;
                                /* Flip height & width */
                                width = rect.height;
                                height = rect.width;
                                break;
                            case 180:
                                x += canvasRect.width - (rect.x + rect.width);
                                y += canvasRect.height - (rect.y + rect.height);
                                break;
                            case 270:
                                x += rect.y;
                                y += canvasRect.height - rect.x - rect.width;
                                /* Flip height & width */
                                width = rect.height;
                                height = rect.width;
                                break;
                        }
                        const currentOverlay = this.svgNode
                            .append('rect')
                            .attr('mimeHitIndex', hit.id)
                            .attr('x', x)
                            .attr('y', y)
                            .attr('width', width)
                            .attr('height', height)
                            .attr('class', 'hit');
                    }
                }
            }
        }
    }
    highlightCurrentHit(hit) {
        this.svgNode.selectAll(`g > rect.selected`).attr('class', 'hit');
        this.svgNode
            .selectAll(`g > rect[mimeHitIndex='${hit.id}']`)
            .attr('class', 'hit selected');
    }
    clearHightlight() {
        if (this.svgNode) {
            this.svgNode.selectAll('.hit').remove();
            this.currentSearch = null;
        }
    }
    setUpViewer(manifest, config) {
        this.config = config;
        if (manifest && manifest.tileSource) {
            this.tileSources = manifest.tileSource;
            this.zone.runOutsideAngular(() => {
                this.manifest = manifest;
                this.isManifestPaged = ManifestUtils.isManifestPaged(this.manifest);
                this.viewer = new OpenSeadragon.Viewer(OptionsFactory.create(this.config));
                createSvgOverlay();
                this.zoomStrategy = new DefaultZoomStrategy(this.viewer, this.canvasService, this.modeService, this.viewerLayoutService);
                this.goToCanvasGroupStrategy = new DefaultGoToCanvasGroupStrategy(this.viewer, this.zoomStrategy, this.canvasService, this.modeService, this.config, this.manifest.viewingDirection);
                /*
                  This disables keyboard navigation in openseadragon.
                  We use s for opening search dialog and OSD use the same key for panning.
                  Issue: https://github.com/openseadragon/openseadragon/issues/794
                 */
                this.defaultKeyDownHandler = this.viewer.innerTracker.keyDownHandler;
                this.disableKeyDownHandler();
                this.viewer.innerTracker.keyHandler = null;
                this.canvasService.reset();
                this.canvasGroupMask = new CanvasGroupMask(this.viewer, this.styleService);
            });
            this.addToWindow();
            this.setupOverlays();
            this.createOverlays();
            this.addEvents();
            this.addSubscriptions();
        }
    }
    addSubscriptions() {
        this.initialize();
        this.subscriptions.add(this.modeService.onChange.subscribe((mode) => {
            this.modeChanged(mode);
        }));
        this.zone.runOutsideAngular(() => {
            this.subscriptions.add(this.onCenterChange
                .pipe(sample(interval(500)))
                .subscribe((center) => {
                this.calculateCurrentCanvasGroup(center);
                if (center && center !== null) {
                    this.osdIsReady.next(true);
                }
            }));
        });
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.swipeDragEndCounter.reset();
            if (canvasGroupIndex !== -1) {
                this.canvasGroupMask.changeCanvasGroup(this.canvasService.getCanvasGroupRect(canvasGroupIndex));
                if (this.modeService.mode === ViewerMode.PAGE) {
                    this.zoomStrategy.goToHomeZoom();
                }
            }
        }));
        this.subscriptions.add(this.onOsdReadyChange.subscribe((state) => {
            var _a;
            if (state) {
                this.initialCanvasGroupLoaded();
                this.currentCenter.next((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
            }
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((state) => {
            this.layoutPages();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit) {
                this.highlightCurrentHit(hit);
                this.goToCanvas(hit.index, false);
            }
        }));
        this.subscriptions.add(this.onRotationChange.subscribe((rotation) => {
            this.layoutPages();
        }));
    }
    layoutPages() {
        if (this.osdIsReady.getValue()) {
            const currentCanvasIndex = this.canvasService.currentCanvasIndex;
            this.destroy(true);
            this.setUpViewer(this.manifest, this.config);
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: this.canvasService.findCanvasGroupByCanvasIndex(currentCanvasIndex),
                immediately: false,
            });
            // Recreate highlights if there is an active search going on
            if (this.currentSearch) {
                this.highlight(this.currentSearch);
            }
        }
    }
    addToWindow() {
        window.openSeadragonViewer = this.viewer;
    }
    setupOverlays() {
        this.svgOverlay = this.viewer.svgOverlay();
        this.svgNode = d3.select(this.svgOverlay.node());
    }
    disableKeyDownHandler() {
        this.viewer.innerTracker.keyDownHandler = null;
    }
    resetKeyDownHandler() {
        this.viewer.innerTracker.keyDownHandler = this.defaultKeyDownHandler;
    }
    /**
     *
     * @param layoutSwitch true if switching between layouts
     * to keep current search-state and rotation
     */
    destroy(layoutSwitch) {
        this.osdIsReady.next(false);
        this.currentCenter.next(undefined);
        if (this.viewer != null && this.viewer.isOpen()) {
            if (this.viewer.container != null) {
                d3.select(this.viewer.container.parentNode).style('opacity', '0');
            }
            this.viewer.destroy();
            this.viewer = null;
        }
        this.overlays = [];
        this.canvasService.reset();
        if (this.canvasGroupMask) {
            this.canvasGroupMask.destroy();
        }
        // Keep search-state and rotation only if layout-switch
        if (!layoutSwitch) {
            this.altoService.destroy();
            this.currentSearch = null;
            this.iiifContentSearchService.destroy();
            this.rotation.next(0);
            this.unsubscribe();
        }
    }
    addEvents() {
        this.clickService.reset();
        this.clickService.addSingleClickHandler(this.singleClickHandler);
        this.clickService.addDoubleClickHandler(this.dblClickHandler);
        this.viewer.addHandler('animation-finish', () => {
            var _a;
            this.currentCenter.next((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
        });
        this.viewer.addHandler('canvas-click', this.clickService.click);
        this.viewer.addHandler('canvas-double-click', (e) => (e.preventDefaultAction = true));
        this.viewer.addHandler('canvas-press', (e) => {
            this.pinchStatus.active = false;
            this.dragStartPosition = e.position;
            this.isCanvasPressed.next(true);
        });
        this.viewer.addHandler('canvas-release', () => this.isCanvasPressed.next(false));
        this.viewer.addHandler('canvas-scroll', this.scrollHandler);
        this.viewer.addHandler('canvas-pinch', this.pinchHandler);
        this.viewer.addHandler('canvas-drag', (e) => {
            this.dragStatus = true;
            this.dragHandler(e);
        });
        this.viewer.addHandler('canvas-drag-end', (e) => {
            if (this.dragStatus) {
                this.constraintCanvas();
                this.swipeToCanvasGroup(e);
            }
            this.dragStatus = false;
        });
        this.viewer.addHandler('animation', (e) => {
            var _a;
            this.currentCenter.next((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
        });
    }
    zoomIn(zoomFactor, position) {
        this.zoomStrategy.zoomIn(zoomFactor, position);
    }
    zoomOut(zoomFactor, position) {
        this.zoomStrategy.zoomOut(zoomFactor, position);
    }
    rotate() {
        if (this.osdIsReady.getValue()) {
            this.rotation.next((this.rotation.getValue() + 90) % 360);
        }
    }
    /**
     * Callback for mode-change
     * @param mode ViewerMode
     */
    modeChanged(mode) {
        if (mode.currentValue === ViewerMode.DASHBOARD) {
            this.viewer.panVertical = false;
            this.toggleToDashboard();
            this.disableKeyDownHandler();
        }
        else if (mode.currentValue === ViewerMode.PAGE) {
            this.viewer.panVertical = false;
            this.toggleToPage();
            this.disableKeyDownHandler();
        }
        else if (mode.currentValue === ViewerMode.PAGE_ZOOMED) {
            this.viewer.panVertical = true;
            this.resetKeyDownHandler();
        }
    }
    /**
     * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
     */
    toggleToDashboard() {
        if (!this.canvasService.isCurrentCanvasGroupValid()) {
            return;
        }
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
            immediately: false,
        });
        this.canvasGroupMask.hide();
        this.zoomStrategy.setMinZoom(ViewerMode.DASHBOARD);
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
     */
    toggleToPage() {
        if (!this.canvasService.isCurrentCanvasGroupValid()) {
            return;
        }
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
            immediately: false,
        });
        this.canvasGroupMask.show();
        this.zoomStrategy.setMinZoom(ViewerMode.PAGE);
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     *
     * @param point to zoom to. If not set, the viewer will zoom to center
     */
    zoomInGesture(position, zoomFactor) {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.mode = ViewerMode.PAGE;
        }
        else {
            if (position) {
                this.zoomStrategy.zoomIn(zoomFactor, position);
            }
            else {
                this.zoomStrategy.zoomIn();
            }
        }
    }
    zoomOutGesture(position, zoomFactor) {
        if (this.modeService.isPageZoomed()) {
            this.zoomStrategy.zoomOut(zoomFactor, position);
        }
        else if (this.modeService.mode === ViewerMode.PAGE) {
            this.modeService.mode = ViewerMode.DASHBOARD;
        }
    }
    /**
     * Process zoom in pinch gesture (pinch out)
     *
     * Toggle to page mode and Zoom in
     *
     * @param event from pinch gesture
     */
    zoomInPinchGesture(event, zoomFactor) {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.mode = ViewerMode.PAGE;
        }
        else {
            this.zoomIn(zoomFactor, this.dragStartPosition || event.center);
        }
    }
    /**
     * Process zoom out pinch gesture (pinch in)
     *
     * Zoom out and toggle to dashboard when all zoomed out.
     * Stop between zooming out and toggling to dashboard.
     *
     * @param event from pinch gesture
     */
    zoomOutPinchGesture(event, zoomFactor) {
        const gestureId = event.gesturePoints[0].id;
        if (this.modeService.isPageZoomed()) {
            this.pinchStatus.shouldStop = true;
            this.zoomStrategy.zoomOut(zoomFactor, event.center);
        }
        else if (this.modeService.mode === ViewerMode.PAGE) {
            if (!this.pinchStatus.shouldStop ||
                gestureId === this.pinchStatus.previousGestureId + 2) {
                this.pinchStatus.shouldStop = false;
                this.modeService.toggleMode();
            }
            this.pinchStatus.previousGestureId = gestureId;
        }
    }
    goToHomeZoom() {
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     * Checks if hit element is a <rect>-element
     * @param target
     */
    isCanvasGroupHit(target) {
        return target instanceof SVGRectElement;
    }
    /**
     * Iterates tilesources and adds them to viewer
     * Creates svg clickable overlays for each tile
     */
    createOverlays() {
        this.overlays = [];
        const canvasRects = [];
        const calculateCanvasGroupPositionStrategy = CalculateCanvasGroupPositionFactory.create(this.viewerLayoutService.layout, this.isManifestPaged);
        const isTwoPageView = this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE;
        const rotation = this.rotation.getValue();
        let group = this.svgNode.append('g').attr('class', 'page-group');
        this.tileSources.forEach((tile, i) => {
            const position = calculateCanvasGroupPositionStrategy.calculateCanvasGroupPosition({
                canvasGroupIndex: i,
                canvasSource: tile,
                previousCanvasGroupPosition: canvasRects[i - 1],
                viewingDirection: this.manifest.viewingDirection,
            }, rotation);
            canvasRects.push(position);
            const tileSourceStrategy = TileSourceStrategyFactory.create(tile);
            const tileSource = tileSourceStrategy.getTileSource(tile);
            this.zone.runOutsideAngular(() => {
                const rotated = rotation === 90 || rotation === 270;
                let bounds;
                /* Because image scaling is performed before rotation,
                 * we must invert width & height and translate position so that tile rotation ends up correct
                 */
                if (rotated) {
                    bounds = new OpenSeadragon.Rect(position.x + (position.width - position.height) / 2, position.y - (position.width - position.height) / 2, position.height, position.width);
                }
                else {
                    bounds = new OpenSeadragon.Rect(position.x, position.y, position.width, position.height);
                }
                this.viewer.addTiledImage({
                    index: i,
                    tileSource: tileSource,
                    fitBounds: bounds,
                    degrees: rotation,
                });
            });
            if (isTwoPageView && i % 2 !== 0) {
                group = this.svgNode.append('g').attr('class', 'page-group');
            }
            const currentOverlay = group
                .append('rect')
                .attr('x', position.x)
                .attr('y', position.y)
                .attr('width', position.width)
                .attr('height', position.height)
                .attr('class', 'tile');
            // Make custom borders if current layout is two-paged
            if (isTwoPageView) {
                if (i % 2 === 0 && i !== 0) {
                    const noLeftStrokeStyle = Number(position.width * 2 + position.height) +
                        ', ' +
                        position.width * 2;
                    currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
                }
                else if (i % 2 !== 0 && i !== 0) {
                    const noRightStrokeStyle = position.width +
                        ', ' +
                        position.height +
                        ', ' +
                        Number(position.width * 2 + position.height);
                    currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
                }
            }
            const currentOverlayNode = currentOverlay.node();
            this.overlays[i] = currentOverlayNode;
        });
        const layout = this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ||
            !this.isManifestPaged
            ? ViewerLayout.ONE_PAGE
            : ViewerLayout.TWO_PAGE;
        this.canvasService.addAll(canvasRects, layout);
    }
    /**
     * Sets viewer size and opacity once the first canvas group has fully loaded
     */
    initialCanvasGroupLoaded() {
        this.home();
        this.canvasGroupMask.initialize(this.canvasService.getCurrentCanvasGroupRect(), this.modeService.mode !== ViewerMode.DASHBOARD);
        if (this.viewer) {
            d3.select(this.viewer.container.parentNode)
                .transition()
                .duration(ViewerOptions.transitions.OSDAnimationTime)
                .style('opacity', '1');
        }
    }
    /**
     * Returns overlay-index for click-event if hit
     * @param target hit <rect>
     */
    getOverlayIndexFromClickEvent(event) {
        const target = this.getOriginalTarget(event);
        if (this.isCanvasGroupHit(target)) {
            const requestedCanvasGroup = this.overlays.indexOf(target);
            if (requestedCanvasGroup >= 0) {
                return requestedCanvasGroup;
            }
        }
        return -1;
    }
    calculateCurrentCanvasGroup(center) {
        if (center) {
            const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(center);
            this.currentCanvasIndex.next(currentCanvasGroupIndex);
        }
    }
    constraintCanvas() {
        if (this.modeService.isPageZoomed()) {
            const viewportBounds = this.getViewportBounds();
            const currentCanvasBounds = this.getCurrentCanvasBounds();
            this.isCanvasOutsideViewport(viewportBounds, currentCanvasBounds)
                ? this.constraintCanvasOutsideViewport(viewportBounds, currentCanvasBounds)
                : this.constraintCanvasInsideViewport(viewportBounds);
        }
    }
    getCurrentCanvasBounds() {
        return this.viewer.world
            .getItemAt(this.canvasService.currentCanvasGroupIndex)
            .getBounds();
    }
    isCanvasOutsideViewport(viewportBounds, canvasBounds) {
        return viewportBounds.height < canvasBounds.height;
    }
    constraintCanvasOutsideViewport(viewportBounds, canvasBounds) {
        let rect = undefined;
        if (this.isCanvasBelowViewportTop(viewportBounds, canvasBounds)) {
            rect = new Rect({
                x: viewportBounds.x + viewportBounds.width / 2,
                y: canvasBounds.y + viewportBounds.height / 2,
            });
        }
        else if (this.isCanvasAboveViewportBottom(viewportBounds, canvasBounds)) {
            rect = new Rect({
                x: viewportBounds.x + viewportBounds.width / 2,
                y: canvasBounds.y + canvasBounds.height - viewportBounds.height / 2,
            });
        }
        this.panTo(rect, true);
    }
    constraintCanvasInsideViewport(viewportBounds) {
        const canvasGroupRect = this.canvasService.getCanvasGroupRect(this.canvasService.currentCanvasGroupIndex);
        const rect = new Rect({
            x: viewportBounds.x + viewportBounds.width / 2,
            y: canvasGroupRect.centerY,
        });
        this.panTo(rect, true);
    }
    isCanvasBelowViewportTop(viewportBounds, canvasBounds) {
        return viewportBounds.y < canvasBounds.y;
    }
    isCanvasAboveViewportBottom(viewportBounds, canvasBounds) {
        return (canvasBounds.y + canvasBounds.height <
            viewportBounds.y + viewportBounds.height);
    }
    swipeToCanvasGroup(e) {
        // Don't swipe on pinch actions
        if (this.pinchStatus.active) {
            return;
        }
        const speed = e.speed;
        const dragEndPosision = e.position;
        const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
        const viewportBounds = this.getViewportBounds();
        const direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, this.modeService.isPageZoomed());
        const currentCanvasGroupIndex = this.canvasService
            .currentCanvasGroupIndex;
        const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);
        let pannedPastSide;
        let canvasGroupEndHitCountReached = false;
        if (this.modeService.isPageZoomed()) {
            pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
            this.swipeDragEndCounter.addHit(pannedPastSide, direction);
            canvasGroupEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
        }
        const newCanvasGroupIndex = this.canvasService.constrainToRange(calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
            currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
            speed: speed,
            direction: direction,
            currentCanvasGroupIndex: currentCanvasGroupIndex,
            canvasGroupEndHitCountReached: canvasGroupEndHitCountReached,
            viewingDirection: this.manifest.viewingDirection,
        }));
        if (this.modeService.mode === ViewerMode.DASHBOARD ||
            this.modeService.mode === ViewerMode.PAGE ||
            (canvasGroupEndHitCountReached && direction)) {
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: newCanvasGroupIndex,
                immediately: false,
                direction: direction,
            });
        }
    }
    getViewportBounds() {
        var _a;
        return (_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getBounds();
    }
    getOriginalTarget(event) {
        return event.originalTarget
            ? event.originalTarget
            : event.originalEvent.target;
    }
    panTo(rect, immediately = false) {
        if (rect) {
            this.viewer.viewport.panTo({
                x: rect.x,
                y: rect.y,
            }, immediately);
        }
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
ViewerService.decorators = [
    { type: Injectable }
];
ViewerService.ctorParameters = () => [
    { type: NgZone },
    { type: ClickService },
    { type: CanvasService },
    { type: ModeService },
    { type: ViewerLayoutService },
    { type: IiifContentSearchService },
    { type: StyleService },
    { type: AltoService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFFUixPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDdkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFLN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFHckYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsOEJBQThCLEdBRS9CLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBS3BFLE1BQU0sT0FBTyxhQUFhO0lBaUN4QixZQUNVLElBQVksRUFDWixZQUEwQixFQUMxQixhQUE0QixFQUM1QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsd0JBQWtELEVBQ2xELFlBQTBCLEVBQzFCLFdBQXdCO1FBUHhCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFuQzFCLGFBQVEsR0FBMEIsRUFBRSxDQUFDO1FBQ3JDLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUduQyxvQkFBZSxHQUFxQixJQUFJLGVBQWUsQ0FDNUQsS0FBSyxDQUNOLENBQUM7UUFFTSxrQkFBYSxHQUFtQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlDLHVCQUFrQixHQUE0QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNoQyxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDakQsd0JBQW1CLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBRWhELGdCQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUdoQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd6QixrQkFBYSxHQUF3QixJQUFJLENBQUM7UUFJekMsYUFBUSxHQUE0QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBb2QzQjs7V0FFRztRQUNILGtCQUFhLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxlQUFlO1lBQ2YsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxpQkFBaUI7YUFDbEI7aUJBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxDQUFDO1FBRUY7O1dBRUc7UUFDSCxpQkFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUN2RCxZQUFZO1lBQ1osSUFDRSxLQUFLLENBQUMsUUFBUTtnQkFDZCxLQUFLLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQzFEO2dCQUNBLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzNDLFdBQVc7YUFDWjtpQkFBTSxJQUNMLEtBQUssQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ3RELEtBQUssQ0FBQyxZQUFZLEVBQ2xCO2dCQUNBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDN0M7UUFDSCxDQUFDLENBQUM7UUFzRUY7OztXQUdHO1FBQ0gsdUJBQWtCLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7WUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVELE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FDL0UsU0FBUyxDQUNWLENBQUM7WUFDRixJQUFJLHlCQUF5QixLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO2FBQ3hFO2lCQUFNO2dCQUNMLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN6RTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ0gsb0JBQWUsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFOztZQUMvQixtREFBbUQ7WUFDbkQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdEIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FDZixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDeEMsTUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RSxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQy9FLFdBQVcsQ0FDWixDQUFDO2dCQUNGLElBQUkseUJBQXlCLElBQUksQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO2lCQUN4RTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUErSk0sZ0JBQVcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ25DLE1BQU0sZUFBZSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQztnQkFDN0UsTUFBTSxRQUFRLEdBQVMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ2hELE1BQU0scUJBQXFCLEdBQUcsVUFBVSxDQUFDLG9DQUFvQyxDQUMzRSxlQUFlLEVBQ2YsUUFBUSxDQUNULENBQUM7Z0JBQ0YsTUFBTSxTQUFTLEdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDdEMsSUFDRSxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxJQUFJO29CQUNsQyxVQUFVLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JELENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLEtBQUs7d0JBQ25DLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUNwRDtvQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7aUJBQ25DO2FBQ0Y7UUFDSCxDQUFDLENBQUM7SUE5d0JDLENBQUM7SUFFSixJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSx3QkFBd0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSx1QkFBdUI7UUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHVCQUF1QixDQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVNLGVBQWUsQ0FBQyxnQkFBd0IsRUFBRSxXQUFvQjtRQUNuRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sVUFBVSxDQUFDLFdBQW1CLEVBQUUsV0FBb0I7UUFDekQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUN0RSxXQUFXLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsZ0JBQWdCLEVBQUUsZ0JBQWdCO1lBQ2xDLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxTQUFTLENBQUMsWUFBMEI7UUFDekMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7YUFDbkM7WUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRTFDLEtBQUssTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDbkMsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9ELElBQUksVUFBVSxFQUFFO3dCQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBRXJCLDRHQUE0Rzt3QkFDNUcsUUFBUSxRQUFRLEVBQUU7NEJBQ2hCLEtBQUssQ0FBQztnQ0FDSixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDWixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDWixNQUFNOzRCQUVSLEtBQUssRUFBRTtnQ0FDTCxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0NBQzdDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNaLHlCQUF5QjtnQ0FDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0NBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dDQUNwQixNQUFNOzRCQUVSLEtBQUssR0FBRztnQ0FDTixDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUM5QyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNoRCxNQUFNOzRCQUVSLEtBQUssR0FBRztnQ0FDTixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDWixDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBQzdDLHlCQUF5QjtnQ0FDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0NBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dDQUNwQixNQUFNO3lCQUNUO3dCQUVELE1BQU0sY0FBYyxHQUFtQixJQUFJLENBQUMsT0FBTzs2QkFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQzs2QkFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7NkJBQzVCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDOzZCQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDOzZCQUNaLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDOzZCQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzs2QkFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEdBQVE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPO2FBQ1QsU0FBUyxDQUFDLDBCQUEwQixHQUFHLENBQUMsRUFBRSxJQUFJLENBQUM7YUFDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWtCLEVBQUUsTUFBd0I7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FDcEMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixDQUN6QyxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSw4QkFBOEIsQ0FDL0QsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQy9CLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQ3hDLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsY0FBYztpQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsU0FBUyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxNQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO1lBQ0gsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUNuRCxDQUFDLGdCQUF3QixFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLElBQUksZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FDeEQsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ2xDO2FBQ0Y7UUFDSCxDQUFDLENBQ0YsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRTs7WUFDakQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQWUsRUFBRSxFQUFFO1lBQ3JFLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzlCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztnQkFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FDL0Qsa0JBQWtCLENBQ25CO2dCQUNELFdBQVcsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNILE1BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxZQUFzQjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7Z0JBQ2pDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFOztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNwQixxQkFBcUIsRUFDckIsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUM1QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7O1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFtQixFQUFFLFFBQWdCO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQW1CLEVBQUUsUUFBZ0I7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsSUFBaUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUI7WUFDNUQsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLEVBQUU7WUFDbkQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QjtZQUM1RCxXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFxQ0Q7OztPQUdHO0lBQ0gsYUFBYSxDQUFDLFFBQWUsRUFBRSxVQUFtQjtRQUNoRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUN6QzthQUFNO1lBQ0wsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZSxFQUFFLFVBQW1CO1FBQ2pELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDakQ7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsVUFBa0I7UUFDL0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDekM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILG1CQUFtQixDQUFDLEtBQVUsRUFBRSxVQUFrQjtRQUNoRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDcEQsSUFDRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtnQkFDNUIsU0FBUyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUNwRDtnQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDL0I7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBZ0REOzs7T0FHRztJQUNILGdCQUFnQixDQUFDLE1BQW1CO1FBQ2xDLE9BQU8sTUFBTSxZQUFZLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sV0FBVyxHQUFXLEVBQUUsQ0FBQztRQUMvQixNQUFNLG9DQUFvQyxHQUFHLG1DQUFtQyxDQUFDLE1BQU0sQ0FDckYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDNUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sUUFBUSxHQUFHLG9DQUFvQyxDQUFDLDRCQUE0QixDQUNoRjtnQkFDRSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsMkJBQTJCLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCO2FBQ2pELEVBQ0QsUUFBUSxDQUNULENBQUM7WUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTNCLE1BQU0sa0JBQWtCLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDL0IsTUFBTSxPQUFPLEdBQUcsUUFBUSxLQUFLLEVBQUUsSUFBSSxRQUFRLEtBQUssR0FBRyxDQUFDO2dCQUVwRCxJQUFJLE1BQU0sQ0FBQztnQkFFWDs7bUJBRUc7Z0JBQ0gsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FDN0IsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFDbkQsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFDbkQsUUFBUSxDQUFDLE1BQU0sRUFDZixRQUFRLENBQUMsS0FBSyxDQUNmLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FDN0IsUUFBUSxDQUFDLENBQUMsRUFDVixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsUUFBUSxDQUFDLE1BQU0sQ0FDaEIsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLFNBQVMsRUFBRSxNQUFNO29CQUNqQixPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGFBQWEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDOUQ7WUFFRCxNQUFNLGNBQWMsR0FBRyxLQUFLO2lCQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDO2lCQUNkLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV6QixxREFBcUQ7WUFDckQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsTUFBTSxpQkFBaUIsR0FDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQzVDLElBQUk7d0JBQ0osUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ3JCLGNBQWMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDN0Q7cUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNqQyxNQUFNLGtCQUFrQixHQUN0QixRQUFRLENBQUMsS0FBSzt3QkFDZCxJQUFJO3dCQUNKLFFBQVEsQ0FBQyxNQUFNO3dCQUNmLElBQUk7d0JBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0MsY0FBYyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM5RDthQUNGO1lBRUQsTUFBTSxrQkFBa0IsR0FBbUIsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3pELENBQUMsSUFBSSxDQUFDLGVBQWU7WUFDbkIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsRUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FDL0MsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2lCQUN4QyxVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3BELEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsNkJBQTZCLENBQUMsS0FBVTtRQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsTUFBTSxvQkFBb0IsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxJQUFJLG9CQUFvQixJQUFJLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxvQkFBb0IsQ0FBQzthQUM3QjtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTywyQkFBMkIsQ0FBQyxNQUFhO1FBQy9DLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUM1RSxNQUFNLENBQ1AsQ0FBQztZQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUF1Qk8sZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNuQyxNQUFNLGNBQWMsR0FBUyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN0RCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzFELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQ2xDLGNBQWMsRUFDZCxtQkFBbUIsQ0FDcEI7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7YUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7YUFDckQsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUF1QixDQUM3QixjQUFvQixFQUNwQixZQUFrQjtRQUVsQixPQUFPLGNBQWMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRU8sK0JBQStCLENBQ3JDLGNBQW9CLEVBQ3BCLFlBQWtCO1FBRWxCLElBQUksSUFBSSxHQUFxQixTQUFTLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQy9ELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztnQkFDZCxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQzlDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzthQUM5QyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLDJCQUEyQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUN6RSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUM5QyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzthQUNwRSxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyw4QkFBOEIsQ0FBQyxjQUFvQjtRQUN6RCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUMzQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDcEIsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQzlDLENBQUMsRUFBRSxlQUFlLENBQUMsT0FBTztTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8sd0JBQXdCLENBQzlCLGNBQW9CLEVBQ3BCLFlBQWtCO1FBRWxCLE9BQU8sY0FBYyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTywyQkFBMkIsQ0FDakMsY0FBb0IsRUFDcEIsWUFBa0I7UUFFbEIsT0FBTyxDQUNMLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU07WUFDcEMsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVPLGtCQUFrQixDQUFDLENBQU07UUFDL0IsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRW5DLE1BQU0sZUFBZSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUM3RSxNQUFNLGNBQWMsR0FBUyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV0RCxNQUFNLFNBQVMsR0FBYyxVQUFVLENBQUMsaUJBQWlCLENBQ3ZELElBQUksQ0FBQyxpQkFBaUIsRUFDdEIsZUFBZSxFQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQ2hDLENBQUM7UUFFRixNQUFNLHVCQUF1QixHQUFXLElBQUksQ0FBQyxhQUFhO2FBQ3ZELHVCQUF1QixDQUFDO1FBQzNCLE1BQU0sZ0NBQWdDLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdEIsQ0FBQztRQUVGLElBQUksY0FBMkIsQ0FBQztRQUNoQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDbkMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FDOUQsZUFBZSxFQUNmLGNBQWMsQ0FDZixDQUFDO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0QsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzVFO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUM3RCxnQ0FBZ0MsQ0FBQyx3QkFBd0IsQ0FBQztZQUN4RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFO1lBQzVELEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLFNBQVM7WUFDcEIsdUJBQXVCLEVBQUUsdUJBQXVCO1lBQ2hELDZCQUE2QixFQUFFLDZCQUE2QjtZQUM1RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQjtTQUNqRCxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDekMsQ0FBQyw2QkFBNkIsSUFBSSxTQUFTLENBQUMsRUFDNUM7WUFDQSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO2dCQUMzQyxnQkFBZ0IsRUFBRSxtQkFBbUI7Z0JBQ3JDLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixTQUFTLEVBQUUsU0FBUzthQUNyQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxpQkFBaUI7O1FBQ3ZCLE9BQU8sTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQVU7UUFDbEMsT0FBTyxLQUFLLENBQUMsY0FBYztZQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWM7WUFDdEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxLQUFLLENBQUMsSUFBc0IsRUFBRSxXQUFXLEdBQUcsS0FBSztRQUN2RCxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDeEI7Z0JBQ0UsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNWLEVBQ0QsV0FBVyxDQUNaLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7O1lBeDlCRixVQUFVOzs7WUEvQ1UsTUFBTTtZQWNsQixZQUFZO1lBRFosYUFBYTtZQUhiLFdBQVc7WUFrQlgsbUJBQW1CO1lBWm5CLHdCQUF3QjtZQVd4QixZQUFZO1lBaEJaLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgaW50ZXJ2YWwsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2FtcGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z092ZXJsYXkgfSBmcm9tICcuLi9leHQvc3ZnLW92ZXJsYXknO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvZGlyZWN0aW9uJztcbmltcG9ydCB7IE1hbmlmZXN0LCBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBQaW5jaFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9waW5jaFN0YXR1cyc7XG5pbXBvcnQgeyBTaWRlIH0gZnJvbSAnLi4vbW9kZWxzL3NpZGUnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkgfSBmcm9tICcuL2NhbGN1bGF0ZS1uZXh0LWNhbnZhcy1ncm91cC1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc0dyb3VwTWFzayB9IGZyb20gJy4vY2FudmFzLWdyb3VwLW1hc2snO1xuaW1wb3J0IHtcbiAgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LFxuICBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbn0gZnJvbSAnLi9nby10by1jYW52YXMtZ3JvdXAtc3RyYXRlZ3knO1xuaW1wb3J0IHsgT3B0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL29wdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBTd2lwZURyYWdFbmRDb3VudGVyIH0gZnJvbSAnLi9zd2lwZS1kcmFnLWVuZC1jb3VudGVyJztcbmltcG9ydCB7IFN3aXBlVXRpbHMgfSBmcm9tICcuL3N3aXBlLXV0aWxzJztcbmltcG9ydCB7IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3RpbGUtc291cmNlLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgRGVmYXVsdFpvb21TdHJhdGVneSwgWm9vbVN0cmF0ZWd5IH0gZnJvbSAnLi96b29tLXN0cmF0ZWd5JztcblxuZGVjbGFyZSBjb25zdCBPcGVuU2VhZHJhZ29uOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI/OiBhbnk7XG4gIHByaXZhdGUgc3ZnT3ZlcmxheTogYW55O1xuICBwcml2YXRlIHN2Z05vZGU6IGFueTtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PiA9IFtdO1xuICBwcml2YXRlIHRpbGVTb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIHB1YmxpYyBpc0NhbnZhc1ByZXNzZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIGZhbHNlXG4gICk7XG5cbiAgcHJpdmF0ZSBjdXJyZW50Q2VudGVyOiBTdWJqZWN0PFBvaW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudENhbnZhc0luZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgY3VycmVudEhpdCA9IG5ldyBTdWJqZWN0PEhpdD4oKTtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgZHJhZ1N0YXR1cyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2VcbiAgKSB7fVxuXG4gIGdldCBvblJvdGF0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRpb24uYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNlbnRlckNoYW5nZSgpOiBPYnNlcnZhYmxlPFBvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENlbnRlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkhpdENoYW5nZSgpOiBPYnNlcnZhYmxlPEhpdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRIaXQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk9zZFJlYWR5Q2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm9zZElzUmVhZHkuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaWV3ZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGlsZXNvdXJjZXMoKTogUmVzb3VyY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZVNvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3ZlcmxheXMoKTogU1ZHUmVjdEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluWm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNaW5ab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNYXhab29tKCk7XG4gIH1cblxuICBwdWJsaWMgaG9tZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20odGhpcy5tb2RlU2VydmljZS5tb2RlKTtcblxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuY2VudGVyQ3VycmVudENhbnZhcygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvUHJldmlvdXNDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9OZXh0Q2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvTmV4dENhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbnZhc0dyb3VwKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiBjYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGltbWVkaWF0ZWx5LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXMoY2FudmFzSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICBjYW52YXNJbmRleFxuICAgICk7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogY2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBpbW1lZGlhdGVseSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoaWdobGlnaHQoc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFySGlnaHRsaWdodCgpO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgaWYgKHNlYXJjaFJlc3VsdC5xKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNlYXJjaFJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG5cbiAgICAgIGZvciAoY29uc3QgaGl0IG9mIHNlYXJjaFJlc3VsdC5oaXRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVjdCBvZiBoaXQucmVjdHMpIHtcbiAgICAgICAgICBjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc1JlY3QoaGl0LmluZGV4KTtcbiAgICAgICAgICBpZiAoY2FudmFzUmVjdCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGxldCB4ID0gY2FudmFzUmVjdC54O1xuICAgICAgICAgICAgbGV0IHkgPSBjYW52YXNSZWN0Lnk7XG5cbiAgICAgICAgICAgIC8qIGhpdCByZWN0IGFyZSByZWxhdGl2ZSB0byBlYWNoIHVucm90YXRlZCBwYWdlIGNhbnZhc1JlY3Qgc28geCx5IG11c3QgYmUgYWRqdXN0ZWQgYnkgdGhlIHJlbWFpbmluZyBzcGFjZSAqL1xuICAgICAgICAgICAgc3dpdGNoIChyb3RhdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSA5MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSByZWN0LnkgLSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB5ICs9IHJlY3QueDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTgwOlxuICAgICAgICAgICAgICAgIHggKz0gY2FudmFzUmVjdC53aWR0aCAtIChyZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgICAgICB4ICs9IHJlY3QueTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gcmVjdC54IC0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T3ZlcmxheTogU1ZHUmVjdEVsZW1lbnQgPSB0aGlzLnN2Z05vZGVcbiAgICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgIC5hdHRyKCdtaW1lSGl0SW5kZXgnLCBoaXQuaWQpXG4gICAgICAgICAgICAgIC5hdHRyKCd4JywgeClcbiAgICAgICAgICAgICAgLmF0dHIoJ3knLCB5KVxuICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlnaGxpZ2h0Q3VycmVudEhpdChoaXQ6IEhpdCkge1xuICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoYGcgPiByZWN0LnNlbGVjdGVkYCkuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgdGhpcy5zdmdOb2RlXG4gICAgICAuc2VsZWN0QWxsKGBnID4gcmVjdFttaW1lSGl0SW5kZXg9JyR7aGl0LmlkfSddYClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQgc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpZ2h0bGlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ZnTm9kZSkge1xuICAgICAgdGhpcy5zdmdOb2RlLnNlbGVjdEFsbCgnLmhpdCcpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRVcFZpZXdlcihtYW5pZmVzdDogTWFuaWZlc3QsIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC50aWxlU291cmNlKSB7XG4gICAgICB0aGlzLnRpbGVTb3VyY2VzID0gbWFuaWZlc3QudGlsZVNvdXJjZTtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWQgPSBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZCh0aGlzLm1hbmlmZXN0KTtcbiAgICAgICAgdGhpcy52aWV3ZXIgPSBuZXcgT3BlblNlYWRyYWdvbi5WaWV3ZXIoXG4gICAgICAgICAgT3B0aW9uc0ZhY3RvcnkuY3JlYXRlKHRoaXMuY29uZmlnKVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVTdmdPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRab29tU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgIHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgVGhpcyBkaXNhYmxlcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIG9wZW5zZWFkcmFnb24uXG4gICAgICAgICAgV2UgdXNlIHMgZm9yIG9wZW5pbmcgc2VhcmNoIGRpYWxvZyBhbmQgT1NEIHVzZSB0aGUgc2FtZSBrZXkgZm9yIHBhbm5pbmcuXG4gICAgICAgICAgSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzc5NFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXIgPSB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXI7XG4gICAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrID0gbmV3IENhbnZhc0dyb3VwTWFzayhcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkVG9XaW5kb3coKTtcbiAgICAgIHRoaXMuc2V0dXBPdmVybGF5cygpO1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICB0aGlzLm1vZGVDaGFuZ2VkKG1vZGUpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHRoaXMub25DZW50ZXJDaGFuZ2VcbiAgICAgICAgICAucGlwZShzYW1wbGUoaW50ZXJ2YWwoNTAwKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY2VudGVyOiBQb2ludCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyKTtcbiAgICAgICAgICAgIGlmIChjZW50ZXIgJiYgY2VudGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLnJlc2V0KCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5jaGFuZ2VDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0KTtcbiAgICAgICAgICB0aGlzLmdvVG9DYW52YXMoaGl0LmluZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uUm90YXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChyb3RhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF5b3V0UGFnZXMoKSB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0luZGV4O1xuICAgICAgdGhpcy5kZXN0cm95KHRydWUpO1xuICAgICAgdGhpcy5zZXRVcFZpZXdlcih0aGlzLm1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICAgIGN1cnJlbnRDYW52YXNJbmRleFxuICAgICAgICApLFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgLy8gUmVjcmVhdGUgaGlnaGxpZ2h0cyBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgc2VhcmNoIGdvaW5nIG9uXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuY3VycmVudFNlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVG9XaW5kb3coKSB7XG4gICAgKDxhbnk+d2luZG93KS5vcGVuU2VhZHJhZ29uVmlld2VyID0gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBzZXR1cE92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMuc3ZnT3ZlcmxheSA9IHRoaXMudmlld2VyLnN2Z092ZXJsYXkoKTtcbiAgICB0aGlzLnN2Z05vZGUgPSBkMy5zZWxlY3QodGhpcy5zdmdPdmVybGF5Lm5vZGUoKSk7XG4gIH1cblxuICBkaXNhYmxlS2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0S2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGxheW91dFN3aXRjaCB0cnVlIGlmIHN3aXRjaGluZyBiZXR3ZWVuIGxheW91dHNcbiAgICogdG8ga2VlcCBjdXJyZW50IHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb25cbiAgICovXG4gIGRlc3Ryb3kobGF5b3V0U3dpdGNoPzogYm9vbGVhbikge1xuICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgIGlmICh0aGlzLnZpZXdlciAhPSBudWxsICYmIHRoaXMudmlld2VyLmlzT3BlbigpKSB7XG4gICAgICBpZiAodGhpcy52aWV3ZXIuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKS5zdHlsZSgnb3BhY2l0eScsICcwJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXdlci5kZXN0cm95KCk7XG4gICAgICB0aGlzLnZpZXdlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICBpZiAodGhpcy5jYW52YXNHcm91cE1hc2spIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gS2VlcCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uIG9ubHkgaWYgbGF5b3V0LXN3aXRjaFxuICAgIGlmICghbGF5b3V0U3dpdGNoKSB7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoMCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtY2xpY2snLCB0aGlzLmNsaWNrU2VydmljZS5jbGljayk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcihcbiAgICAgICdjYW52YXMtZG91YmxlLWNsaWNrJyxcbiAgICAgIChlOiBhbnkpID0+IChlLnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1wcmVzcycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXJlbGVhc2UnLCAoKSA9PlxuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dChmYWxzZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1zY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMucGluY2hIYW5kbGVyKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5kcmFnU3RhdHVzID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhZ0hhbmRsZXIoZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgKGU6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXR1cykge1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnRDYW52YXMoKTtcbiAgICAgICAgdGhpcy5zd2lwZVRvQ2FudmFzR3JvdXAoZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYWdTdGF0dXMgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24nLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHpvb21Jbih6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHpvb21PdXQoem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KCh0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCkgKyA5MCkgJSAzNjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3IgbW9kZS1jaGFuZ2VcbiAgICogQHBhcmFtIG1vZGUgVmlld2VyTW9kZVxuICAgKi9cbiAgbW9kZUNoYW5nZWQobW9kZTogTW9kZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb0Rhc2hib2FyZCgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvUGFnZSgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IHRydWU7XG4gICAgICB0aGlzLnJlc2V0S2V5RG93bkhhbmRsZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gREFTSEJPQVJELW1vZGUsIHJlcG9zaXRpb25zIGNhbnZhcyBncm91cCBhbmQgcmVtb3ZlcyBtYXgtd2lkdGggb24gdmlld2VyXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5oaWRlKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuREFTSEJPQVJEKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBQQUdFLW1vZGUsIGNlbnRlcnMgY3VycmVudCBjYW52YXMgZ3JvdXAgYW5kIHJlcG9zaXRpb25zIG90aGVyIGNhbnZhcyBncm91cHNcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9QYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5zaG93KCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuUEFHRSk7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsLWhhbmRsZXJcbiAgICovXG4gIHNjcm9sbEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBNYXRoLnBvdyhWaWV3ZXJPcHRpb25zLnpvb20uem9vbUZhY3RvciwgZXZlbnQuc2Nyb2xsKTtcbiAgICAvLyBTY3JvbGxpbmcgdXBcbiAgICBpZiAoZXZlbnQuc2Nyb2xsID4gMCkge1xuICAgICAgdGhpcy56b29tSW5HZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFNjcm9sbGluZyBkb3duXG4gICAgfSBlbHNlIGlmIChldmVudC5zY3JvbGwgPCAwKSB7XG4gICAgICB0aGlzLnpvb21PdXRHZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFBpbmNoLWhhbmRsZXJcbiAgICovXG4gIHBpbmNoSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgdGhpcy5waW5jaFN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBldmVudC5kaXN0YW5jZSAvIGV2ZW50Lmxhc3REaXN0YW5jZTtcbiAgICAvLyBQaW5jaCBPdXRcbiAgICBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSA+XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21JblBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBQaW5jaCBJblxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGQgPFxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBvaW50IHRvIHpvb20gdG8uIElmIG5vdCBzZXQsIHRoZSB2aWV3ZXIgd2lsbCB6b29tIHRvIGNlbnRlclxuICAgKi9cbiAgem9vbUluR2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHpvb21PdXRHZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIGluIHBpbmNoIGdlc3R1cmUgKHBpbmNoIG91dClcbiAgICpcbiAgICogVG9nZ2xlIHRvIHBhZ2UgbW9kZSBhbmQgWm9vbSBpblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZnJvbSBwaW5jaCBnZXN0dXJlXG4gICAqL1xuICB6b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy56b29tSW4oem9vbUZhY3RvciwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiB8fCBldmVudC5jZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHpvb20gb3V0IHBpbmNoIGdlc3R1cmUgKHBpbmNoIGluKVxuICAgKlxuICAgKiBab29tIG91dCBhbmQgdG9nZ2xlIHRvIGRhc2hib2FyZCB3aGVuIGFsbCB6b29tZWQgb3V0LlxuICAgKiBTdG9wIGJldHdlZW4gem9vbWluZyBvdXQgYW5kIHRvZ2dsaW5nIHRvIGRhc2hib2FyZC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbU91dFBpbmNoR2VzdHVyZShldmVudDogYW55LCB6b29tRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBnZXN0dXJlSWQgPSBldmVudC5nZXN0dXJlUG9pbnRzWzBdLmlkO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSB0cnVlO1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBldmVudC5jZW50ZXIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCB8fFxuICAgICAgICBnZXN0dXJlSWQgPT09IHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgKyAyXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCA9IGdlc3R1cmVJZDtcbiAgICB9XG4gIH1cblxuICBnb1RvSG9tZVpvb20oKTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU2luZ2xlLWNsaWNrLWhhbmRsZXJcbiAgICogU2luZ2xlLWNsaWNrIHRvZ2dsZXMgYmV0d2VlbiBwYWdlL2Rhc2hib2FyZC1tb2RlIGlmIGEgcGFnZSBpcyBoaXRcbiAgICovXG4gIHNpbmdsZUNsaWNrSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgdGlsZUluZGV4ID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudChldmVudCk7XG4gICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgdGlsZUluZGV4XG4gICAgKTtcbiAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH1cbiAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogRG91YmxlLWNsaWNrLWhhbmRsZXJcbiAgICogRG91YmxlLWNsaWNrIGRhc2hib2FyZC1tb2RlIHNob3VsZCBnbyB0byBwYWdlLW1vZGVcbiAgICogRG91YmxlLWNsaWNrIHBhZ2UtbW9kZSBzaG91bGRcbiAgICogICAgYSkgWm9vbSBpbiBpZiBwYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBvclxuICAgKiAgICBiKSBGaXQgdmVydGljYWxseSBpZiBwYWdlIGlzIGFscmVhZHkgem9vbWVkIGluXG4gICAqL1xuICBkYmxDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vIFBhZ2UgaXMgZml0dGVkIHZlcnRpY2FsbHksIHNvIGRibC1jbGljayB6b29tcyBpblxuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbihcbiAgICAgICAgVmlld2VyT3B0aW9ucy56b29tLmRibENsaWNrWm9vbUZhY3RvcixcbiAgICAgICAgZXZlbnQucG9zaXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICAgIGNvbnN0IGNhbnZhc0luZGV4OiBudW1iZXIgPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgY2FudmFzSW5kZXhcbiAgICAgICk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBoaXQgZWxlbWVudCBpcyBhIDxyZWN0Pi1lbGVtZW50XG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIGlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBTVkdSZWN0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aWxlc291cmNlcyBhbmQgYWRkcyB0aGVtIHRvIHZpZXdlclxuICAgKiBDcmVhdGVzIHN2ZyBjbGlja2FibGUgb3ZlcmxheXMgZm9yIGVhY2ggdGlsZVxuICAgKi9cbiAgY3JlYXRlT3ZlcmxheXMoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5cyA9IFtdO1xuICAgIGNvbnN0IGNhbnZhc1JlY3RzOiBSZWN0W10gPSBbXTtcbiAgICBjb25zdCBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kgPSBDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uRmFjdG9yeS5jcmVhdGUoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0LFxuICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWRcbiAgICApO1xuXG4gICAgY29uc3QgaXNUd29QYWdlVmlldzogYm9vbGVhbiA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG4gICAgbGV0IGdyb3VwOiBhbnkgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuXG4gICAgdGhpcy50aWxlU291cmNlcy5mb3JFYWNoKCh0aWxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneS5jYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgY2FudmFzR3JvdXBJbmRleDogaSxcbiAgICAgICAgICBjYW52YXNTb3VyY2U6IHRpbGUsXG4gICAgICAgICAgcHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uOiBjYW52YXNSZWN0c1tpIC0gMV0sXG4gICAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICByb3RhdGlvblxuICAgICAgKTtcblxuICAgICAgY2FudmFzUmVjdHMucHVzaChwb3NpdGlvbik7XG5cbiAgICAgIGNvbnN0IHRpbGVTb3VyY2VTdHJhdGVneSA9IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkuY3JlYXRlKHRpbGUpO1xuICAgICAgY29uc3QgdGlsZVNvdXJjZSA9IHRpbGVTb3VyY2VTdHJhdGVneS5nZXRUaWxlU291cmNlKHRpbGUpO1xuXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3RhdGVkID0gcm90YXRpb24gPT09IDkwIHx8IHJvdGF0aW9uID09PSAyNzA7XG5cbiAgICAgICAgbGV0IGJvdW5kcztcblxuICAgICAgICAvKiBCZWNhdXNlIGltYWdlIHNjYWxpbmcgaXMgcGVyZm9ybWVkIGJlZm9yZSByb3RhdGlvbixcbiAgICAgICAgICogd2UgbXVzdCBpbnZlcnQgd2lkdGggJiBoZWlnaHQgYW5kIHRyYW5zbGF0ZSBwb3NpdGlvbiBzbyB0aGF0IHRpbGUgcm90YXRpb24gZW5kcyB1cCBjb3JyZWN0XG4gICAgICAgICAqL1xuICAgICAgICBpZiAocm90YXRlZCkge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54ICsgKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi55IC0gKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQsXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGgsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3ZXIuYWRkVGlsZWRJbWFnZSh7XG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgdGlsZVNvdXJjZTogdGlsZVNvdXJjZSxcbiAgICAgICAgICBmaXRCb3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBkZWdyZWVzOiByb3RhdGlvbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcgJiYgaSAlIDIgIT09IDApIHtcbiAgICAgICAgZ3JvdXAgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50T3ZlcmxheSA9IGdyb3VwXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cigneCcsIHBvc2l0aW9uLngpXG4gICAgICAgIC5hdHRyKCd5JywgcG9zaXRpb24ueSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgcG9zaXRpb24ud2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBwb3NpdGlvbi5oZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0aWxlJyk7XG5cbiAgICAgIC8vIE1ha2UgY3VzdG9tIGJvcmRlcnMgaWYgY3VycmVudCBsYXlvdXQgaXMgdHdvLXBhZ2VkXG4gICAgICBpZiAoaXNUd29QYWdlVmlldykge1xuICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG5vTGVmdFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIE51bWJlcihwb3NpdGlvbi53aWR0aCAqIDIgKyBwb3NpdGlvbi5oZWlnaHQpICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggKiAyO1xuICAgICAgICAgIGN1cnJlbnRPdmVybGF5LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jywgbm9MZWZ0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgJSAyICE9PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub1JpZ2h0U3Ryb2tlU3R5bGUgPVxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQgK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KTtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vUmlnaHRTdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXlOb2RlOiBTVkdSZWN0RWxlbWVudCA9IGN1cnJlbnRPdmVybGF5Lm5vZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheXNbaV0gPSBjdXJyZW50T3ZlcmxheU5vZGU7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsYXlvdXQgPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFIHx8XG4gICAgICAhdGhpcy5pc01hbmlmZXN0UGFnZWRcbiAgICAgICAgPyBWaWV3ZXJMYXlvdXQuT05FX1BBR0VcbiAgICAgICAgOiBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgdGhpcy5jYW52YXNTZXJ2aWNlLmFkZEFsbChjYW52YXNSZWN0cywgbGF5b3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHZpZXdlciBzaXplIGFuZCBvcGFjaXR5IG9uY2UgdGhlIGZpcnN0IGNhbnZhcyBncm91cCBoYXMgZnVsbHkgbG9hZGVkXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxDYW52YXNHcm91cExvYWRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvbWUoKTtcbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5pbml0aWFsaXplKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKSxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSAhPT0gVmlld2VyTW9kZS5EQVNIQk9BUkRcbiAgICApO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbihWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsICcxJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb3ZlcmxheS1pbmRleCBmb3IgY2xpY2stZXZlbnQgaWYgaGl0XG4gICAqIEBwYXJhbSB0YXJnZXQgaGl0IDxyZWN0PlxuICAgKi9cbiAgZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0KSkge1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXA6IG51bWJlciA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwID49IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RlZENhbnZhc0dyb3VwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICBjZW50ZXJcbiAgICAgICk7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgICAgY29uc3QgdnBCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2cEJvdW5kc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogbnVtYmVyID0gZS5kaXJlY3Rpb247XG4gICAgICBpZiAoXG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuTEVGVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JblJpZ2h0U2VtaWNpcmNsZShkaXJlY3Rpb24pKSB8fFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLlJJR0hUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluTGVmdFNlbWljaXJjbGUoZGlyZWN0aW9uKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhcygpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzQm91bmRzID0gdGhpcy5nZXRDdXJyZW50Q2FudmFzQm91bmRzKCk7XG4gICAgICB0aGlzLmlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KHZpZXdwb3J0Qm91bmRzLCBjdXJyZW50Q2FudmFzQm91bmRzKVxuICAgICAgICA/IHRoaXMuY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICAgICAgICAgIHZpZXdwb3J0Qm91bmRzLFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0JvdW5kc1xuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50Q2FudmFzQm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlci53b3JsZFxuICAgICAgLmdldEl0ZW1BdCh0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpXG4gICAgICAuZ2V0Qm91bmRzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMuaGVpZ2h0IDwgY2FudmFzQm91bmRzLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogdm9pZCB7XG4gICAgbGV0IHJlY3Q6IFJlY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodCAvIDIsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDYW52YXNBYm92ZVZpZXdwb3J0Qm90dG9tKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgLSB2aWV3cG9ydEJvdW5kcy5oZWlnaHQgLyAyLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucGFuVG8ocmVjdCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kczogUmVjdCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cFJlY3QoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgeTogY2FudmFzR3JvdXBSZWN0LmNlbnRlclksXG4gICAgfSk7XG4gICAgdGhpcy5wYW5UbyhyZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMueSA8IGNhbnZhc0JvdW5kcy55O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NhbnZhc0Fib3ZlVmlld3BvcnRCb3R0b20oXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgPFxuICAgICAgdmlld3BvcnRCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN3aXBlVG9DYW52YXNHcm91cChlOiBhbnkpIHtcbiAgICAvLyBEb24ndCBzd2lwZSBvbiBwaW5jaCBhY3Rpb25zXG4gICAgaWYgKHRoaXMucGluY2hTdGF0dXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlZWQ6IG51bWJlciA9IGUuc3BlZWQ7XG4gICAgY29uc3QgZHJhZ0VuZFBvc2lzaW9uID0gZS5wb3NpdGlvbjtcblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG5cbiAgICBjb25zdCBkaXJlY3Rpb246IERpcmVjdGlvbiA9IFN3aXBlVXRpbHMuZ2V0U3dpcGVEaXJlY3Rpb24oXG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uLFxuICAgICAgZHJhZ0VuZFBvc2lzaW9uLFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyID0gdGhpcy5jYW52YXNTZXJ2aWNlXG4gICAgICAuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgY29uc3QgY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kgPSBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5LmNyZWF0ZShcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZVxuICAgICk7XG5cbiAgICBsZXQgcGFubmVkUGFzdFNpZGU6IFNpZGUgfCBudWxsO1xuICAgIGxldCBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBwYW5uZWRQYXN0U2lkZSA9IFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgIHZpZXdwb3J0Qm91bmRzXG4gICAgICApO1xuICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmFkZEhpdChwYW5uZWRQYXN0U2lkZSwgZGlyZWN0aW9uKTtcbiAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkID0gdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmhpdENvdW50UmVhY2hlZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0NhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY29uc3RyYWluVG9SYW5nZShcbiAgICAgIGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5LmNhbGN1bGF0ZU5leHRDYW52YXNHcm91cCh7XG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cENlbnRlcjogdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKSxcbiAgICAgICAgc3BlZWQ6IHNwZWVkLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IGN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZDogY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQsXG4gICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgKGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkICYmIGRpcmVjdGlvbilcbiAgICApIHtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDogbmV3Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld3BvcnRCb3VuZHMoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRCb3VuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQ6IGFueSkge1xuICAgIHJldHVybiBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgPyBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgOiBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgcGFuVG8ocmVjdDogUmVjdCB8IHVuZGVmaW5lZCwgaW1tZWRpYXRlbHkgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChyZWN0KSB7XG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5wYW5UbyhcbiAgICAgICAge1xuICAgICAgICAgIHg6IHJlY3QueCxcbiAgICAgICAgICB5OiByZWN0LnksXG4gICAgICAgIH0sXG4gICAgICAgIGltbWVkaWF0ZWx5XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=
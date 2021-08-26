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
import { Options } from '../models/options';
import { PinchStatus } from '../models/pinchStatus';
import { Side } from '../models/side';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { CanvasGroupMask } from './canvas-group-mask';
import { DefaultGoToCanvasGroupStrategy, } from './go-to-canvas-group-strategy';
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
            const target = event.originalEvent.target;
            const tileIndex = this.getOverlayIndexFromClickEvent(target);
            const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
            if (requestedCanvasGroupIndex) {
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
            const target = event.originalEvent.target;
            // Page is fitted vertically, so dbl-click zooms in
            if (this.modeService.mode === ViewerMode.PAGE) {
                this.modeService.mode = ViewerMode.PAGE_ZOOMED;
                this.zoomStrategy.zoomIn(ViewerOptions.zoom.dblClickZoomFactor, event.position);
            }
            else {
                this.modeService.mode = ViewerMode.PAGE;
                const canvasIndex = this.getOverlayIndexFromClickEvent(target);
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
            if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
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
                this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.getOptions()));
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
        this.viewer.addHandler('canvas-drag', (e) => this.dragHandler(e));
        this.viewer.addHandler('canvas-drag-end', (e) => this.swipeToCanvasGroup(e));
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
        if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
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
        if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
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
    getOverlayIndexFromClickEvent(target) {
        if (this.isCanvasGroupHit(target)) {
            const requestedCanvasGroup = this.overlays.indexOf(target);
            if (requestedCanvasGroup >= 0) {
                return requestedCanvasGroup;
            }
        }
        return -1;
    }
    getOptions() {
        const options = new Options();
        options.ajaxWithCredentials = this.config.withCredentials;
        options.loadTilesWithAjax = this.config.loadTilesWithAjax;
        options.crossOriginPolicy = this.config.crossOriginPolicy;
        options.ajaxHeaders = this.config.ajaxHeaders;
        return options;
    }
    calculateCurrentCanvasGroup(center) {
        if (center) {
            const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(center);
            this.currentCanvasIndex.next(currentCanvasGroupIndex);
        }
    }
    swipeToCanvasGroup(e) {
        // Don't swipe on pinch actions
        if (this.pinchStatus.active) {
            return;
        }
        const speed = e.speed;
        const dragEndPosision = e.position;
        const isCanvasGroupZoomed = this.modeService.mode === ViewerMode.PAGE_ZOOMED;
        const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
        const viewportBounds = this.getViewportBounds();
        const direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, isCanvasGroupZoomed);
        const currentCanvasGroupIndex = this.canvasService
            .currentCanvasGroupIndex;
        const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);
        let pannedPastSide;
        let canvasGroupEndHitCountReached = false;
        if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
            pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
            this.swipeDragEndCounter.addHit(pannedPastSide, direction);
            canvasGroupEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
        }
        const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
            currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
            speed: speed,
            direction: direction,
            currentCanvasGroupIndex: currentCanvasGroupIndex,
            canvasGroupEndHitCountReached: canvasGroupEndHitCountReached,
            viewingDirection: this.manifest.viewingDirection,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFFUixPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDdkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFLN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBS3JGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsOEJBQThCLEdBRS9CLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFJcEUsTUFBTSxPQUFPLGFBQWE7SUFnQ3hCLFlBQ1UsSUFBWSxFQUNaLFlBQTBCLEVBQzFCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4Qyx3QkFBa0QsRUFDbEQsWUFBMEIsRUFDMUIsV0FBd0I7UUFQeEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxDMUIsYUFBUSxHQUEwQixFQUFFLENBQUM7UUFDckMsZ0JBQVcsR0FBb0IsRUFBRSxDQUFDO1FBR25DLG9CQUFlLEdBQXFCLElBQUksZUFBZSxDQUM1RCxLQUFLLENBQ04sQ0FBQztRQUVNLGtCQUFhLEdBQW1CLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUMsdUJBQWtCLEdBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNqRCx3QkFBbUIsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFFaEQsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBR2hDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBR3pCLGtCQUFhLEdBQXdCLElBQUksQ0FBQztRQUl6QyxhQUFRLEdBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBNGNuRTs7V0FFRztRQUNILGtCQUFhLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxlQUFlO1lBQ2YsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxpQkFBaUI7YUFDbEI7aUJBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxDQUFDO1FBRUY7O1dBRUc7UUFDSCxpQkFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUN2RCxZQUFZO1lBQ1osSUFDRSxLQUFLLENBQUMsUUFBUTtnQkFDZCxLQUFLLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQzFEO2dCQUNBLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzNDLFdBQVc7YUFDWjtpQkFBTSxJQUNMLEtBQUssQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ3RELEtBQUssQ0FBQyxZQUFZLEVBQ2xCO2dCQUNBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDN0M7UUFDSCxDQUFDLENBQUM7UUFrRUY7OztXQUdHO1FBQ0gsdUJBQWtCLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7WUFDbEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FDL0UsU0FBUyxDQUNWLENBQUM7WUFDRixJQUFJLHlCQUF5QixFQUFFO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO2FBQ3hFO2lCQUFNO2dCQUNMLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN6RTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ0gsb0JBQWUsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFOztZQUMvQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxtREFBbUQ7WUFDbkQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdEIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FDZixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDeEMsTUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQy9FLFdBQVcsQ0FDWixDQUFDO2dCQUNGLElBQUkseUJBQXlCLElBQUksQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO2lCQUN4RTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUF1S00sZ0JBQVcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BELE1BQU0sZUFBZSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQztnQkFDN0UsTUFBTSxRQUFRLEdBQVMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ2hELE1BQU0scUJBQXFCLEdBQUcsVUFBVSxDQUFDLG9DQUFvQyxDQUMzRSxlQUFlLEVBQ2YsUUFBUSxDQUNULENBQUM7Z0JBQ0YsTUFBTSxTQUFTLEdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDdEMsSUFDRSxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxJQUFJO29CQUNsQyxVQUFVLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JELENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLEtBQUs7d0JBQ25DLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUNwRDtvQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7aUJBQ25DO2FBQ0Y7UUFDSCxDQUFDLENBQUM7SUE1d0JDLENBQUM7SUFFSixJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSx3QkFBd0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLElBQUk7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5ELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLHVCQUF1QjtRQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsdUJBQXVCLENBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUM5QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRU0sZUFBZSxDQUFDLGdCQUF3QixFQUFFLFdBQW9CO1FBQ25FLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsZ0JBQWdCLEVBQUUsZ0JBQWdCO1lBQ2xDLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxVQUFVLENBQUMsV0FBbUIsRUFBRSxXQUFvQjtRQUN6RCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQ3RFLFdBQVcsQ0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7WUFDbEMsV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFNBQVMsQ0FBQyxZQUEwQjtRQUN6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQzthQUNuQztZQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFMUMsS0FBSyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO2dCQUNuQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDekIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFFckIsNEdBQTRHO3dCQUM1RyxRQUFRLFFBQVEsRUFBRTs0QkFDaEIsS0FBSyxDQUFDO2dDQUNKLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNaLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNaLE1BQU07NEJBRVIsS0FBSyxFQUFFO2dDQUNMLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQ0FDN0MsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1oseUJBQXlCO2dDQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQ0FDcEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBQ3BCLE1BQU07NEJBRVIsS0FBSyxHQUFHO2dDQUNOLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQzlDLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ2hELE1BQU07NEJBRVIsS0FBSyxHQUFHO2dDQUNOLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNaLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQ0FDN0MseUJBQXlCO2dDQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQ0FDcEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBQ3BCLE1BQU07eUJBQ1Q7d0JBRUQsTUFBTSxjQUFjLEdBQW1CLElBQUksQ0FBQyxPQUFPOzZCQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDOzZCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQzs2QkFDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NkJBQ1osSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NkJBQ1osSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7NkJBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOzZCQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUN6QjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsR0FBUTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU87YUFDVCxTQUFTLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQzthQUMvQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxlQUFlO1FBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsUUFBa0IsRUFBRSxNQUF3QjtRQUN0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FDckMsQ0FBQztnQkFDRixnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksbUJBQW1CLENBQ3pDLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUN6QixDQUFDO2dCQUNGLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLDhCQUE4QixDQUMvRCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDL0IsQ0FBQztnQkFFRjs7OzttQkFJRztnQkFDSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO2dCQUNyRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FDeEMsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzNCLFNBQVMsQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtZQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FDbkQsQ0FBQyxnQkFBd0IsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQyxJQUFJLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQ3hELENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO29CQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNsQzthQUNGO1FBQ0gsQ0FBQyxDQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYyxFQUFFLEVBQUU7O1lBQ2pELElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNoRTtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRTtZQUNyRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7WUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQy9ELGtCQUFrQixDQUNuQjtnQkFDRCxXQUFXLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7WUFFSCw0REFBNEQ7WUFDNUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDSCxNQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxPQUFPLENBQUMsWUFBc0I7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNqQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQztRQUNELHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTs7WUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FDcEIscUJBQXFCLEVBQ3JCLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsQ0FDNUMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFLENBQ25ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FDM0IsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFOztZQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBbUIsRUFBRSxRQUFnQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFtQixFQUFFLFFBQWdCO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLElBQWlCO1FBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsRUFBRTtZQUNuRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCO1lBQzVELFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUI7WUFDNUQsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBcUNEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxRQUFlLEVBQUUsVUFBbUI7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDekM7YUFBTTtZQUNMLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWUsRUFBRSxVQUFtQjtRQUNqRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2pEO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWtCLENBQUMsS0FBVSxFQUFFLFVBQWtCO1FBQy9DLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQ3pDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsVUFBa0I7UUFDaEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3BELElBQ0UsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVU7Z0JBQzVCLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFDcEQ7Z0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBa0REOzs7T0FHRztJQUNILGdCQUFnQixDQUFDLE1BQW1CO1FBQ2xDLE9BQU8sTUFBTSxZQUFZLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sV0FBVyxHQUFXLEVBQUUsQ0FBQztRQUMvQixNQUFNLG9DQUFvQyxHQUFHLG1DQUFtQyxDQUFDLE1BQU0sQ0FDckYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDNUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sUUFBUSxHQUFHLG9DQUFvQyxDQUFDLDRCQUE0QixDQUNoRjtnQkFDRSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsMkJBQTJCLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCO2FBQ2pELEVBQ0QsUUFBUSxDQUNULENBQUM7WUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTNCLE1BQU0sa0JBQWtCLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDL0IsTUFBTSxPQUFPLEdBQUcsUUFBUSxLQUFLLEVBQUUsSUFBSSxRQUFRLEtBQUssR0FBRyxDQUFDO2dCQUVwRCxJQUFJLE1BQU0sQ0FBQztnQkFFWDs7bUJBRUc7Z0JBQ0gsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FDN0IsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFDbkQsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFDbkQsUUFBUSxDQUFDLE1BQU0sRUFDZixRQUFRLENBQUMsS0FBSyxDQUNmLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FDN0IsUUFBUSxDQUFDLENBQUMsRUFDVixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsUUFBUSxDQUFDLE1BQU0sQ0FDaEIsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLFNBQVMsRUFBRSxNQUFNO29CQUNqQixPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGFBQWEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDOUQ7WUFFRCxNQUFNLGNBQWMsR0FBRyxLQUFLO2lCQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDO2lCQUNkLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV6QixxREFBcUQ7WUFDckQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsTUFBTSxpQkFBaUIsR0FDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQzVDLElBQUk7d0JBQ0osUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ3JCLGNBQWMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDN0Q7cUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNqQyxNQUFNLGtCQUFrQixHQUN0QixRQUFRLENBQUMsS0FBSzt3QkFDZCxJQUFJO3dCQUNKLFFBQVEsQ0FBQyxNQUFNO3dCQUNmLElBQUk7d0JBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0MsY0FBYyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM5RDthQUNGO1lBRUQsTUFBTSxrQkFBa0IsR0FBbUIsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3pELENBQUMsSUFBSSxDQUFDLGVBQWU7WUFDbkIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsRUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FDL0MsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2lCQUN4QyxVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3BELEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsNkJBQTZCLENBQUMsTUFBVztRQUN2QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQyxNQUFNLG9CQUFvQixHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLElBQUksb0JBQW9CLElBQUksQ0FBQyxFQUFFO2dCQUM3QixPQUFPLG9CQUFvQixDQUFDO2FBQzdCO1NBQ0Y7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDMUQsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDMUQsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDMUQsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUM5QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU8sMkJBQTJCLENBQUMsTUFBYTtRQUMvQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FDNUUsTUFBTSxDQUNQLENBQUM7WUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBdUJPLGtCQUFrQixDQUFDLENBQU07UUFDL0IsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRW5DLE1BQU0sbUJBQW1CLEdBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFFbkQsTUFBTSxlQUFlLEdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQzdFLE1BQU0sY0FBYyxHQUFTLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXRELE1BQU0sU0FBUyxHQUFjLFVBQVUsQ0FBQyxpQkFBaUIsQ0FDdkQsSUFBSSxDQUFDLGlCQUFpQixFQUN0QixlQUFlLEVBQ2YsbUJBQW1CLENBQ3BCLENBQUM7UUFFRixNQUFNLHVCQUF1QixHQUFXLElBQUksQ0FBQyxhQUFhO2FBQ3ZELHVCQUF1QixDQUFDO1FBQzNCLE1BQU0sZ0NBQWdDLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdEIsQ0FBQztRQUVGLElBQUksY0FBMkIsQ0FBQztRQUNoQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDcEQsY0FBYyxHQUFHLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FDOUQsZUFBZSxFQUNmLGNBQWMsQ0FDZixDQUFDO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0QsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzVFO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxnQ0FBZ0MsQ0FBQyx3QkFBd0IsQ0FDbkY7WUFDRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFO1lBQzVELEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLFNBQVM7WUFDcEIsdUJBQXVCLEVBQUUsdUJBQXVCO1lBQ2hELDZCQUE2QixFQUFFLDZCQUE2QjtZQUM1RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQjtTQUNqRCxDQUNGLENBQUM7UUFDRixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxTQUFTO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJO1lBQ3pDLENBQUMsNkJBQTZCLElBQUksU0FBUyxDQUFDLEVBQzVDO1lBQ0EsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztnQkFDM0MsZ0JBQWdCLEVBQUUsbUJBQW1CO2dCQUNyQyxXQUFXLEVBQUUsS0FBSztnQkFDbEIsU0FBUyxFQUFFLFNBQVM7YUFDckIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8saUJBQWlCOztRQUN2QixPQUFPLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7O1lBNzNCRixVQUFVOzs7WUE5Q1UsTUFBTTtZQWNsQixZQUFZO1lBRFosYUFBYTtZQUhiLFdBQVc7WUFtQlgsbUJBQW1CO1lBYm5CLHdCQUF3QjtZQVl4QixZQUFZO1lBakJaLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgaW50ZXJ2YWwsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2FtcGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z092ZXJsYXkgfSBmcm9tICcuLi9leHQvc3ZnLW92ZXJsYXknO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvZGlyZWN0aW9uJztcbmltcG9ydCB7IE1hbmlmZXN0LCBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL29wdGlvbnMnO1xuaW1wb3J0IHsgUGluY2hTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcGluY2hTdGF0dXMnO1xuaW1wb3J0IHsgU2lkZSB9IGZyb20gJy4uL21vZGVscy9zaWRlJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi8uLi9tb2RlbHMvcG9pbnQnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5IH0gZnJvbSAnLi9jYWxjdWxhdGUtbmV4dC1jYW52YXMtZ3JvdXAtZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE1hc2sgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1tYXNrJztcbmltcG9ydCB7XG4gIERlZmF1bHRHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbiAgR29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG59IGZyb20gJy4vZ28tdG8tY2FudmFzLWdyb3VwLXN0cmF0ZWd5JztcbmltcG9ydCB7IFN3aXBlRHJhZ0VuZENvdW50ZXIgfSBmcm9tICcuL3N3aXBlLWRyYWctZW5kLWNvdW50ZXInO1xuaW1wb3J0IHsgU3dpcGVVdGlscyB9IGZyb20gJy4vc3dpcGUtdXRpbHMnO1xuaW1wb3J0IHsgVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vdGlsZS1zb3VyY2Utc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBEZWZhdWx0Wm9vbVN0cmF0ZWd5LCBab29tU3RyYXRlZ3kgfSBmcm9tICcuL3pvb20tc3RyYXRlZ3knO1xuXG5kZWNsYXJlIGNvbnN0IE9wZW5TZWFkcmFnb246IGFueTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI/OiBhbnk7XG4gIHByaXZhdGUgc3ZnT3ZlcmxheTogYW55O1xuICBwcml2YXRlIHN2Z05vZGU6IGFueTtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PiA9IFtdO1xuICBwcml2YXRlIHRpbGVTb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIHB1YmxpYyBpc0NhbnZhc1ByZXNzZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIGZhbHNlXG4gICk7XG5cbiAgcHJpdmF0ZSBjdXJyZW50Q2VudGVyOiBTdWJqZWN0PFBvaW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudENhbnZhc0luZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgY3VycmVudEhpdCA9IG5ldyBTdWJqZWN0PEhpdD4oKTtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IG9uUm90YXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2VudGVyQ2hhbmdlKCk6IE9ic2VydmFibGU8UG9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2VudGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uSGl0Q2hhbmdlKCk6IE9ic2VydmFibGU8SGl0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEhpdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uT3NkUmVhZHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3NkSXNSZWFkeS5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Vmlld2VyKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyO1xuICB9XG5cbiAgcHVibGljIGdldFRpbGVzb3VyY2VzKCk6IFJlc291cmNlW10ge1xuICAgIHJldHVybiB0aGlzLnRpbGVTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldE92ZXJsYXlzKCk6IFNWR1JlY3RFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlzO1xuICB9XG5cbiAgcHVibGljIGdldFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1pblpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWluWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1heFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWF4Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGhvbWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKHRoaXMubW9kZVNlcnZpY2UubW9kZSk7XG5cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmNlbnRlckN1cnJlbnRDYW52YXMoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub05leHRDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXNHcm91cChjYW52YXNHcm91cEluZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogY2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBpbW1lZGlhdGVseSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzKGNhbnZhc0luZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgY2FudmFzSW5kZXhcbiAgICApO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0KHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZ2h0bGlnaHQoKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGlmIChzZWFyY2hSZXN1bHQucSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2hSZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBzZWFyY2hSZXN1bHQuaGl0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHJlY3Qgb2YgaGl0LnJlY3RzKSB7XG4gICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNSZWN0KGhpdC5pbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc1JlY3QpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgeCA9IGNhbnZhc1JlY3QueDtcbiAgICAgICAgICAgIGxldCB5ID0gY2FudmFzUmVjdC55O1xuXG4gICAgICAgICAgICAvKiBoaXQgcmVjdCBhcmUgcmVsYXRpdmUgdG8gZWFjaCB1bnJvdGF0ZWQgcGFnZSBjYW52YXNSZWN0IHNvIHgseSBtdXN0IGJlIGFkanVzdGVkIGJ5IHRoZSByZW1haW5pbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggKz0gcmVjdC54O1xuICAgICAgICAgICAgICAgIHkgKz0gcmVjdC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gcmVjdC55IC0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDE4MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSAocmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIChyZWN0LnkgKyByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAyNzA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIHJlY3QueCAtIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY3VycmVudE92ZXJsYXk6IFNWR1JlY3RFbGVtZW50ID0gdGhpcy5zdmdOb2RlXG4gICAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAuYXR0cignbWltZUhpdEluZGV4JywgaGl0LmlkKVxuICAgICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAgIC5hdHRyKCd5JywgeSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLnN2Z05vZGUuc2VsZWN0QWxsKGBnID4gcmVjdC5zZWxlY3RlZGApLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIHRoaXMuc3ZnTm9kZVxuICAgICAgLnNlbGVjdEFsbChgZyA+IHJlY3RbbWltZUhpdEluZGV4PScke2hpdC5pZH0nXWApXG4gICAgICAuYXR0cignY2xhc3MnLCAnaGl0IHNlbGVjdGVkJyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJIaWdodGxpZ2h0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN2Z05vZGUpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoJy5oaXQnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBWaWV3ZXIobWFuaWZlc3Q6IE1hbmlmZXN0LCBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QudGlsZVNvdXJjZSkge1xuICAgICAgdGhpcy50aWxlU291cmNlcyA9IG1hbmlmZXN0LnRpbGVTb3VyY2U7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkID0gTWFuaWZlc3RVdGlscy5pc01hbmlmZXN0UGFnZWQodGhpcy5tYW5pZmVzdCk7XG4gICAgICAgIHRoaXMudmlld2VyID0gbmV3IE9wZW5TZWFkcmFnb24uVmlld2VyKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpKVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVTdmdPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRab29tU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgIHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgVGhpcyBkaXNhYmxlcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIG9wZW5zZWFkcmFnb24uXG4gICAgICAgICAgV2UgdXNlIHMgZm9yIG9wZW5pbmcgc2VhcmNoIGRpYWxvZyBhbmQgT1NEIHVzZSB0aGUgc2FtZSBrZXkgZm9yIHBhbm5pbmcuXG4gICAgICAgICAgSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzc5NFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXIgPSB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXI7XG4gICAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrID0gbmV3IENhbnZhc0dyb3VwTWFzayhcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkVG9XaW5kb3coKTtcbiAgICAgIHRoaXMuc2V0dXBPdmVybGF5cygpO1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICB0aGlzLm1vZGVDaGFuZ2VkKG1vZGUpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHRoaXMub25DZW50ZXJDaGFuZ2VcbiAgICAgICAgICAucGlwZShzYW1wbGUoaW50ZXJ2YWwoNTAwKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY2VudGVyOiBQb2ludCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyKTtcbiAgICAgICAgICAgIGlmIChjZW50ZXIgJiYgY2VudGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLnJlc2V0KCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5jaGFuZ2VDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0KTtcbiAgICAgICAgICB0aGlzLmdvVG9DYW52YXMoaGl0LmluZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uUm90YXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChyb3RhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF5b3V0UGFnZXMoKSB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0luZGV4O1xuICAgICAgdGhpcy5kZXN0cm95KHRydWUpO1xuICAgICAgdGhpcy5zZXRVcFZpZXdlcih0aGlzLm1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICAgIGN1cnJlbnRDYW52YXNJbmRleFxuICAgICAgICApLFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgLy8gUmVjcmVhdGUgaGlnaGxpZ2h0cyBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgc2VhcmNoIGdvaW5nIG9uXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuY3VycmVudFNlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVG9XaW5kb3coKSB7XG4gICAgKDxhbnk+d2luZG93KS5vcGVuU2VhZHJhZ29uVmlld2VyID0gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBzZXR1cE92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMuc3ZnT3ZlcmxheSA9IHRoaXMudmlld2VyLnN2Z092ZXJsYXkoKTtcbiAgICB0aGlzLnN2Z05vZGUgPSBkMy5zZWxlY3QodGhpcy5zdmdPdmVybGF5Lm5vZGUoKSk7XG4gIH1cblxuICBkaXNhYmxlS2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0S2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGxheW91dFN3aXRjaCB0cnVlIGlmIHN3aXRjaGluZyBiZXR3ZWVuIGxheW91dHNcbiAgICogdG8ga2VlcCBjdXJyZW50IHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb25cbiAgICovXG4gIGRlc3Ryb3kobGF5b3V0U3dpdGNoPzogYm9vbGVhbikge1xuICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgIGlmICh0aGlzLnZpZXdlciAhPSBudWxsICYmIHRoaXMudmlld2VyLmlzT3BlbigpKSB7XG4gICAgICBpZiAodGhpcy52aWV3ZXIuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKS5zdHlsZSgnb3BhY2l0eScsICcwJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXdlci5kZXN0cm95KCk7XG4gICAgICB0aGlzLnZpZXdlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICBpZiAodGhpcy5jYW52YXNHcm91cE1hc2spIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gS2VlcCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uIG9ubHkgaWYgbGF5b3V0LXN3aXRjaFxuICAgIGlmICghbGF5b3V0U3dpdGNoKSB7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoMCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtY2xpY2snLCB0aGlzLmNsaWNrU2VydmljZS5jbGljayk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcihcbiAgICAgICdjYW52YXMtZG91YmxlLWNsaWNrJyxcbiAgICAgIChlOiBhbnkpID0+IChlLnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1wcmVzcycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXJlbGVhc2UnLCAoKSA9PlxuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dChmYWxzZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1zY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMucGluY2hIYW5kbGVyKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgKGU6IGFueSkgPT4gdGhpcy5kcmFnSGFuZGxlcihlKSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgKGU6IGFueSkgPT5cbiAgICAgIHRoaXMuc3dpcGVUb0NhbnZhc0dyb3VwKGUpXG4gICAgKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbicsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgem9vbUluKHpvb21GYWN0b3I/OiBudW1iZXIsIHBvc2l0aW9uPzogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgem9vbU91dCh6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gIH1cblxuICByb3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoKHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKSArIDkwKSAlIDM2MCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZvciBtb2RlLWNoYW5nZVxuICAgKiBAcGFyYW0gbW9kZSBWaWV3ZXJNb2RlXG4gICAqL1xuICBtb2RlQ2hhbmdlZChtb2RlOiBNb2RlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvRGFzaGJvYXJkKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlVG9QYWdlKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzZXRLZXlEb3duSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBEQVNIQk9BUkQtbW9kZSwgcmVwb3NpdGlvbnMgY2FudmFzIGdyb3VwIGFuZCByZW1vdmVzIG1heC13aWR0aCBvbiB2aWV3ZXJcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9EYXNoYm9hcmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmhpZGUoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5EQVNIQk9BUkQpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIFBBR0UtbW9kZSwgY2VudGVycyBjdXJyZW50IGNhbnZhcyBncm91cCBhbmQgcmVwb3NpdGlvbnMgb3RoZXIgY2FudmFzIGdyb3Vwc1xuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLnNob3coKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5QQUdFKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwtaGFuZGxlclxuICAgKi9cbiAgc2Nyb2xsSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IE1hdGgucG93KFZpZXdlck9wdGlvbnMuem9vbS56b29tRmFjdG9yLCBldmVudC5zY3JvbGwpO1xuICAgIC8vIFNjcm9sbGluZyB1cFxuICAgIGlmIChldmVudC5zY3JvbGwgPiAwKSB7XG4gICAgICB0aGlzLnpvb21Jbkdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgICAgLy8gU2Nyb2xsaW5nIGRvd25cbiAgICB9IGVsc2UgaWYgKGV2ZW50LnNjcm9sbCA8IDApIHtcbiAgICAgIHRoaXMuem9vbU91dEdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUGluY2gtaGFuZGxlclxuICAgKi9cbiAgcGluY2hIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICB0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IGV2ZW50LmRpc3RhbmNlIC8gZXZlbnQubGFzdERpc3RhbmNlO1xuICAgIC8vIFBpbmNoIE91dFxuICAgIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlID5cbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGRcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbUluUGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFBpbmNoIEluXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZCA8XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2VcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbU91dFBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnQgdG8gem9vbSB0by4gSWYgbm90IHNldCwgdGhlIHZpZXdlciB3aWxsIHpvb20gdG8gY2VudGVyXG4gICAqL1xuICB6b29tSW5HZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgem9vbU91dEdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBpbiBwaW5jaCBnZXN0dXJlIChwaW5jaCBvdXQpXG4gICAqXG4gICAqIFRvZ2dsZSB0byBwYWdlIG1vZGUgYW5kIFpvb20gaW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbUluUGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbUluKHpvb21GYWN0b3IsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gfHwgZXZlbnQuY2VudGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIG91dCBwaW5jaCBnZXN0dXJlIChwaW5jaCBpbilcbiAgICpcbiAgICogWm9vbSBvdXQgYW5kIHRvZ2dsZSB0byBkYXNoYm9hcmQgd2hlbiBhbGwgem9vbWVkIG91dC5cbiAgICogU3RvcCBiZXR3ZWVuIHpvb21pbmcgb3V0IGFuZCB0b2dnbGluZyB0byBkYXNoYm9hcmQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZ2VzdHVyZUlkID0gZXZlbnQuZ2VzdHVyZVBvaW50c1swXS5pZDtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSB0cnVlO1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBldmVudC5jZW50ZXIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCB8fFxuICAgICAgICBnZXN0dXJlSWQgPT09IHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgKyAyXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCA9IGdlc3R1cmVJZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2luZ2xlLWNsaWNrLWhhbmRsZXJcbiAgICogU2luZ2xlLWNsaWNrIHRvZ2dsZXMgYmV0d2VlbiBwYWdlL2Rhc2hib2FyZC1tb2RlIGlmIGEgcGFnZSBpcyBoaXRcbiAgICovXG4gIHNpbmdsZUNsaWNrSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gICAgY29uc3QgdGlsZUluZGV4ID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudCh0YXJnZXQpO1xuICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgIHRpbGVJbmRleFxuICAgICk7XG4gICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXgpIHtcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH1cbiAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogRG91YmxlLWNsaWNrLWhhbmRsZXJcbiAgICogRG91YmxlLWNsaWNrIGRhc2hib2FyZC1tb2RlIHNob3VsZCBnbyB0byBwYWdlLW1vZGVcbiAgICogRG91YmxlLWNsaWNrIHBhZ2UtbW9kZSBzaG91bGRcbiAgICogICAgYSkgWm9vbSBpbiBpZiBwYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBvclxuICAgKiAgICBiKSBGaXQgdmVydGljYWxseSBpZiBwYWdlIGlzIGFscmVhZHkgem9vbWVkIGluXG4gICAqL1xuICBkYmxDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICAgIC8vIFBhZ2UgaXMgZml0dGVkIHZlcnRpY2FsbHksIHNvIGRibC1jbGljayB6b29tcyBpblxuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbihcbiAgICAgICAgVmlld2VyT3B0aW9ucy56b29tLmRibENsaWNrWm9vbUZhY3RvcixcbiAgICAgICAgZXZlbnQucG9zaXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICAgIGNvbnN0IGNhbnZhc0luZGV4OiBudW1iZXIgPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldCk7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIGNhbnZhc0luZGV4XG4gICAgICApO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaGl0IGVsZW1lbnQgaXMgYSA8cmVjdD4tZWxlbWVudFxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBpc0NhbnZhc0dyb3VwSGl0KHRhcmdldDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgU1ZHUmVjdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGlsZXNvdXJjZXMgYW5kIGFkZHMgdGhlbSB0byB2aWV3ZXJcbiAgICogQ3JlYXRlcyBzdmcgY2xpY2thYmxlIG92ZXJsYXlzIGZvciBlYWNoIHRpbGVcbiAgICovXG4gIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICBjb25zdCBjYW52YXNSZWN0czogUmVjdFtdID0gW107XG4gICAgY29uc3QgY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5ID0gQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkuY3JlYXRlKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCxcbiAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgKTtcblxuICAgIGNvbnN0IGlzVHdvUGFnZVZpZXc6IGJvb2xlYW4gPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGxldCBncm91cDogYW55ID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcblxuICAgIHRoaXMudGlsZVNvdXJjZXMuZm9yRWFjaCgodGlsZSwgaSkgPT4ge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kuY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGksXG4gICAgICAgICAgY2FudmFzU291cmNlOiB0aWxlLFxuICAgICAgICAgIHByZXZpb3VzQ2FudmFzR3JvdXBQb3NpdGlvbjogY2FudmFzUmVjdHNbaSAtIDFdLFxuICAgICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgcm90YXRpb25cbiAgICAgICk7XG5cbiAgICAgIGNhbnZhc1JlY3RzLnB1c2gocG9zaXRpb24pO1xuXG4gICAgICBjb25zdCB0aWxlU291cmNlU3RyYXRlZ3kgPSBUaWxlU291cmNlU3RyYXRlZ3lGYWN0b3J5LmNyZWF0ZSh0aWxlKTtcbiAgICAgIGNvbnN0IHRpbGVTb3VyY2UgPSB0aWxlU291cmNlU3RyYXRlZ3kuZ2V0VGlsZVNvdXJjZSh0aWxlKTtcblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3Qgcm90YXRlZCA9IHJvdGF0aW9uID09PSA5MCB8fCByb3RhdGlvbiA9PT0gMjcwO1xuXG4gICAgICAgIGxldCBib3VuZHM7XG5cbiAgICAgICAgLyogQmVjYXVzZSBpbWFnZSBzY2FsaW5nIGlzIHBlcmZvcm1lZCBiZWZvcmUgcm90YXRpb24sXG4gICAgICAgICAqIHdlIG11c3QgaW52ZXJ0IHdpZHRoICYgaGVpZ2h0IGFuZCB0cmFuc2xhdGUgcG9zaXRpb24gc28gdGhhdCB0aWxlIHJvdGF0aW9uIGVuZHMgdXAgY29ycmVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHJvdGF0ZWQpIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCArIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24ueSAtIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGhcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld2VyLmFkZFRpbGVkSW1hZ2Uoe1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHRpbGVTb3VyY2U6IHRpbGVTb3VyY2UsXG4gICAgICAgICAgZml0Qm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgZGVncmVlczogcm90YXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3ICYmIGkgJSAyICE9PSAwKSB7XG4gICAgICAgIGdyb3VwID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXkgPSBncm91cFxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBwb3NpdGlvbi54KVxuICAgICAgICAuYXR0cigneScsIHBvc2l0aW9uLnkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHBvc2l0aW9uLndpZHRoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgcG9zaXRpb24uaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGlsZScpO1xuXG4gICAgICAvLyBNYWtlIGN1c3RvbSBib3JkZXJzIGlmIGN1cnJlbnQgbGF5b3V0IGlzIHR3by1wYWdlZFxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcpIHtcbiAgICAgICAgaWYgKGkgJSAyID09PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub0xlZnRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KSArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICogMjtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vTGVmdFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpICUgMiAhPT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9SaWdodFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0ICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub1JpZ2h0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5Tm9kZTogU1ZHUmVjdEVsZW1lbnQgPSBjdXJyZW50T3ZlcmxheS5ub2RlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlzW2ldID0gY3VycmVudE92ZXJsYXlOb2RlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGF5b3V0ID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSB8fFxuICAgICAgIXRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgICAgID8gVmlld2VyTGF5b3V0Lk9ORV9QQUdFXG4gICAgICAgIDogVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5hZGRBbGwoY2FudmFzUmVjdHMsIGxheW91dCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2aWV3ZXIgc2l6ZSBhbmQgb3BhY2l0eSBvbmNlIHRoZSBmaXJzdCBjYW52YXMgZ3JvdXAgaGFzIGZ1bGx5IGxvYWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTogdm9pZCB7XG4gICAgdGhpcy5ob21lKCk7XG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCksXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgIT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGQzLnNlbGVjdCh0aGlzLnZpZXdlci5jb250YWluZXIucGFyZW50Tm9kZSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAnMScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG92ZXJsYXktaW5kZXggZm9yIGNsaWNrLWV2ZW50IGlmIGhpdFxuICAgKiBAcGFyYW0gdGFyZ2V0IGhpdCA8cmVjdD5cbiAgICovXG4gIGdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNHcm91cEhpdCh0YXJnZXQpKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cDogbnVtYmVyID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXAgPj0gMCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdGVkQ2FudmFzR3JvdXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9ucygpOiBPcHRpb25zIHtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IE9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmFqYXhXaXRoQ3JlZGVudGlhbHMgPSB0aGlzLmNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgb3B0aW9ucy5sb2FkVGlsZXNXaXRoQWpheCA9IHRoaXMuY29uZmlnLmxvYWRUaWxlc1dpdGhBamF4O1xuICAgIG9wdGlvbnMuY3Jvc3NPcmlnaW5Qb2xpY3kgPSB0aGlzLmNvbmZpZy5jcm9zc09yaWdpblBvbGljeTtcbiAgICBvcHRpb25zLmFqYXhIZWFkZXJzID0gdGhpcy5jb25maWcuYWpheEhlYWRlcnM7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICBjZW50ZXJcbiAgICAgICk7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgICBjb25zdCB2cEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcbiAgICAgIGNvbnN0IHBhbm5lZFBhc3RDYW52YXNHcm91cCA9IFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgIHZwQm91bmRzXG4gICAgICApO1xuICAgICAgY29uc3QgZGlyZWN0aW9uOiBudW1iZXIgPSBlLmRpcmVjdGlvbjtcbiAgICAgIGlmIChcbiAgICAgICAgKHBhbm5lZFBhc3RDYW52YXNHcm91cCA9PT0gU2lkZS5MRUZUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluUmlnaHRTZW1pY2lyY2xlKGRpcmVjdGlvbikpIHx8XG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuUklHSFQgJiZcbiAgICAgICAgICBTd2lwZVV0aWxzLmlzRGlyZWN0aW9uSW5MZWZ0U2VtaWNpcmNsZShkaXJlY3Rpb24pKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBzd2lwZVRvQ2FudmFzR3JvdXAoZTogYW55KSB7XG4gICAgLy8gRG9uJ3Qgc3dpcGUgb24gcGluY2ggYWN0aW9uc1xuICAgIGlmICh0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWVkOiBudW1iZXIgPSBlLnNwZWVkO1xuICAgIGNvbnN0IGRyYWdFbmRQb3Npc2lvbiA9IGUucG9zaXRpb247XG5cbiAgICBjb25zdCBpc0NhbnZhc0dyb3VwWm9vbWVkID1cbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG5cbiAgICBjb25zdCBkaXJlY3Rpb246IERpcmVjdGlvbiA9IFN3aXBlVXRpbHMuZ2V0U3dpcGVEaXJlY3Rpb24oXG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uLFxuICAgICAgZHJhZ0VuZFBvc2lzaW9uLFxuICAgICAgaXNDYW52YXNHcm91cFpvb21lZFxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyID0gdGhpcy5jYW52YXNTZXJ2aWNlXG4gICAgICAuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgY29uc3QgY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kgPSBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5LmNyZWF0ZShcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZVxuICAgICk7XG5cbiAgICBsZXQgcGFubmVkUGFzdFNpZGU6IFNpZGUgfCBudWxsO1xuICAgIGxldCBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHBhbm5lZFBhc3RTaWRlID0gU3dpcGVVdGlscy5nZXRTaWRlSWZQYW5uaW5nUGFzdEVuZE9mQ2FudmFzR3JvdXAoXG4gICAgICAgIGNhbnZhc0dyb3VwUmVjdCxcbiAgICAgICAgdmlld3BvcnRCb3VuZHNcbiAgICAgICk7XG4gICAgICB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIuYWRkSGl0KHBhbm5lZFBhc3RTaWRlLCBkaXJlY3Rpb24pO1xuICAgICAgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgPSB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIuaGl0Q291bnRSZWFjaGVkKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3Q2FudmFzR3JvdXBJbmRleCA9IGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5LmNhbGN1bGF0ZU5leHRDYW52YXNHcm91cChcbiAgICAgIHtcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwQ2VudGVyOiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpLFxuICAgICAgICBzcGVlZDogc3BlZWQsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkOiBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCxcbiAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uLFxuICAgICAgfVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCB8fFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIChjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCAmJiBkaXJlY3Rpb24pXG4gICAgKSB7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IG5ld0NhbnZhc0dyb3VwSW5kZXgsXG4gICAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZpZXdwb3J0Qm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Qm91bmRzKCk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
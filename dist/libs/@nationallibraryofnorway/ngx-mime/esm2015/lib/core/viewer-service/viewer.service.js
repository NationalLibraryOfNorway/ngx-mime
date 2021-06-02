import { Injectable, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, interval, Subject, Subscription, } from 'rxjs';
import { distinctUntilChanged, sample } from 'rxjs/operators';
import { ModeService } from '../../core/mode-service/mode.service';
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
    constructor(zone, clickService, canvasService, modeService, viewerLayoutService, iiifContentSearchService, styleService) {
        this.zone = zone;
        this.clickService = clickService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.styleService = styleService;
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
    { type: StyleService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFFUixPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUN2SCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUs3RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVC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LENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxTQUFTO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJO1lBQ3pDLENBQUMsNkJBQTZCLElBQUksU0FBUyxDQUFDLEVBQzVDO1lBQ0EsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztnQkFDM0MsZ0JBQWdCLEVBQUUsbUJBQW1CO2dCQUNyQyxXQUFXLEVBQUUsS0FBSztnQkFDbEIsU0FBUyxFQUFFLFNBQVM7YUFDckIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8saUJBQWlCOztRQUN2QixPQUFPLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7O1lBMzNCRixVQUFVOzs7WUE3Q1UsTUFBTTtZQWFsQixZQUFZO1lBRFosYUFBYTtZQUZiLFdBQVc7WUFrQlgsbUJBQW1CO1lBYm5CLHdCQUF3QjtZQVl4QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGludGVydmFsLFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNhbXBsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z092ZXJsYXkgfSBmcm9tICcuLi9leHQvc3ZnLW92ZXJsYXknO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvZGlyZWN0aW9uJztcbmltcG9ydCB7IE1hbmlmZXN0LCBSZXNvdXJjZSwgU2VydmljZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL29wdGlvbnMnO1xuaW1wb3J0IHsgUGluY2hTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcGluY2hTdGF0dXMnO1xuaW1wb3J0IHsgU2lkZSB9IGZyb20gJy4uL21vZGVscy9zaWRlJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi8uLi9tb2RlbHMvcG9pbnQnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5IH0gZnJvbSAnLi9jYWxjdWxhdGUtbmV4dC1jYW52YXMtZ3JvdXAtZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE1hc2sgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1tYXNrJztcbmltcG9ydCB7XG4gIERlZmF1bHRHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbiAgR29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG59IGZyb20gJy4vZ28tdG8tY2FudmFzLWdyb3VwLXN0cmF0ZWd5JztcbmltcG9ydCB7IFN3aXBlRHJhZ0VuZENvdW50ZXIgfSBmcm9tICcuL3N3aXBlLWRyYWctZW5kLWNvdW50ZXInO1xuaW1wb3J0IHsgU3dpcGVVdGlscyB9IGZyb20gJy4vc3dpcGUtdXRpbHMnO1xuaW1wb3J0IHsgVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vdGlsZS1zb3VyY2Utc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBEZWZhdWx0Wm9vbVN0cmF0ZWd5LCBab29tU3RyYXRlZ3kgfSBmcm9tICcuL3pvb20tc3RyYXRlZ3knO1xuXG5kZWNsYXJlIGNvbnN0IE9wZW5TZWFkcmFnb246IGFueTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI/OiBhbnk7XG4gIHByaXZhdGUgc3ZnT3ZlcmxheTogYW55O1xuICBwcml2YXRlIHN2Z05vZGU6IGFueTtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PiA9IFtdO1xuICBwcml2YXRlIHRpbGVTb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIHB1YmxpYyBpc0NhbnZhc1ByZXNzZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIGZhbHNlXG4gICk7XG5cbiAgcHJpdmF0ZSBjdXJyZW50Q2VudGVyOiBTdWJqZWN0PFBvaW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudENhbnZhc0luZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgY3VycmVudEhpdCA9IG5ldyBTdWJqZWN0PEhpdD4oKTtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IG9uUm90YXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2VudGVyQ2hhbmdlKCk6IE9ic2VydmFibGU8UG9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2VudGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uSGl0Q2hhbmdlKCk6IE9ic2VydmFibGU8SGl0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEhpdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uT3NkUmVhZHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3NkSXNSZWFkeS5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Vmlld2VyKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyO1xuICB9XG5cbiAgcHVibGljIGdldFRpbGVzb3VyY2VzKCk6IFJlc291cmNlW10ge1xuICAgIHJldHVybiB0aGlzLnRpbGVTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldE92ZXJsYXlzKCk6IFNWR1JlY3RFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlzO1xuICB9XG5cbiAgcHVibGljIGdldFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1pblpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWluWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1heFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWF4Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGhvbWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKHRoaXMubW9kZVNlcnZpY2UubW9kZSk7XG5cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmNlbnRlckN1cnJlbnRDYW52YXMoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub05leHRDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXNHcm91cChjYW52YXNHcm91cEluZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogY2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBpbW1lZGlhdGVseSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzKGNhbnZhc0luZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgY2FudmFzSW5kZXhcbiAgICApO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0KHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZ2h0bGlnaHQoKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGlmIChzZWFyY2hSZXN1bHQucSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2hSZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBzZWFyY2hSZXN1bHQuaGl0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHJlY3Qgb2YgaGl0LnJlY3RzKSB7XG4gICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNSZWN0KGhpdC5pbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc1JlY3QpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgeCA9IGNhbnZhc1JlY3QueDtcbiAgICAgICAgICAgIGxldCB5ID0gY2FudmFzUmVjdC55O1xuXG4gICAgICAgICAgICAvKiBoaXQgcmVjdCBhcmUgcmVsYXRpdmUgdG8gZWFjaCB1bnJvdGF0ZWQgcGFnZSBjYW52YXNSZWN0IHNvIHgseSBtdXN0IGJlIGFkanVzdGVkIGJ5IHRoZSByZW1haW5pbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggKz0gcmVjdC54O1xuICAgICAgICAgICAgICAgIHkgKz0gcmVjdC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gcmVjdC55IC0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDE4MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSAocmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIChyZWN0LnkgKyByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAyNzA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIHJlY3QueCAtIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY3VycmVudE92ZXJsYXk6IFNWR1JlY3RFbGVtZW50ID0gdGhpcy5zdmdOb2RlXG4gICAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAuYXR0cignbWltZUhpdEluZGV4JywgaGl0LmlkKVxuICAgICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAgIC5hdHRyKCd5JywgeSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLnN2Z05vZGUuc2VsZWN0QWxsKGBnID4gcmVjdC5zZWxlY3RlZGApLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIHRoaXMuc3ZnTm9kZVxuICAgICAgLnNlbGVjdEFsbChgZyA+IHJlY3RbbWltZUhpdEluZGV4PScke2hpdC5pZH0nXWApXG4gICAgICAuYXR0cignY2xhc3MnLCAnaGl0IHNlbGVjdGVkJyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJIaWdodGxpZ2h0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN2Z05vZGUpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoJy5oaXQnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBWaWV3ZXIobWFuaWZlc3Q6IE1hbmlmZXN0LCBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QudGlsZVNvdXJjZSkge1xuICAgICAgdGhpcy50aWxlU291cmNlcyA9IG1hbmlmZXN0LnRpbGVTb3VyY2U7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkID0gTWFuaWZlc3RVdGlscy5pc01hbmlmZXN0UGFnZWQodGhpcy5tYW5pZmVzdCk7XG4gICAgICAgIHRoaXMudmlld2VyID0gbmV3IE9wZW5TZWFkcmFnb24uVmlld2VyKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpKVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVTdmdPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRab29tU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgIHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgVGhpcyBkaXNhYmxlcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIG9wZW5zZWFkcmFnb24uXG4gICAgICAgICAgV2UgdXNlIHMgZm9yIG9wZW5pbmcgc2VhcmNoIGRpYWxvZyBhbmQgT1NEIHVzZSB0aGUgc2FtZSBrZXkgZm9yIHBhbm5pbmcuXG4gICAgICAgICAgSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzc5NFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXIgPSB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXI7XG4gICAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrID0gbmV3IENhbnZhc0dyb3VwTWFzayhcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkVG9XaW5kb3coKTtcbiAgICAgIHRoaXMuc2V0dXBPdmVybGF5cygpO1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICB0aGlzLm1vZGVDaGFuZ2VkKG1vZGUpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHRoaXMub25DZW50ZXJDaGFuZ2VcbiAgICAgICAgICAucGlwZShzYW1wbGUoaW50ZXJ2YWwoNTAwKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY2VudGVyOiBQb2ludCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyKTtcbiAgICAgICAgICAgIGlmIChjZW50ZXIgJiYgY2VudGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLnJlc2V0KCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5jaGFuZ2VDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0KTtcbiAgICAgICAgICB0aGlzLmdvVG9DYW52YXMoaGl0LmluZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uUm90YXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChyb3RhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbGF5b3V0UGFnZXMoKSB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0luZGV4O1xuICAgICAgdGhpcy5kZXN0cm95KHRydWUpO1xuICAgICAgdGhpcy5zZXRVcFZpZXdlcih0aGlzLm1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICAgIGN1cnJlbnRDYW52YXNJbmRleFxuICAgICAgICApLFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgLy8gUmVjcmVhdGUgaGlnaGxpZ2h0cyBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgc2VhcmNoIGdvaW5nIG9uXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuY3VycmVudFNlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVG9XaW5kb3coKSB7XG4gICAgKDxhbnk+d2luZG93KS5vcGVuU2VhZHJhZ29uVmlld2VyID0gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBzZXR1cE92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMuc3ZnT3ZlcmxheSA9IHRoaXMudmlld2VyLnN2Z092ZXJsYXkoKTtcbiAgICB0aGlzLnN2Z05vZGUgPSBkMy5zZWxlY3QodGhpcy5zdmdPdmVybGF5Lm5vZGUoKSk7XG4gIH1cblxuICBkaXNhYmxlS2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0S2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGxheW91dFN3aXRjaCB0cnVlIGlmIHN3aXRjaGluZyBiZXR3ZWVuIGxheW91dHNcbiAgICogdG8ga2VlcCBjdXJyZW50IHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb25cbiAgICovXG4gIGRlc3Ryb3kobGF5b3V0U3dpdGNoPzogYm9vbGVhbikge1xuICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgIGlmICh0aGlzLnZpZXdlciAhPSBudWxsICYmIHRoaXMudmlld2VyLmlzT3BlbigpKSB7XG4gICAgICBpZiAodGhpcy52aWV3ZXIuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKS5zdHlsZSgnb3BhY2l0eScsICcwJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXdlci5kZXN0cm95KCk7XG4gICAgICB0aGlzLnZpZXdlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICBpZiAodGhpcy5jYW52YXNHcm91cE1hc2spIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gS2VlcCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uIG9ubHkgaWYgbGF5b3V0LXN3aXRjaFxuICAgIGlmICghbGF5b3V0U3dpdGNoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBudWxsO1xuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KDApO1xuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5yZXNldCgpO1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFkZFNpbmdsZUNsaWNrSGFuZGxlcih0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcik7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkRG91YmxlQ2xpY2tIYW5kbGVyKHRoaXMuZGJsQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24tZmluaXNoJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWNsaWNrJywgdGhpcy5jbGlja1NlcnZpY2UuY2xpY2spO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoXG4gICAgICAnY2FudmFzLWRvdWJsZS1jbGljaycsXG4gICAgICAoZTogYW55KSA9PiAoZS5wcmV2ZW50RGVmYXVsdEFjdGlvbiA9IHRydWUpXG4gICAgKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcHJlc3MnLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiA9IGUucG9zaXRpb247XG4gICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZC5uZXh0KHRydWUpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1yZWxlYXNlJywgKCkgPT5cbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQoZmFsc2UpXG4gICAgKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcGluY2gnLCB0aGlzLnBpbmNoSGFuZGxlcik7XG5cbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZycsIChlOiBhbnkpID0+IHRoaXMuZHJhZ0hhbmRsZXIoZSkpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnLWVuZCcsIChlOiBhbnkpID0+XG4gICAgICB0aGlzLnN3aXBlVG9DYW52YXNHcm91cChlKVxuICAgICk7XG5cbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24nLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHpvb21Jbih6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHpvb21PdXQoem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KCh0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCkgKyA5MCkgJSAzNjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3IgbW9kZS1jaGFuZ2VcbiAgICogQHBhcmFtIG1vZGUgVmlld2VyTW9kZVxuICAgKi9cbiAgbW9kZUNoYW5nZWQobW9kZTogTW9kZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb0Rhc2hib2FyZCgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvUGFnZSgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IHRydWU7XG4gICAgICB0aGlzLnJlc2V0S2V5RG93bkhhbmRsZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gREFTSEJPQVJELW1vZGUsIHJlcG9zaXRpb25zIGNhbnZhcyBncm91cCBhbmQgcmVtb3ZlcyBtYXgtd2lkdGggb24gdmlld2VyXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5oaWRlKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuREFTSEJPQVJEKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBQQUdFLW1vZGUsIGNlbnRlcnMgY3VycmVudCBjYW52YXMgZ3JvdXAgYW5kIHJlcG9zaXRpb25zIG90aGVyIGNhbnZhcyBncm91cHNcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9QYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5zaG93KCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuUEFHRSk7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsLWhhbmRsZXJcbiAgICovXG4gIHNjcm9sbEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBNYXRoLnBvdyhWaWV3ZXJPcHRpb25zLnpvb20uem9vbUZhY3RvciwgZXZlbnQuc2Nyb2xsKTtcbiAgICAvLyBTY3JvbGxpbmcgdXBcbiAgICBpZiAoZXZlbnQuc2Nyb2xsID4gMCkge1xuICAgICAgdGhpcy56b29tSW5HZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFNjcm9sbGluZyBkb3duXG4gICAgfSBlbHNlIGlmIChldmVudC5zY3JvbGwgPCAwKSB7XG4gICAgICB0aGlzLnpvb21PdXRHZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFBpbmNoLWhhbmRsZXJcbiAgICovXG4gIHBpbmNoSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgdGhpcy5waW5jaFN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBldmVudC5kaXN0YW5jZSAvIGV2ZW50Lmxhc3REaXN0YW5jZTtcbiAgICAvLyBQaW5jaCBPdXRcbiAgICBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSA+XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21JblBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBQaW5jaCBJblxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGQgPFxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBvaW50IHRvIHpvb20gdG8uIElmIG5vdCBzZXQsIHRoZSB2aWV3ZXIgd2lsbCB6b29tIHRvIGNlbnRlclxuICAgKi9cbiAgem9vbUluR2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHpvb21PdXRHZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHpvb20gaW4gcGluY2ggZ2VzdHVyZSAocGluY2ggb3V0KVxuICAgKlxuICAgKiBUb2dnbGUgdG8gcGFnZSBtb2RlIGFuZCBab29tIGluXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21JblBpbmNoR2VzdHVyZShldmVudDogYW55LCB6b29tRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnpvb21Jbih6b29tRmFjdG9yLCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uIHx8IGV2ZW50LmNlbnRlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBvdXQgcGluY2ggZ2VzdHVyZSAocGluY2ggaW4pXG4gICAqXG4gICAqIFpvb20gb3V0IGFuZCB0b2dnbGUgdG8gZGFzaGJvYXJkIHdoZW4gYWxsIHpvb21lZCBvdXQuXG4gICAqIFN0b3AgYmV0d2VlbiB6b29taW5nIG91dCBhbmQgdG9nZ2xpbmcgdG8gZGFzaGJvYXJkLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZnJvbSBwaW5jaCBnZXN0dXJlXG4gICAqL1xuICB6b29tT3V0UGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGdlc3R1cmVJZCA9IGV2ZW50Lmdlc3R1cmVQb2ludHNbMF0uaWQ7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gdHJ1ZTtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgZXZlbnQuY2VudGVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgfHxcbiAgICAgICAgZ2VzdHVyZUlkID09PSB0aGlzLnBpbmNoU3RhdHVzLnByZXZpb3VzR2VzdHVyZUlkICsgMlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgPSBnZXN0dXJlSWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbmdsZS1jbGljay1oYW5kbGVyXG4gICAqIFNpbmdsZS1jbGljayB0b2dnbGVzIGJldHdlZW4gcGFnZS9kYXNoYm9hcmQtbW9kZSBpZiBhIHBhZ2UgaXMgaGl0XG4gICAqL1xuICBzaW5nbGVDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHRpbGVJbmRleCA9IHRoaXMuZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQodGFyZ2V0KTtcbiAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICB0aWxlSW5kZXhcbiAgICApO1xuICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4KSB7XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9XG4gICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERvdWJsZS1jbGljay1oYW5kbGVyXG4gICAqIERvdWJsZS1jbGljayBkYXNoYm9hcmQtbW9kZSBzaG91bGQgZ28gdG8gcGFnZS1tb2RlXG4gICAqIERvdWJsZS1jbGljayBwYWdlLW1vZGUgc2hvdWxkXG4gICAqICAgIGEpIFpvb20gaW4gaWYgcGFnZSBpcyBmaXR0ZWQgdmVydGljYWxseSwgb3JcbiAgICogICAgYikgRml0IHZlcnRpY2FsbHkgaWYgcGFnZSBpcyBhbHJlYWR5IHpvb21lZCBpblxuICAgKi9cbiAgZGJsQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgICAvLyBQYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBzbyBkYmwtY2xpY2sgem9vbXMgaW5cbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oXG4gICAgICAgIFZpZXdlck9wdGlvbnMuem9vbS5kYmxDbGlja1pvb21GYWN0b3IsXG4gICAgICAgIGV2ZW50LnBvc2l0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgICBjb25zdCBjYW52YXNJbmRleDogbnVtYmVyID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudCh0YXJnZXQpO1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICBjYW52YXNJbmRleFxuICAgICAgKTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGhpdCBlbGVtZW50IGlzIGEgPHJlY3Q+LWVsZW1lbnRcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgaXNDYW52YXNHcm91cEhpdCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFNWR1JlY3RFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRpbGVzb3VyY2VzIGFuZCBhZGRzIHRoZW0gdG8gdmlld2VyXG4gICAqIENyZWF0ZXMgc3ZnIGNsaWNrYWJsZSBvdmVybGF5cyBmb3IgZWFjaCB0aWxlXG4gICAqL1xuICBjcmVhdGVPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gICAgY29uc3QgY2FudmFzUmVjdHM6IFJlY3RbXSA9IFtdO1xuICAgIGNvbnN0IGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneSA9IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5LmNyZWF0ZShcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQsXG4gICAgICB0aGlzLmlzTWFuaWZlc3RQYWdlZFxuICAgICk7XG5cbiAgICBjb25zdCBpc1R3b1BhZ2VWaWV3OiBib29sZWFuID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgICBjb25zdCByb3RhdGlvbiA9IHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKTtcbiAgICBsZXQgZ3JvdXA6IGFueSA9IHRoaXMuc3ZnTm9kZS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdwYWdlLWdyb3VwJyk7XG5cbiAgICB0aGlzLnRpbGVTb3VyY2VzLmZvckVhY2goKHRpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5LmNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBjYW52YXNHcm91cEluZGV4OiBpLFxuICAgICAgICAgIGNhbnZhc1NvdXJjZTogdGlsZSxcbiAgICAgICAgICBwcmV2aW91c0NhbnZhc0dyb3VwUG9zaXRpb246IGNhbnZhc1JlY3RzW2kgLSAxXSxcbiAgICAgICAgICB2aWV3aW5nRGlyZWN0aW9uOiB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHJvdGF0aW9uXG4gICAgICApO1xuXG4gICAgICBjYW52YXNSZWN0cy5wdXNoKHBvc2l0aW9uKTtcblxuICAgICAgY29uc3QgdGlsZVNvdXJjZVN0cmF0ZWd5ID0gVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeS5jcmVhdGUodGlsZSk7XG4gICAgICBjb25zdCB0aWxlU291cmNlID0gdGlsZVNvdXJjZVN0cmF0ZWd5LmdldFRpbGVTb3VyY2UodGlsZSk7XG5cbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZWQgPSByb3RhdGlvbiA9PT0gOTAgfHwgcm90YXRpb24gPT09IDI3MDtcblxuICAgICAgICBsZXQgYm91bmRzO1xuXG4gICAgICAgIC8qIEJlY2F1c2UgaW1hZ2Ugc2NhbGluZyBpcyBwZXJmb3JtZWQgYmVmb3JlIHJvdGF0aW9uLFxuICAgICAgICAgKiB3ZSBtdXN0IGludmVydCB3aWR0aCAmIGhlaWdodCBhbmQgdHJhbnNsYXRlIHBvc2l0aW9uIHNvIHRoYXQgdGlsZSByb3RhdGlvbiBlbmRzIHVwIGNvcnJlY3RcbiAgICAgICAgICovXG4gICAgICAgIGlmIChyb3RhdGVkKSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLnggKyAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgLSAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodCxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCxcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdlci5hZGRUaWxlZEltYWdlKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0aWxlU291cmNlOiB0aWxlU291cmNlLFxuICAgICAgICAgIGZpdEJvdW5kczogYm91bmRzLFxuICAgICAgICAgIGRlZ3JlZXM6IHJvdGF0aW9uLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNUd29QYWdlVmlldyAmJiBpICUgMiAhPT0gMCkge1xuICAgICAgICBncm91cCA9IHRoaXMuc3ZnTm9kZS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdwYWdlLWdyb3VwJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5ID0gZ3JvdXBcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCd4JywgcG9zaXRpb24ueClcbiAgICAgICAgLmF0dHIoJ3knLCBwb3NpdGlvbi55KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBwb3NpdGlvbi53aWR0aClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHBvc2l0aW9uLmhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbGUnKTtcblxuICAgICAgLy8gTWFrZSBjdXN0b20gYm9yZGVycyBpZiBjdXJyZW50IGxheW91dCBpcyB0d28tcGFnZWRcbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3KSB7XG4gICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9MZWZ0U3Ryb2tlU3R5bGUgPVxuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCkgK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCAqIDI7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub0xlZnRTdHJva2VTdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSAlIDIgIT09IDAgJiYgaSAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG5vUmlnaHRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIE51bWJlcihwb3NpdGlvbi53aWR0aCAqIDIgKyBwb3NpdGlvbi5oZWlnaHQpO1xuICAgICAgICAgIGN1cnJlbnRPdmVybGF5LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jywgbm9SaWdodFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50T3ZlcmxheU5vZGU6IFNWR1JlY3RFbGVtZW50ID0gY3VycmVudE92ZXJsYXkubm9kZSgpO1xuICAgICAgdGhpcy5vdmVybGF5c1tpXSA9IGN1cnJlbnRPdmVybGF5Tm9kZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxheW91dCA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UgfHxcbiAgICAgICF0aGlzLmlzTWFuaWZlc3RQYWdlZFxuICAgICAgICA/IFZpZXdlckxheW91dC5PTkVfUEFHRVxuICAgICAgICA6IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UuYWRkQWxsKGNhbnZhc1JlY3RzLCBsYXlvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdmlld2VyIHNpemUgYW5kIG9wYWNpdHkgb25jZSB0aGUgZmlyc3QgY2FudmFzIGdyb3VwIGhhcyBmdWxseSBsb2FkZWRcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuaG9tZSgpO1xuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpLFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlICE9PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRFxuICAgICk7XG4gICAgaWYgKHRoaXMudmlld2VyKSB7XG4gICAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSlcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgJzEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvdmVybGF5LWluZGV4IGZvciBjbGljay1ldmVudCBpZiBoaXRcbiAgICogQHBhcmFtIHRhcmdldCBoaXQgPHJlY3Q+XG4gICAqL1xuICBnZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudCh0YXJnZXQ6IGFueSkge1xuICAgIGlmICh0aGlzLmlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0KSkge1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXA6IG51bWJlciA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwID49IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RlZENhbnZhc0dyb3VwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvbnMoKTogT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgb3B0aW9ucy5hamF4V2l0aENyZWRlbnRpYWxzID0gdGhpcy5jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIG9wdGlvbnMubG9hZFRpbGVzV2l0aEFqYXggPSB0aGlzLmNvbmZpZy5sb2FkVGlsZXNXaXRoQWpheDtcbiAgICBvcHRpb25zLmNyb3NzT3JpZ2luUG9saWN5ID0gdGhpcy5jb25maWcuY3Jvc3NPcmlnaW5Qb2xpY3k7XG4gICAgb3B0aW9ucy5hamF4SGVhZGVycyA9IHRoaXMuY29uZmlnLmFqYXhIZWFkZXJzO1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyOiBQb2ludCkge1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDbG9zZXN0Q2FudmFzR3JvdXBJbmRleChcbiAgICAgICAgY2VudGVyXG4gICAgICApO1xuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXgubmV4dChjdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmFnSGFuZGxlciA9IChlOiBhbnkpID0+IHtcbiAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgICAgY29uc3QgdnBCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2cEJvdW5kc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogbnVtYmVyID0gZS5kaXJlY3Rpb247XG4gICAgICBpZiAoXG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuTEVGVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JblJpZ2h0U2VtaWNpcmNsZShkaXJlY3Rpb24pKSB8fFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLlJJR0hUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluTGVmdFNlbWljaXJjbGUoZGlyZWN0aW9uKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgc3dpcGVUb0NhbnZhc0dyb3VwKGU6IGFueSkge1xuICAgIC8vIERvbid0IHN3aXBlIG9uIHBpbmNoIGFjdGlvbnNcbiAgICBpZiAodGhpcy5waW5jaFN0YXR1cy5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVlZDogbnVtYmVyID0gZS5zcGVlZDtcbiAgICBjb25zdCBkcmFnRW5kUG9zaXNpb24gPSBlLnBvc2l0aW9uO1xuXG4gICAgY29uc3QgaXNDYW52YXNHcm91cFpvb21lZCA9XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG5cbiAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0Qm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBTd2lwZVV0aWxzLmdldFN3aXBlRGlyZWN0aW9uKFxuICAgICAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbixcbiAgICAgIGRyYWdFbmRQb3Npc2lvbixcbiAgICAgIGlzQ2FudmFzR3JvdXBab29tZWRcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlciA9IHRoaXMuY2FudmFzU2VydmljZVxuICAgICAgLmN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICAgIGNvbnN0IGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5ID0gQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwRmFjdG9yeS5jcmVhdGUoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGVcbiAgICApO1xuXG4gICAgbGV0IHBhbm5lZFBhc3RTaWRlOiBTaWRlIHwgbnVsbDtcbiAgICBsZXQgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICBwYW5uZWRQYXN0U2lkZSA9IFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgIHZpZXdwb3J0Qm91bmRzXG4gICAgICApO1xuICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmFkZEhpdChwYW5uZWRQYXN0U2lkZSwgZGlyZWN0aW9uKTtcbiAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkID0gdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmhpdENvdW50UmVhY2hlZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0NhbnZhc0dyb3VwSW5kZXggPSBjYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneS5jYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXAoXG4gICAgICB7XG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cENlbnRlcjogdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKSxcbiAgICAgICAgc3BlZWQ6IHNwZWVkLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IGN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZDogY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQsXG4gICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgIH1cbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICAoY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgJiYgZGlyZWN0aW9uKVxuICAgICkge1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OiBuZXdDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaWV3cG9ydEJvdW5kcygpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldEJvdW5kcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
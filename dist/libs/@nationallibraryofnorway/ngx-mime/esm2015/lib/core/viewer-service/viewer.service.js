import { Injectable, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { distinctUntilChanged, sample, takeUntil } from 'rxjs/operators';
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
        this.destroyed = new Subject();
        this.isCanvasPressed = new BehaviorSubject(false);
        this.currentCenter = new Subject();
        this.currentCanvasIndex = new BehaviorSubject(0);
        this.currentHit = new BehaviorSubject(null);
        this.osdIsReady = new BehaviorSubject(false);
        this.swipeDragEndCounter = new SwipeDragEndCounter();
        this.pinchStatus = new PinchStatus();
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
                const dragEndPosision = e.position;
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
        this.modeService.onChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((mode) => {
            this.modeChanged(mode);
        });
        this.zone.runOutsideAngular(() => {
            this.onCenterChange
                .pipe(takeUntil(this.destroyed), sample(interval(500)))
                .subscribe((center) => {
                this.calculateCurrentCanvasGroup(center);
                if (center && center !== null) {
                    this.osdIsReady.next(true);
                }
            });
        });
        this.canvasService.onCanvasGroupIndexChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((canvasGroupIndex) => {
            this.swipeDragEndCounter.reset();
            if (canvasGroupIndex !== -1) {
                this.canvasGroupMask.changeCanvasGroup(this.canvasService.getCanvasGroupRect(canvasGroupIndex));
                if (this.modeService.mode === ViewerMode.PAGE) {
                    this.zoomStrategy.goToHomeZoom();
                }
            }
        });
        this.onOsdReadyChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((state) => {
            var _a;
            if (state) {
                this.initialCanvasGroupLoaded();
                this.currentCenter.next((_a = this.viewer) === null || _a === void 0 ? void 0 : _a.viewport.getCenter(true));
            }
        });
        this.viewerLayoutService.onChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((state) => {
            this.layoutPages();
        });
        this.iiifContentSearchService.onSelected
            .pipe(takeUntil(this.destroyed))
            .subscribe((hit) => {
            if (hit) {
                this.highlightCurrentHit(hit);
                this.goToCanvas(hit.index, false);
            }
        });
        this.onRotationChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((rotation) => {
            this.layoutPages();
        });
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
        this.currentCenter.next(null);
        if (this.viewer != null && this.viewer.isOpen()) {
            if (this.viewer.container != null) {
                d3.select(this.viewer.container.parentNode).style('opacity', '0');
            }
            this.viewer.destroy();
            this.viewer = null;
        }
        this.destroyed.next();
        this.overlays = null;
        this.canvasService.reset();
        if (this.canvasGroupMask) {
            this.canvasGroupMask.destroy();
        }
        // Keep search-state and rotation only if layout-switch
        if (!layoutSwitch) {
            this.currentSearch = null;
            this.iiifContentSearchService.destroy();
            this.rotation.next(0);
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
        this.canvasGroupMask.initialise(this.canvasService.getCurrentCanvasGroupRect(), this.modeService.mode !== ViewerMode.DASHBOARD);
        d3.select(this.viewer.container.parentNode)
            .transition()
            .duration(ViewerOptions.transitions.OSDAnimationTime)
            .style('opacity', '1');
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
        let pannedPastSide, canvasGroupEndHitCountReached;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDdkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFLN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FB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QixJQUFJLFNBQVMsQ0FBQyxFQUM1QztZQUNBLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLG1CQUFtQjtnQkFDckMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjs7UUFDdkIsYUFBTyxJQUFJLENBQUMsTUFBTSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxHQUFHO0lBQzNDLENBQUM7OztZQTMyQkYsVUFBVTs7O1lBdkNVLE1BQU07WUFPbEIsWUFBWTtZQURaLGFBQWE7WUFGYixXQUFXO1lBa0JYLG1CQUFtQjtZQWJuQix3QkFBd0I7WUFZeEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBpbnRlcnZhbCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNhbXBsZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9jYW52YXMtZ3JvdXAtcG9zaXRpb24vY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9jbGljay1zZXJ2aWNlL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnT3ZlcmxheSB9IGZyb20gJy4uL2V4dC9zdmctb3ZlcmxheSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy9kaXJlY3Rpb24nO1xuaW1wb3J0IHsgTWFuaWZlc3QsIFNlcnZpY2UgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgTW9kZUNoYW5nZXMgfSBmcm9tICcuLi9tb2RlbHMvbW9kZUNoYW5nZXMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vcHRpb25zJztcbmltcG9ydCB7IFBpbmNoU3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3BpbmNoU3RhdHVzJztcbmltcG9ydCB7IFNpZGUgfSBmcm9tICcuLi9tb2RlbHMvc2lkZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1tb2RlJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vLi4vbW9kZWxzL3BvaW50JztcbmltcG9ydCB7IFJlY3QgfSBmcm9tICcuLy4uL21vZGVscy9yZWN0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwRmFjdG9yeSB9IGZyb20gJy4vY2FsY3VsYXRlLW5leHQtY2FudmFzLWdyb3VwLWZhY3RvcnknO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBNYXNrIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtbWFzayc7XG5pbXBvcnQge1xuICBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG4gIEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LFxufSBmcm9tICcuL2dvLXRvLWNhbnZhcy1ncm91cC1zdHJhdGVneSc7XG5pbXBvcnQgeyBTd2lwZURyYWdFbmRDb3VudGVyIH0gZnJvbSAnLi9zd2lwZS1kcmFnLWVuZC1jb3VudGVyJztcbmltcG9ydCB7IFN3aXBlVXRpbHMgfSBmcm9tICcuL3N3aXBlLXV0aWxzJztcbmltcG9ydCB7IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3RpbGUtc291cmNlLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgRGVmYXVsdFpvb21TdHJhdGVneSwgWm9vbVN0cmF0ZWd5IH0gZnJvbSAnLi96b29tLXN0cmF0ZWd5JztcblxuZGVjbGFyZSBjb25zdCBPcGVuU2VhZHJhZ29uOiBhbnk7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld2VyU2VydmljZSB7XG4gIHByaXZhdGUgdmlld2VyPzogYW55O1xuICBwcml2YXRlIHN2Z092ZXJsYXk6IGFueTtcbiAgcHJpdmF0ZSBzdmdOb2RlOiBhbnk7XG4gIHByaXZhdGUgY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PjtcbiAgcHJpdmF0ZSB0aWxlU291cmNlczogQXJyYXk8U2VydmljZT47XG4gIHByaXZhdGUgZGVzdHJveWVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwdWJsaWMgaXNDYW52YXNQcmVzc2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICBmYWxzZVxuICApO1xuXG4gIHByaXZhdGUgY3VycmVudENlbnRlcjogU3ViamVjdDxQb2ludD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGN1cnJlbnRDYW52YXNJbmRleDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBwcml2YXRlIGN1cnJlbnRIaXQ6IEJlaGF2aW9yU3ViamVjdDxIaXQ+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBzd2lwZURyYWdFbmRDb3VudGVyID0gbmV3IFN3aXBlRHJhZ0VuZENvdW50ZXIoKTtcbiAgcHJpdmF0ZSBjYW52YXNHcm91cE1hc2s6IENhbnZhc0dyb3VwTWFzaztcbiAgcHJpdmF0ZSBwaW5jaFN0YXR1cyA9IG5ldyBQaW5jaFN0YXR1cygpO1xuICBwcml2YXRlIGRyYWdTdGFydFBvc2l0aW9uOiBhbnk7XG4gIHByaXZhdGUgbWFuaWZlc3Q6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBkZWZhdWx0S2V5RG93bkhhbmRsZXI6IGFueTtcblxuICBwdWJsaWMgY3VycmVudFNlYXJjaDogU2VhcmNoUmVzdWx0O1xuICBwcml2YXRlIHpvb21TdHJhdGVneTogWm9vbVN0cmF0ZWd5O1xuICBwcml2YXRlIGdvVG9DYW52YXNHcm91cFN0cmF0ZWd5OiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IG9uUm90YXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2VudGVyQ2hhbmdlKCk6IE9ic2VydmFibGU8UG9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2VudGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uSGl0Q2hhbmdlKCk6IE9ic2VydmFibGU8SGl0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEhpdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uT3NkUmVhZHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3NkSXNSZWFkeS5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgcHVibGljIGdldFZpZXdlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpZXdlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaWxlc291cmNlcygpOiBTZXJ2aWNlW10ge1xuICAgIHJldHVybiB0aGlzLnRpbGVTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldE92ZXJsYXlzKCk6IFNWR1JlY3RFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlzO1xuICB9XG5cbiAgcHVibGljIGdldFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1pblpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWluWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdldE1heFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy56b29tU3RyYXRlZ3kuZ2V0TWF4Wm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGhvbWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKHRoaXMubW9kZVNlcnZpY2UubW9kZSk7XG5cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmNlbnRlckN1cnJlbnRDYW52YXMoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub05leHRDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXNHcm91cChjYW52YXNHcm91cEluZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogY2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBpbW1lZGlhdGVseSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzKGNhbnZhc0luZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgY2FudmFzSW5kZXhcbiAgICApO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0KHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZ2h0bGlnaHQoKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGlmIChzZWFyY2hSZXN1bHQucSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2hSZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBzZWFyY2hSZXN1bHQuaGl0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHJlY3Qgb2YgaGl0LnJlY3RzKSB7XG4gICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNSZWN0KGhpdC5pbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc1JlY3QpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgeCA9IGNhbnZhc1JlY3QueDtcbiAgICAgICAgICAgIGxldCB5ID0gY2FudmFzUmVjdC55O1xuXG4gICAgICAgICAgICAvKiBoaXQgcmVjdCBhcmUgcmVsYXRpdmUgdG8gZWFjaCB1bnJvdGF0ZWQgcGFnZSBjYW52YXNSZWN0IHNvIHgseSBtdXN0IGJlIGFkanVzdGVkIGJ5IHRoZSByZW1haW5pbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggKz0gcmVjdC54O1xuICAgICAgICAgICAgICAgIHkgKz0gcmVjdC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gcmVjdC55IC0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDE4MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSAocmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIChyZWN0LnkgKyByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAyNzA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgeSArPSBjYW52YXNSZWN0LmhlaWdodCAtIHJlY3QueCAtIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY3VycmVudE92ZXJsYXk6IFNWR1JlY3RFbGVtZW50ID0gdGhpcy5zdmdOb2RlXG4gICAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAuYXR0cignbWltZUhpdEluZGV4JywgaGl0LmlkKVxuICAgICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAgIC5hdHRyKCd5JywgeSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZ2hsaWdodEN1cnJlbnRIaXQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLnN2Z05vZGUuc2VsZWN0QWxsKGBnID4gcmVjdC5zZWxlY3RlZGApLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgIHRoaXMuc3ZnTm9kZVxuICAgICAgLnNlbGVjdEFsbChgZyA+IHJlY3RbbWltZUhpdEluZGV4PScke2hpdC5pZH0nXWApXG4gICAgICAuYXR0cignY2xhc3MnLCAnaGl0IHNlbGVjdGVkJyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJIaWdodGxpZ2h0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN2Z05vZGUpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoJy5oaXQnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBWaWV3ZXIobWFuaWZlc3Q6IE1hbmlmZXN0LCBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QudGlsZVNvdXJjZSkge1xuICAgICAgdGhpcy50aWxlU291cmNlcyA9IG1hbmlmZXN0LnRpbGVTb3VyY2U7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkID0gTWFuaWZlc3RVdGlscy5pc01hbmlmZXN0UGFnZWQodGhpcy5tYW5pZmVzdCk7XG4gICAgICAgIHRoaXMudmlld2VyID0gbmV3IE9wZW5TZWFkcmFnb24uVmlld2VyKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0T3B0aW9ucygpKVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVTdmdPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRab29tU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgIHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgVGhpcyBkaXNhYmxlcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIG9wZW5zZWFkcmFnb24uXG4gICAgICAgICAgV2UgdXNlIHMgZm9yIG9wZW5pbmcgc2VhcmNoIGRpYWxvZyBhbmQgT1NEIHVzZSB0aGUgc2FtZSBrZXkgZm9yIHBhbm5pbmcuXG4gICAgICAgICAgSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzc5NFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXIgPSB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXI7XG4gICAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrID0gbmV3IENhbnZhc0dyb3VwTWFzayhcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkVG9XaW5kb3coKTtcbiAgICAgIHRoaXMuc2V0dXBPdmVybGF5cygpO1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlU2VydmljZS5vbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKG1vZGU6IE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgIHRoaXMubW9kZUNoYW5nZWQobW9kZSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm9uQ2VudGVyQ2hhbmdlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksIHNhbXBsZShpbnRlcnZhbCg1MDApKSlcbiAgICAgICAgLnN1YnNjcmliZSgoY2VudGVyOiBQb2ludCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKGNlbnRlcik7XG4gICAgICAgICAgaWYgKGNlbnRlciAmJiBjZW50ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5yZXNldCgpO1xuICAgICAgICBpZiAoY2FudmFzR3JvdXBJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5jaGFuZ2VDYW52YXNHcm91cChcbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cFJlY3QoY2FudmFzR3JvdXBJbmRleClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMub25Pc2RSZWFkeUNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICB0aGlzLmxheW91dFBhZ2VzKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uU2VsZWN0ZWRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKChoaXQ6IEhpdCkgPT4ge1xuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRDdXJyZW50SGl0KGhpdCk7XG4gICAgICAgICAgdGhpcy5nb1RvQ2FudmFzKGhpdC5pbmRleCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMub25Sb3RhdGlvbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJvdGF0aW9uOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5sYXlvdXRQYWdlcygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxheW91dFBhZ2VzKCkge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0luZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNJbmRleDtcbiAgICAgIHRoaXMuZGVzdHJveSh0cnVlKTtcbiAgICAgIHRoaXMuc2V0VXBWaWV3ZXIodGhpcy5tYW5pZmVzdCwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICBjdXJyZW50Q2FudmFzSW5kZXhcbiAgICAgICAgKSxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGhpZ2hsaWdodHMgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlYXJjaCBnb2luZyBvblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNlYXJjaCkge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmN1cnJlbnRTZWFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFRvV2luZG93KCkge1xuICAgICg8YW55PndpbmRvdykub3BlblNlYWRyYWdvblZpZXdlciA9IHRoaXMudmlld2VyO1xuICB9XG5cbiAgc2V0dXBPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLnN2Z092ZXJsYXkgPSB0aGlzLnZpZXdlci5zdmdPdmVybGF5KCk7XG4gICAgdGhpcy5zdmdOb2RlID0gZDMuc2VsZWN0KHRoaXMuc3ZnT3ZlcmxheS5ub2RlKCkpO1xuICB9XG5cbiAgZGlzYWJsZUtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IG51bGw7XG4gIH1cblxuICByZXNldEtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IHRoaXMuZGVmYXVsdEtleURvd25IYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBsYXlvdXRTd2l0Y2ggdHJ1ZSBpZiBzd2l0Y2hpbmcgYmV0d2VlbiBsYXlvdXRzXG4gICAqIHRvIGtlZXAgY3VycmVudCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uXG4gICAqL1xuICBkZXN0cm95KGxheW91dFN3aXRjaD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9zZElzUmVhZHkubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQobnVsbCk7XG4gICAgaWYgKHRoaXMudmlld2VyICE9IG51bGwgJiYgdGhpcy52aWV3ZXIuaXNPcGVuKCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdlci5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpLnN0eWxlKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmlld2VyLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMudmlld2VyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMub3ZlcmxheXMgPSBudWxsO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5yZXNldCgpO1xuICAgIGlmICh0aGlzLmNhbnZhc0dyb3VwTWFzaykge1xuICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2suZGVzdHJveSgpO1xuICAgIH1cbiAgICAvLyBLZWVwIHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb24gb25seSBpZiBsYXlvdXQtc3dpdGNoXG4gICAgaWYgKCFsYXlvdXRTd2l0Y2gpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtY2xpY2snLCB0aGlzLmNsaWNrU2VydmljZS5jbGljayk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcihcbiAgICAgICdjYW52YXMtZG91YmxlLWNsaWNrJyxcbiAgICAgIChlOiBhbnkpID0+IChlLnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1wcmVzcycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXJlbGVhc2UnLCAoKSA9PlxuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dChmYWxzZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1zY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMucGluY2hIYW5kbGVyKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgKGU6IGFueSkgPT4gdGhpcy5kcmFnSGFuZGxlcihlKSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgKGU6IGFueSkgPT5cbiAgICAgIHRoaXMuc3dpcGVUb0NhbnZhc0dyb3VwKGUpXG4gICAgKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbicsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgem9vbUluKHpvb21GYWN0b3I/OiBudW1iZXIsIHBvc2l0aW9uPzogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgem9vbU91dCh6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gIH1cblxuICByb3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoKHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKSArIDkwKSAlIDM2MCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZvciBtb2RlLWNoYW5nZVxuICAgKiBAcGFyYW0gbW9kZSBWaWV3ZXJNb2RlXG4gICAqL1xuICBtb2RlQ2hhbmdlZChtb2RlOiBNb2RlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvRGFzaGJvYXJkKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlVG9QYWdlKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzZXRLZXlEb3duSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBEQVNIQk9BUkQtbW9kZSwgcmVwb3NpdGlvbnMgY2FudmFzIGdyb3VwIGFuZCByZW1vdmVzIG1heC13aWR0aCBvbiB2aWV3ZXJcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9EYXNoYm9hcmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmhpZGUoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5EQVNIQk9BUkQpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIFBBR0UtbW9kZSwgY2VudGVycyBjdXJyZW50IGNhbnZhcyBncm91cCBhbmQgcmVwb3NpdGlvbnMgb3RoZXIgY2FudmFzIGdyb3Vwc1xuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLnNob3coKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5QQUdFKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwtaGFuZGxlclxuICAgKi9cbiAgc2Nyb2xsSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IE1hdGgucG93KFZpZXdlck9wdGlvbnMuem9vbS56b29tRmFjdG9yLCBldmVudC5zY3JvbGwpO1xuICAgIC8vIFNjcm9sbGluZyB1cFxuICAgIGlmIChldmVudC5zY3JvbGwgPiAwKSB7XG4gICAgICB0aGlzLnpvb21Jbkdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgICAgLy8gU2Nyb2xsaW5nIGRvd25cbiAgICB9IGVsc2UgaWYgKGV2ZW50LnNjcm9sbCA8IDApIHtcbiAgICAgIHRoaXMuem9vbU91dEdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUGluY2gtaGFuZGxlclxuICAgKi9cbiAgcGluY2hIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICB0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IGV2ZW50LmRpc3RhbmNlIC8gZXZlbnQubGFzdERpc3RhbmNlO1xuICAgIC8vIFBpbmNoIE91dFxuICAgIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlID5cbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGRcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbUluUGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFBpbmNoIEluXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZCA8XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2VcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbU91dFBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnQgdG8gem9vbSB0by4gSWYgbm90IHNldCwgdGhlIHZpZXdlciB3aWxsIHpvb20gdG8gY2VudGVyXG4gICAqL1xuICB6b29tSW5HZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgem9vbU91dEdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBpbiBwaW5jaCBnZXN0dXJlIChwaW5jaCBvdXQpXG4gICAqXG4gICAqIFRvZ2dsZSB0byBwYWdlIG1vZGUgYW5kIFpvb20gaW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbUluUGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbUluKHpvb21GYWN0b3IsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gfHwgZXZlbnQuY2VudGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIG91dCBwaW5jaCBnZXN0dXJlIChwaW5jaCBpbilcbiAgICpcbiAgICogWm9vbSBvdXQgYW5kIHRvZ2dsZSB0byBkYXNoYm9hcmQgd2hlbiBhbGwgem9vbWVkIG91dC5cbiAgICogU3RvcCBiZXR3ZWVuIHpvb21pbmcgb3V0IGFuZCB0b2dnbGluZyB0byBkYXNoYm9hcmQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZ2VzdHVyZUlkID0gZXZlbnQuZ2VzdHVyZVBvaW50c1swXS5pZDtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSB0cnVlO1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBldmVudC5jZW50ZXIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCB8fFxuICAgICAgICBnZXN0dXJlSWQgPT09IHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgKyAyXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCA9IGdlc3R1cmVJZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2luZ2xlLWNsaWNrLWhhbmRsZXJcbiAgICogU2luZ2xlLWNsaWNrIHRvZ2dsZXMgYmV0d2VlbiBwYWdlL2Rhc2hib2FyZC1tb2RlIGlmIGEgcGFnZSBpcyBoaXRcbiAgICovXG4gIHNpbmdsZUNsaWNrSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gICAgY29uc3QgdGlsZUluZGV4ID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudCh0YXJnZXQpO1xuICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgIHRpbGVJbmRleFxuICAgICk7XG4gICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXgpIHtcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH1cbiAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogRG91YmxlLWNsaWNrLWhhbmRsZXJcbiAgICogRG91YmxlLWNsaWNrIGRhc2hib2FyZC1tb2RlIHNob3VsZCBnbyB0byBwYWdlLW1vZGVcbiAgICogRG91YmxlLWNsaWNrIHBhZ2UtbW9kZSBzaG91bGRcbiAgICogICAgYSkgWm9vbSBpbiBpZiBwYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBvclxuICAgKiAgICBiKSBGaXQgdmVydGljYWxseSBpZiBwYWdlIGlzIGFscmVhZHkgem9vbWVkIGluXG4gICAqL1xuICBkYmxDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICAgIC8vIFBhZ2UgaXMgZml0dGVkIHZlcnRpY2FsbHksIHNvIGRibC1jbGljayB6b29tcyBpblxuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbihcbiAgICAgICAgVmlld2VyT3B0aW9ucy56b29tLmRibENsaWNrWm9vbUZhY3RvcixcbiAgICAgICAgZXZlbnQucG9zaXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICAgIGNvbnN0IGNhbnZhc0luZGV4OiBudW1iZXIgPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldCk7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIGNhbnZhc0luZGV4XG4gICAgICApO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaGl0IGVsZW1lbnQgaXMgYSA8cmVjdD4tZWxlbWVudFxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBpc0NhbnZhc0dyb3VwSGl0KHRhcmdldDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgU1ZHUmVjdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGlsZXNvdXJjZXMgYW5kIGFkZHMgdGhlbSB0byB2aWV3ZXJcbiAgICogQ3JlYXRlcyBzdmcgY2xpY2thYmxlIG92ZXJsYXlzIGZvciBlYWNoIHRpbGVcbiAgICovXG4gIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICBjb25zdCBjYW52YXNSZWN0czogUmVjdFtdID0gW107XG4gICAgY29uc3QgY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5ID0gQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkuY3JlYXRlKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCxcbiAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgKTtcblxuICAgIGNvbnN0IGlzVHdvUGFnZVZpZXc6IGJvb2xlYW4gPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGxldCBncm91cDogYW55ID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcblxuICAgIHRoaXMudGlsZVNvdXJjZXMuZm9yRWFjaCgodGlsZSwgaSkgPT4ge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kuY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGksXG4gICAgICAgICAgY2FudmFzU291cmNlOiB0aWxlLFxuICAgICAgICAgIHByZXZpb3VzQ2FudmFzR3JvdXBQb3NpdGlvbjogY2FudmFzUmVjdHNbaSAtIDFdLFxuICAgICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAgcm90YXRpb25cbiAgICAgICk7XG5cbiAgICAgIGNhbnZhc1JlY3RzLnB1c2gocG9zaXRpb24pO1xuXG4gICAgICBjb25zdCB0aWxlU291cmNlU3RyYXRlZ3kgPSBUaWxlU291cmNlU3RyYXRlZ3lGYWN0b3J5LmNyZWF0ZSh0aWxlKTtcbiAgICAgIGNvbnN0IHRpbGVTb3VyY2UgPSB0aWxlU291cmNlU3RyYXRlZ3kuZ2V0VGlsZVNvdXJjZSh0aWxlKTtcblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3Qgcm90YXRlZCA9IHJvdGF0aW9uID09PSA5MCB8fCByb3RhdGlvbiA9PT0gMjcwO1xuXG4gICAgICAgIGxldCBib3VuZHM7XG5cbiAgICAgICAgLyogQmVjYXVzZSBpbWFnZSBzY2FsaW5nIGlzIHBlcmZvcm1lZCBiZWZvcmUgcm90YXRpb24sXG4gICAgICAgICAqIHdlIG11c3QgaW52ZXJ0IHdpZHRoICYgaGVpZ2h0IGFuZCB0cmFuc2xhdGUgcG9zaXRpb24gc28gdGhhdCB0aWxlIHJvdGF0aW9uIGVuZHMgdXAgY29ycmVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHJvdGF0ZWQpIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCArIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24ueSAtIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGhcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld2VyLmFkZFRpbGVkSW1hZ2Uoe1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHRpbGVTb3VyY2U6IHRpbGVTb3VyY2UsXG4gICAgICAgICAgZml0Qm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgZGVncmVlczogcm90YXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3ICYmIGkgJSAyICE9PSAwKSB7XG4gICAgICAgIGdyb3VwID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXkgPSBncm91cFxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBwb3NpdGlvbi54KVxuICAgICAgICAuYXR0cigneScsIHBvc2l0aW9uLnkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHBvc2l0aW9uLndpZHRoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgcG9zaXRpb24uaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGlsZScpO1xuXG4gICAgICAvLyBNYWtlIGN1c3RvbSBib3JkZXJzIGlmIGN1cnJlbnQgbGF5b3V0IGlzIHR3by1wYWdlZFxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcpIHtcbiAgICAgICAgaWYgKGkgJSAyID09PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub0xlZnRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KSArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICogMjtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vTGVmdFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpICUgMiAhPT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9SaWdodFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0ICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub1JpZ2h0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5Tm9kZTogU1ZHUmVjdEVsZW1lbnQgPSBjdXJyZW50T3ZlcmxheS5ub2RlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlzW2ldID0gY3VycmVudE92ZXJsYXlOb2RlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGF5b3V0ID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSB8fFxuICAgICAgIXRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgICAgID8gVmlld2VyTGF5b3V0Lk9ORV9QQUdFXG4gICAgICAgIDogVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5hZGRBbGwoY2FudmFzUmVjdHMsIGxheW91dCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2aWV3ZXIgc2l6ZSBhbmQgb3BhY2l0eSBvbmNlIHRoZSBmaXJzdCBjYW52YXMgZ3JvdXAgaGFzIGZ1bGx5IGxvYWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTogdm9pZCB7XG4gICAgdGhpcy5ob21lKCk7XG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaW5pdGlhbGlzZShcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCksXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgIT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgKTtcbiAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgJzEnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG92ZXJsYXktaW5kZXggZm9yIGNsaWNrLWV2ZW50IGlmIGhpdFxuICAgKiBAcGFyYW0gdGFyZ2V0IGhpdCA8cmVjdD5cbiAgICovXG4gIGdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNHcm91cEhpdCh0YXJnZXQpKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cDogbnVtYmVyID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXAgPj0gMCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdGVkQ2FudmFzR3JvdXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9ucygpOiBPcHRpb25zIHtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IE9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmFqYXhXaXRoQ3JlZGVudGlhbHMgPSB0aGlzLmNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgb3B0aW9ucy5sb2FkVGlsZXNXaXRoQWpheCA9IHRoaXMuY29uZmlnLmxvYWRUaWxlc1dpdGhBamF4O1xuICAgIG9wdGlvbnMuY3Jvc3NPcmlnaW5Qb2xpY3kgPSB0aGlzLmNvbmZpZy5jcm9zc09yaWdpblBvbGljeTtcbiAgICBvcHRpb25zLmFqYXhIZWFkZXJzID0gdGhpcy5jb25maWcuYWpheEhlYWRlcnM7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICBjZW50ZXJcbiAgICAgICk7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIGNvbnN0IGRyYWdFbmRQb3Npc2lvbjogUG9pbnQgPSBlLnBvc2l0aW9uO1xuICAgICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICAgIGNvbnN0IHZwQm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuICAgICAgY29uc3QgcGFubmVkUGFzdENhbnZhc0dyb3VwOiBTaWRlID0gU3dpcGVVdGlscy5nZXRTaWRlSWZQYW5uaW5nUGFzdEVuZE9mQ2FudmFzR3JvdXAoXG4gICAgICAgIGNhbnZhc0dyb3VwUmVjdCxcbiAgICAgICAgdnBCb3VuZHNcbiAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb246IG51bWJlciA9IGUuZGlyZWN0aW9uO1xuICAgICAgaWYgKFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLkxFRlQgJiZcbiAgICAgICAgICBTd2lwZVV0aWxzLmlzRGlyZWN0aW9uSW5SaWdodFNlbWljaXJjbGUoZGlyZWN0aW9uKSkgfHxcbiAgICAgICAgKHBhbm5lZFBhc3RDYW52YXNHcm91cCA9PT0gU2lkZS5SSUdIVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JbkxlZnRTZW1pY2lyY2xlKGRpcmVjdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy52aWV3ZXIucGFuSG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIHN3aXBlVG9DYW52YXNHcm91cChlOiBhbnkpIHtcbiAgICAvLyBEb24ndCBzd2lwZSBvbiBwaW5jaCBhY3Rpb25zXG4gICAgaWYgKHRoaXMucGluY2hTdGF0dXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlZWQ6IG51bWJlciA9IGUuc3BlZWQ7XG4gICAgY29uc3QgZHJhZ0VuZFBvc2lzaW9uID0gZS5wb3NpdGlvbjtcblxuICAgIGNvbnN0IGlzQ2FudmFzR3JvdXBab29tZWQgPVxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEO1xuXG4gICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbjogRGlyZWN0aW9uID0gU3dpcGVVdGlscy5nZXRTd2lwZURpcmVjdGlvbihcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24sXG4gICAgICBkcmFnRW5kUG9zaXNpb24sXG4gICAgICBpc0NhbnZhc0dyb3VwWm9vbWVkXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIgPSB0aGlzLmNhbnZhc1NlcnZpY2VcbiAgICAgIC5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgICBjb25zdCBjYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneSA9IENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkuY3JlYXRlKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlXG4gICAgKTtcblxuICAgIGxldCBwYW5uZWRQYXN0U2lkZTogU2lkZSwgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQ6IGJvb2xlYW47XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgcGFubmVkUGFzdFNpZGUgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2aWV3cG9ydEJvdW5kc1xuICAgICAgKTtcbiAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5hZGRIaXQocGFubmVkUGFzdFNpZGUsIGRpcmVjdGlvbik7XG4gICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5oaXRDb3VudFJlYWNoZWQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdDYW52YXNHcm91cEluZGV4ID0gY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kuY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwKFxuICAgICAge1xuICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBDZW50ZXI6IHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKCksXG4gICAgICAgIHNwZWVkOiBzcGVlZCxcbiAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQ6IGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkLFxuICAgICAgICB2aWV3aW5nRGlyZWN0aW9uOiB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24sXG4gICAgICB9XG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgKGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkICYmIGRpcmVjdGlvbilcbiAgICApIHtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDogbmV3Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld3BvcnRCb3VuZHMoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRCb3VuZHMoKTtcbiAgfVxufVxuIl19
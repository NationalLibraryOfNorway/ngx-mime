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
import { DefaultGoToCanvasGroupStrategy } from './go-to-canvas-group-strategy';
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
            const target = event.originalEvent.target;
            const tileIndex = this.getOverlayIndexFromClickEvent(target);
            const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
            if (requestedCanvasGroupIndex) {
                this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
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
            immediately: immediately
        });
    }
    goToCanvas(canvasIndex, immediately) {
        const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: canvasGroupIndex,
            immediately: immediately
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
            if (state) {
                this.initialCanvasGroupLoaded();
                this.currentCenter.next(this.viewer.viewport.getCenter(true));
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
                immediately: false
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
            this.currentCenter.next(this.viewer.viewport.getCenter(true));
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
            this.currentCenter.next(this.viewer.viewport.getCenter(true));
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
            immediately: false
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
            immediately: false
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
                viewingDirection: this.manifest.viewingDirection
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
                    degrees: rotation
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
            viewingDirection: this.manifest.viewingDirection
        });
        if (this.modeService.mode === ViewerMode.DASHBOARD ||
            this.modeService.mode === ViewerMode.PAGE ||
            (canvasGroupEndHitCountReached && direction)) {
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: newCanvasGroupIndex,
                immediately: false,
                direction: direction
            });
        }
    }
    getViewportBounds() {
        return this.viewer.viewport.getBounds();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFFUixPQUFPLEVBQ1IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUN2SCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUs3RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFD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LENBQUM7SUFDMUMsQ0FBQzs7O1lBdDJCRixVQUFVOzs7WUE1Q1UsTUFBTTtZQVlsQixZQUFZO1lBRFosYUFBYTtZQUZiLFdBQVc7WUFrQlgsbUJBQW1CO1lBYm5CLHdCQUF3QjtZQVl4QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGludGVydmFsLFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0XG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNhbXBsZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9jYW52YXMtZ3JvdXAtcG9zaXRpb24vY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9jbGljay1zZXJ2aWNlL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnT3ZlcmxheSB9IGZyb20gJy4uL2V4dC9zdmctb3ZlcmxheSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy9kaXJlY3Rpb24nO1xuaW1wb3J0IHsgTWFuaWZlc3QsIFNlcnZpY2UgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgTW9kZUNoYW5nZXMgfSBmcm9tICcuLi9tb2RlbHMvbW9kZUNoYW5nZXMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vcHRpb25zJztcbmltcG9ydCB7IFBpbmNoU3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3BpbmNoU3RhdHVzJztcbmltcG9ydCB7IFNpZGUgfSBmcm9tICcuLi9tb2RlbHMvc2lkZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1tb2RlJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vLi4vbW9kZWxzL3BvaW50JztcbmltcG9ydCB7IFJlY3QgfSBmcm9tICcuLy4uL21vZGVscy9yZWN0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwRmFjdG9yeSB9IGZyb20gJy4vY2FsY3VsYXRlLW5leHQtY2FudmFzLWdyb3VwLWZhY3RvcnknO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBNYXNrIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtbWFzayc7XG5pbXBvcnQge1xuICBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG4gIEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5XG59IGZyb20gJy4vZ28tdG8tY2FudmFzLWdyb3VwLXN0cmF0ZWd5JztcbmltcG9ydCB7IFN3aXBlRHJhZ0VuZENvdW50ZXIgfSBmcm9tICcuL3N3aXBlLWRyYWctZW5kLWNvdW50ZXInO1xuaW1wb3J0IHsgU3dpcGVVdGlscyB9IGZyb20gJy4vc3dpcGUtdXRpbHMnO1xuaW1wb3J0IHsgVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vdGlsZS1zb3VyY2Utc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBEZWZhdWx0Wm9vbVN0cmF0ZWd5LCBab29tU3RyYXRlZ3kgfSBmcm9tICcuL3pvb20tc3RyYXRlZ3knO1xuXG5kZWNsYXJlIGNvbnN0IE9wZW5TZWFkcmFnb246IGFueTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI6IGFueTtcbiAgcHJpdmF0ZSBzdmdPdmVybGF5OiBhbnk7XG4gIHByaXZhdGUgc3ZnTm9kZTogYW55O1xuICBwcml2YXRlIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZztcblxuICBwcml2YXRlIG92ZXJsYXlzOiBBcnJheTxTVkdSZWN0RWxlbWVudD47XG4gIHByaXZhdGUgdGlsZVNvdXJjZXM6IEFycmF5PFNlcnZpY2U+O1xuICBwcml2YXRlIGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHVibGljIGlzQ2FudmFzUHJlc3NlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgZmFsc2VcbiAgKTtcblxuICBwcml2YXRlIGN1cnJlbnRDZW50ZXI6IFN1YmplY3Q8UG9pbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50Q2FudmFzSW5kZXg6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgcHJpdmF0ZSBjdXJyZW50SGl0OiBCZWhhdmlvclN1YmplY3Q8SGl0PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgb3NkSXNSZWFkeTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrOiBDYW52YXNHcm91cE1hc2s7XG4gIHByaXZhdGUgcGluY2hTdGF0dXMgPSBuZXcgUGluY2hTdGF0dXMoKTtcbiAgcHJpdmF0ZSBkcmFnU3RhcnRQb3NpdGlvbjogYW55O1xuICBwcml2YXRlIG1hbmlmZXN0OiBNYW5pZmVzdDtcbiAgcHJpdmF0ZSBpc01hbmlmZXN0UGFnZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgZGVmYXVsdEtleURvd25IYW5kbGVyOiBhbnk7XG5cbiAgcHVibGljIGN1cnJlbnRTZWFyY2g6IFNlYXJjaFJlc3VsdDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3k6IFpvb21TdHJhdGVneTtcbiAgcHJpdmF0ZSBnb1RvQ2FudmFzR3JvdXBTdHJhdGVneTogR29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3k7XG5cbiAgcHJpdmF0ZSByb3RhdGlvbjogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldCBvblJvdGF0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRpb24uYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNlbnRlckNoYW5nZSgpOiBPYnNlcnZhYmxlPFBvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENlbnRlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkhpdENoYW5nZSgpOiBPYnNlcnZhYmxlPEhpdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRIaXQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk9zZFJlYWR5Q2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm9zZElzUmVhZHkuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaWV3ZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGlsZXNvdXJjZXMoKTogU2VydmljZVtdIHtcbiAgICByZXR1cm4gdGhpcy50aWxlU291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdmVybGF5cygpOiBTVkdSZWN0RWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cztcbiAgfVxuXG4gIHB1YmxpYyBnZXRab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5ab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1pblpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1heFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBob21lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbSh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUpO1xuXG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5jZW50ZXJDdXJyZW50Q2FudmFzKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub05leHRDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9OZXh0Q2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzR3JvdXAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyLCBpbW1lZGlhdGVseTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHlcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzKGNhbnZhc0luZGV4OiBudW1iZXIsIGltbWVkaWF0ZWx5OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgY2FudmFzSW5kZXhcbiAgICApO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHlcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoaWdobGlnaHQoc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFySGlnaHRsaWdodCgpO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgaWYgKHNlYXJjaFJlc3VsdC5xKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNlYXJjaFJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG5cbiAgICAgIGZvciAoY29uc3QgaGl0IG9mIHNlYXJjaFJlc3VsdC5oaXRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVjdCBvZiBoaXQucmVjdHMpIHtcbiAgICAgICAgICBjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc1JlY3QoaGl0LmluZGV4KTtcbiAgICAgICAgICBpZiAoY2FudmFzUmVjdCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGxldCB4ID0gY2FudmFzUmVjdC54O1xuICAgICAgICAgICAgbGV0IHkgPSBjYW52YXNSZWN0Lnk7XG5cbiAgICAgICAgICAgIC8qIGhpdCByZWN0IGFyZSByZWxhdGl2ZSB0byBlYWNoIHVucm90YXRlZCBwYWdlIGNhbnZhc1JlY3Qgc28geCx5IG11c3QgYmUgYWRqdXN0ZWQgYnkgdGhlIHJlbWFpbmluZyBzcGFjZSAqL1xuICAgICAgICAgICAgc3dpdGNoIChyb3RhdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSA5MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSByZWN0LnkgLSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB5ICs9IHJlY3QueDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTgwOlxuICAgICAgICAgICAgICAgIHggKz0gY2FudmFzUmVjdC53aWR0aCAtIChyZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgICAgICB4ICs9IHJlY3QueTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gcmVjdC54IC0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T3ZlcmxheTogU1ZHUmVjdEVsZW1lbnQgPSB0aGlzLnN2Z05vZGVcbiAgICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgIC5hdHRyKCdtaW1lSGl0SW5kZXgnLCBoaXQuaWQpXG4gICAgICAgICAgICAgIC5hdHRyKCd4JywgeClcbiAgICAgICAgICAgICAgLmF0dHIoJ3knLCB5KVxuICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlnaGxpZ2h0Q3VycmVudEhpdChoaXQ6IEhpdCkge1xuICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoYGcgPiByZWN0LnNlbGVjdGVkYCkuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgdGhpcy5zdmdOb2RlXG4gICAgICAuc2VsZWN0QWxsKGBnID4gcmVjdFttaW1lSGl0SW5kZXg9JyR7aGl0LmlkfSddYClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQgc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpZ2h0bGlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ZnTm9kZSkge1xuICAgICAgdGhpcy5zdmdOb2RlLnNlbGVjdEFsbCgnLmhpdCcpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRVcFZpZXdlcihtYW5pZmVzdDogTWFuaWZlc3QsIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC50aWxlU291cmNlKSB7XG4gICAgICB0aGlzLnRpbGVTb3VyY2VzID0gbWFuaWZlc3QudGlsZVNvdXJjZTtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWQgPSBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZCh0aGlzLm1hbmlmZXN0KTtcbiAgICAgICAgdGhpcy52aWV3ZXIgPSBuZXcgT3BlblNlYWRyYWdvbi5WaWV3ZXIoXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXRPcHRpb25zKCkpXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVN2Z092ZXJsYXkoKTtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdFpvb21TdHJhdGVneShcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UsXG4gICAgICAgICAgdGhpcy5tb2RlU2VydmljZSxcbiAgICAgICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneSA9IG5ldyBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3ksXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy5jb25maWcsXG4gICAgICAgICAgdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICBUaGlzIGRpc2FibGVzIGtleWJvYXJkIG5hdmlnYXRpb24gaW4gb3BlbnNlYWRyYWdvbi5cbiAgICAgICAgICBXZSB1c2UgcyBmb3Igb3BlbmluZyBzZWFyY2ggZGlhbG9nIGFuZCBPU0QgdXNlIHRoZSBzYW1lIGtleSBmb3IgcGFubmluZy5cbiAgICAgICAgICBJc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL29wZW5zZWFkcmFnb24vb3BlbnNlYWRyYWdvbi9pc3N1ZXMvNzk0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlZmF1bHRLZXlEb3duSGFuZGxlciA9IHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlcjtcbiAgICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleUhhbmRsZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2sgPSBuZXcgQ2FudmFzR3JvdXBNYXNrKFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5hZGRUb1dpbmRvdygpO1xuICAgICAgdGhpcy5zZXR1cE92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmNyZWF0ZU92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgICAgdGhpcy5hZGRTdWJzY3JpcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVTZXJ2aWNlLm9uQ2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgobW9kZTogTW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlQ2hhbmdlZChtb2RlKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMub25DZW50ZXJDaGFuZ2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSwgc2FtcGxlKGludGVydmFsKDUwMCkpKVxuICAgICAgICAuc3Vic2NyaWJlKChjZW50ZXI6IFBvaW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyKTtcbiAgICAgICAgICBpZiAoY2VudGVyICYmIGNlbnRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5vc2RJc1JlYWR5Lm5leHQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLnJlc2V0KCk7XG4gICAgICAgIGlmIChjYW52YXNHcm91cEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmNoYW5nZUNhbnZhc0dyb3VwKFxuICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5vbk9zZFJlYWR5Q2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgdGhpcy5pbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlci52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBWaWV3ZXJMYXlvdXQpID0+IHtcbiAgICAgICAgdGhpcy5sYXlvdXRQYWdlcygpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoaGl0OiBIaXQpID0+IHtcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEhpdChoaXQpO1xuICAgICAgICAgIHRoaXMuZ29Ub0NhbnZhcyhoaXQuaW5kZXgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLm9uUm90YXRpb25DaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKChyb3RhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXlvdXRQYWdlcygpIHtcbiAgICBpZiAodGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYW52YXNJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzSW5kZXg7XG4gICAgICB0aGlzLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB0aGlzLnNldFVwVmlld2VyKHRoaXMubWFuaWZlc3QsIHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDogdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgICAgY3VycmVudENhbnZhc0luZGV4XG4gICAgICAgICksXG4gICAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGhpZ2hsaWdodHMgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlYXJjaCBnb2luZyBvblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNlYXJjaCkge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmN1cnJlbnRTZWFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFRvV2luZG93KCkge1xuICAgICg8YW55PndpbmRvdykub3BlblNlYWRyYWdvblZpZXdlciA9IHRoaXMudmlld2VyO1xuICB9XG5cbiAgc2V0dXBPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLnN2Z092ZXJsYXkgPSB0aGlzLnZpZXdlci5zdmdPdmVybGF5KCk7XG4gICAgdGhpcy5zdmdOb2RlID0gZDMuc2VsZWN0KHRoaXMuc3ZnT3ZlcmxheS5ub2RlKCkpO1xuICB9XG5cbiAgZGlzYWJsZUtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IG51bGw7XG4gIH1cblxuICByZXNldEtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IHRoaXMuZGVmYXVsdEtleURvd25IYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBsYXlvdXRTd2l0Y2ggdHJ1ZSBpZiBzd2l0Y2hpbmcgYmV0d2VlbiBsYXlvdXRzXG4gICAqIHRvIGtlZXAgY3VycmVudCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uXG4gICAqL1xuICBkZXN0cm95KGxheW91dFN3aXRjaD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9zZElzUmVhZHkubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQobnVsbCk7XG4gICAgaWYgKHRoaXMudmlld2VyICE9IG51bGwgJiYgdGhpcy52aWV3ZXIuaXNPcGVuKCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdlci5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpLnN0eWxlKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmlld2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMub3ZlcmxheXMgPSBudWxsO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5yZXNldCgpO1xuICAgIGlmICh0aGlzLmNhbnZhc0dyb3VwTWFzaykge1xuICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2suZGVzdHJveSgpO1xuICAgIH1cbiAgICAvLyBLZWVwIHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb24gb25seSBpZiBsYXlvdXQtc3dpdGNoXG4gICAgaWYgKCFsYXlvdXRTd2l0Y2gpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlci52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1jbGljaycsIHRoaXMuY2xpY2tTZXJ2aWNlLmNsaWNrKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKFxuICAgICAgJ2NhbnZhcy1kb3VibGUtY2xpY2snLFxuICAgICAgKGU6IGFueSkgPT4gKGUucHJldmVudERlZmF1bHRBY3Rpb24gPSB0cnVlKVxuICAgICk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXByZXNzJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5waW5jaFN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gPSBlLnBvc2l0aW9uO1xuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcmVsZWFzZScsICgpID0+XG4gICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZC5uZXh0KGZhbHNlKVxuICAgICk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXNjcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXBpbmNoJywgdGhpcy5waW5jaEhhbmRsZXIpO1xuXG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWcnLCAoZTogYW55KSA9PiB0aGlzLmRyYWdIYW5kbGVyKGUpKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZy1lbmQnLCAoZTogYW55KSA9PlxuICAgICAgdGhpcy5zd2lwZVRvQ2FudmFzR3JvdXAoZSlcbiAgICApO1xuXG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignYW5pbWF0aW9uJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXIudmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHpvb21Jbih6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHpvb21PdXQoem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KCh0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCkgKyA5MCkgJSAzNjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3IgbW9kZS1jaGFuZ2VcbiAgICogQHBhcmFtIG1vZGUgVmlld2VyTW9kZVxuICAgKi9cbiAgbW9kZUNoYW5nZWQobW9kZTogTW9kZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb0Rhc2hib2FyZCgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvUGFnZSgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IHRydWU7XG4gICAgICB0aGlzLnJlc2V0S2V5RG93bkhhbmRsZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gREFTSEJPQVJELW1vZGUsIHJlcG9zaXRpb25zIGNhbnZhcyBncm91cCBhbmQgcmVtb3ZlcyBtYXgtd2lkdGggb24gdmlld2VyXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmhpZGUoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5EQVNIQk9BUkQpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIFBBR0UtbW9kZSwgY2VudGVycyBjdXJyZW50IGNhbnZhcyBncm91cCBhbmQgcmVwb3NpdGlvbnMgb3RoZXIgY2FudmFzIGdyb3Vwc1xuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZVxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suc2hvdygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbShWaWV3ZXJNb2RlLlBBR0UpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbC1oYW5kbGVyXG4gICAqL1xuICBzY3JvbGxIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gTWF0aC5wb3coVmlld2VyT3B0aW9ucy56b29tLnpvb21GYWN0b3IsIGV2ZW50LnNjcm9sbCk7XG4gICAgLy8gU2Nyb2xsaW5nIHVwXG4gICAgaWYgKGV2ZW50LnNjcm9sbCA+IDApIHtcbiAgICAgIHRoaXMuem9vbUluR2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBTY3JvbGxpbmcgZG93blxuICAgIH0gZWxzZSBpZiAoZXZlbnQuc2Nyb2xsIDwgMCkge1xuICAgICAgdGhpcy56b29tT3V0R2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQaW5jaC1oYW5kbGVyXG4gICAqL1xuICBwaW5jaEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gdHJ1ZTtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gZXZlbnQuZGlzdGFuY2UgLyBldmVudC5sYXN0RGlzdGFuY2U7XG4gICAgLy8gUGluY2ggT3V0XG4gICAgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgPlxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZFxuICAgICkge1xuICAgICAgdGhpcy56b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgICAgLy8gUGluY2ggSW5cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkIDxcbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZVxuICAgICkge1xuICAgICAgdGhpcy56b29tT3V0UGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludCB0byB6b29tIHRvLiBJZiBub3Qgc2V0LCB0aGUgdmlld2VyIHdpbGwgem9vbSB0byBjZW50ZXJcbiAgICovXG4gIHpvb21Jbkdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21Jbih6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB6b29tT3V0R2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIGluIHBpbmNoIGdlc3R1cmUgKHBpbmNoIG91dClcbiAgICpcbiAgICogVG9nZ2xlIHRvIHBhZ2UgbW9kZSBhbmQgWm9vbSBpblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZnJvbSBwaW5jaCBnZXN0dXJlXG4gICAqL1xuICB6b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy56b29tSW4oem9vbUZhY3RvciwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiB8fCBldmVudC5jZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHpvb20gb3V0IHBpbmNoIGdlc3R1cmUgKHBpbmNoIGluKVxuICAgKlxuICAgKiBab29tIG91dCBhbmQgdG9nZ2xlIHRvIGRhc2hib2FyZCB3aGVuIGFsbCB6b29tZWQgb3V0LlxuICAgKiBTdG9wIGJldHdlZW4gem9vbWluZyBvdXQgYW5kIHRvZ2dsaW5nIHRvIGRhc2hib2FyZC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbU91dFBpbmNoR2VzdHVyZShldmVudDogYW55LCB6b29tRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBnZXN0dXJlSWQgPSBldmVudC5nZXN0dXJlUG9pbnRzWzBdLmlkO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCA9IHRydWU7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIGV2ZW50LmNlbnRlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wIHx8XG4gICAgICAgIGdlc3R1cmVJZCA9PT0gdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCArIDJcbiAgICAgICkge1xuICAgICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnByZXZpb3VzR2VzdHVyZUlkID0gZ2VzdHVyZUlkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaW5nbGUtY2xpY2staGFuZGxlclxuICAgKiBTaW5nbGUtY2xpY2sgdG9nZ2xlcyBiZXR3ZWVuIHBhZ2UvZGFzaGJvYXJkLW1vZGUgaWYgYSBwYWdlIGlzIGhpdFxuICAgKi9cbiAgc2luZ2xlQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB0aWxlSW5kZXggPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldCk7XG4gICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgdGlsZUluZGV4XG4gICAgKTtcbiAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCkge1xuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleDtcbiAgICB9XG4gICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERvdWJsZS1jbGljay1oYW5kbGVyXG4gICAqIERvdWJsZS1jbGljayBkYXNoYm9hcmQtbW9kZSBzaG91bGQgZ28gdG8gcGFnZS1tb2RlXG4gICAqIERvdWJsZS1jbGljayBwYWdlLW1vZGUgc2hvdWxkXG4gICAqICAgIGEpIFpvb20gaW4gaWYgcGFnZSBpcyBmaXR0ZWQgdmVydGljYWxseSwgb3JcbiAgICogICAgYikgRml0IHZlcnRpY2FsbHkgaWYgcGFnZSBpcyBhbHJlYWR5IHpvb21lZCBpblxuICAgKi9cbiAgZGJsQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgICAvLyBQYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBzbyBkYmwtY2xpY2sgem9vbXMgaW5cbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oXG4gICAgICAgIFZpZXdlck9wdGlvbnMuem9vbS5kYmxDbGlja1pvb21GYWN0b3IsXG4gICAgICAgIGV2ZW50LnBvc2l0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgICBjb25zdCBjYW52YXNJbmRleDogbnVtYmVyID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudCh0YXJnZXQpO1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICBjYW52YXNJbmRleFxuICAgICAgKTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBoaXQgZWxlbWVudCBpcyBhIDxyZWN0Pi1lbGVtZW50XG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIGlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBTVkdSZWN0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aWxlc291cmNlcyBhbmQgYWRkcyB0aGVtIHRvIHZpZXdlclxuICAgKiBDcmVhdGVzIHN2ZyBjbGlja2FibGUgb3ZlcmxheXMgZm9yIGVhY2ggdGlsZVxuICAgKi9cbiAgY3JlYXRlT3ZlcmxheXMoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5cyA9IFtdO1xuICAgIGNvbnN0IGNhbnZhc1JlY3RzOiBSZWN0W10gPSBbXTtcbiAgICBjb25zdCBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kgPSBDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uRmFjdG9yeS5jcmVhdGUoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0LFxuICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWRcbiAgICApO1xuXG4gICAgY29uc3QgaXNUd29QYWdlVmlldzogYm9vbGVhbiA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG4gICAgbGV0IGdyb3VwOiBhbnkgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuXG4gICAgdGhpcy50aWxlU291cmNlcy5mb3JFYWNoKCh0aWxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneS5jYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgY2FudmFzR3JvdXBJbmRleDogaSxcbiAgICAgICAgICBjYW52YXNTb3VyY2U6IHRpbGUsXG4gICAgICAgICAgcHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uOiBjYW52YXNSZWN0c1tpIC0gMV0sXG4gICAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIHJvdGF0aW9uXG4gICAgICApO1xuXG4gICAgICBjYW52YXNSZWN0cy5wdXNoKHBvc2l0aW9uKTtcblxuICAgICAgY29uc3QgdGlsZVNvdXJjZVN0cmF0ZWd5ID0gVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeS5jcmVhdGUodGlsZSk7XG4gICAgICBjb25zdCB0aWxlU291cmNlID0gdGlsZVNvdXJjZVN0cmF0ZWd5LmdldFRpbGVTb3VyY2UodGlsZSk7XG5cbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZWQgPSByb3RhdGlvbiA9PT0gOTAgfHwgcm90YXRpb24gPT09IDI3MDtcblxuICAgICAgICBsZXQgYm91bmRzO1xuXG4gICAgICAgIC8qIEJlY2F1c2UgaW1hZ2Ugc2NhbGluZyBpcyBwZXJmb3JtZWQgYmVmb3JlIHJvdGF0aW9uLFxuICAgICAgICAgKiB3ZSBtdXN0IGludmVydCB3aWR0aCAmIGhlaWdodCBhbmQgdHJhbnNsYXRlIHBvc2l0aW9uIHNvIHRoYXQgdGlsZSByb3RhdGlvbiBlbmRzIHVwIGNvcnJlY3RcbiAgICAgICAgICovXG4gICAgICAgIGlmIChyb3RhdGVkKSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLnggKyAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgLSAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodCxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCxcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdlci5hZGRUaWxlZEltYWdlKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0aWxlU291cmNlOiB0aWxlU291cmNlLFxuICAgICAgICAgIGZpdEJvdW5kczogYm91bmRzLFxuICAgICAgICAgIGRlZ3JlZXM6IHJvdGF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3ICYmIGkgJSAyICE9PSAwKSB7XG4gICAgICAgIGdyb3VwID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXkgPSBncm91cFxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBwb3NpdGlvbi54KVxuICAgICAgICAuYXR0cigneScsIHBvc2l0aW9uLnkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHBvc2l0aW9uLndpZHRoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgcG9zaXRpb24uaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGlsZScpO1xuXG4gICAgICAvLyBNYWtlIGN1c3RvbSBib3JkZXJzIGlmIGN1cnJlbnQgbGF5b3V0IGlzIHR3by1wYWdlZFxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcpIHtcbiAgICAgICAgaWYgKGkgJSAyID09PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub0xlZnRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KSArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICogMjtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vTGVmdFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpICUgMiAhPT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9SaWdodFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0ICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub1JpZ2h0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5Tm9kZTogU1ZHUmVjdEVsZW1lbnQgPSBjdXJyZW50T3ZlcmxheS5ub2RlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlzW2ldID0gY3VycmVudE92ZXJsYXlOb2RlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGF5b3V0ID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSB8fFxuICAgICAgIXRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgICAgID8gVmlld2VyTGF5b3V0Lk9ORV9QQUdFXG4gICAgICAgIDogVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5hZGRBbGwoY2FudmFzUmVjdHMsIGxheW91dCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2aWV3ZXIgc2l6ZSBhbmQgb3BhY2l0eSBvbmNlIHRoZSBmaXJzdCBjYW52YXMgZ3JvdXAgaGFzIGZ1bGx5IGxvYWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTogdm9pZCB7XG4gICAgdGhpcy5ob21lKCk7XG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaW5pdGlhbGlzZShcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCksXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgIT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgKTtcbiAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgJzEnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG92ZXJsYXktaW5kZXggZm9yIGNsaWNrLWV2ZW50IGlmIGhpdFxuICAgKiBAcGFyYW0gdGFyZ2V0IGhpdCA8cmVjdD5cbiAgICovXG4gIGdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KHRhcmdldDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNHcm91cEhpdCh0YXJnZXQpKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cDogbnVtYmVyID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXAgPj0gMCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdGVkQ2FudmFzR3JvdXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9ucygpOiBPcHRpb25zIHtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IE9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmFqYXhXaXRoQ3JlZGVudGlhbHMgPSB0aGlzLmNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgb3B0aW9ucy5sb2FkVGlsZXNXaXRoQWpheCA9IHRoaXMuY29uZmlnLmxvYWRUaWxlc1dpdGhBamF4O1xuICAgIG9wdGlvbnMuY3Jvc3NPcmlnaW5Qb2xpY3kgPSB0aGlzLmNvbmZpZy5jcm9zc09yaWdpblBvbGljeTtcbiAgICBvcHRpb25zLmFqYXhIZWFkZXJzID0gdGhpcy5jb25maWcuYWpheEhlYWRlcnM7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICBjZW50ZXJcbiAgICAgICk7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIGNvbnN0IGRyYWdFbmRQb3Npc2lvbjogUG9pbnQgPSBlLnBvc2l0aW9uO1xuICAgICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICAgIGNvbnN0IHZwQm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuICAgICAgY29uc3QgcGFubmVkUGFzdENhbnZhc0dyb3VwOiBTaWRlID0gU3dpcGVVdGlscy5nZXRTaWRlSWZQYW5uaW5nUGFzdEVuZE9mQ2FudmFzR3JvdXAoXG4gICAgICAgIGNhbnZhc0dyb3VwUmVjdCxcbiAgICAgICAgdnBCb3VuZHNcbiAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb246IG51bWJlciA9IGUuZGlyZWN0aW9uO1xuICAgICAgaWYgKFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLkxFRlQgJiZcbiAgICAgICAgICBTd2lwZVV0aWxzLmlzRGlyZWN0aW9uSW5SaWdodFNlbWljaXJjbGUoZGlyZWN0aW9uKSkgfHxcbiAgICAgICAgKHBhbm5lZFBhc3RDYW52YXNHcm91cCA9PT0gU2lkZS5SSUdIVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JbkxlZnRTZW1pY2lyY2xlKGRpcmVjdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy52aWV3ZXIucGFuSG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIHN3aXBlVG9DYW52YXNHcm91cChlOiBhbnkpIHtcbiAgICAvLyBEb24ndCBzd2lwZSBvbiBwaW5jaCBhY3Rpb25zXG4gICAgaWYgKHRoaXMucGluY2hTdGF0dXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlZWQ6IG51bWJlciA9IGUuc3BlZWQ7XG4gICAgY29uc3QgZHJhZ0VuZFBvc2lzaW9uID0gZS5wb3NpdGlvbjtcblxuICAgIGNvbnN0IGlzQ2FudmFzR3JvdXBab29tZWQgPVxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEO1xuXG4gICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbjogRGlyZWN0aW9uID0gU3dpcGVVdGlscy5nZXRTd2lwZURpcmVjdGlvbihcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24sXG4gICAgICBkcmFnRW5kUG9zaXNpb24sXG4gICAgICBpc0NhbnZhc0dyb3VwWm9vbWVkXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIgPSB0aGlzLmNhbnZhc1NlcnZpY2VcbiAgICAgIC5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgICBjb25zdCBjYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneSA9IENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkuY3JlYXRlKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlXG4gICAgKTtcblxuICAgIGxldCBwYW5uZWRQYXN0U2lkZTogU2lkZSwgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQ6IGJvb2xlYW47XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgcGFubmVkUGFzdFNpZGUgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2aWV3cG9ydEJvdW5kc1xuICAgICAgKTtcbiAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5hZGRIaXQocGFubmVkUGFzdFNpZGUsIGRpcmVjdGlvbik7XG4gICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5oaXRDb3VudFJlYWNoZWQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdDYW52YXNHcm91cEluZGV4ID0gY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kuY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwKFxuICAgICAge1xuICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBDZW50ZXI6IHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKCksXG4gICAgICAgIHNwZWVkOiBzcGVlZCxcbiAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQ6IGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkLFxuICAgICAgICB2aWV3aW5nRGlyZWN0aW9uOiB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb25cbiAgICAgIH1cbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICAoY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgJiYgZGlyZWN0aW9uKVxuICAgICkge1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OiBuZXdDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZpZXdwb3J0Qm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlci52aWV3cG9ydC5nZXRCb3VuZHMoKTtcbiAgfVxufVxuIl19
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, interval, Subject, Subscription, } from 'rxjs';
import { distinctUntilChanged, sample } from 'rxjs/operators';
import { CalculateCanvasGroupPositionFactory } from '../canvas-group-position/calculate-canvas-group-position-factory';
import { createSvgOverlay } from '../ext/svg-overlay';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';
import { PinchStatus } from '../models/pinchStatus';
import { Side } from '../models/side';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { Rect } from './../models/rect';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { CanvasGroupMask } from './canvas-group-mask';
import { DefaultGoToCanvasGroupStrategy, } from './go-to-canvas-group-strategy';
import { OptionsFactory } from './options.factory';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';
import { SwipeUtils } from './swipe-utils';
import { TileSourceStrategyFactory } from './tile-source-strategy-factory';
import { DefaultZoomStrategy } from './zoom-strategy';
import * as i0 from "@angular/core";
import * as i1 from "../click-service/click.service";
import * as i2 from "../canvas-service/canvas-service";
import * as i3 from "../../core/mode-service/mode.service";
import * as i4 from "../viewer-layout-service/viewer-layout-service";
import * as i5 from "../iiif-content-search-service/iiif-content-search.service";
import * as i6 from "../style-service/style.service";
import * as i7 from "../alto-service/alto.service";
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
            const tileIndex = this.getOverlayIndexFromClickEvent(event);
            const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
            if (requestedCanvasGroupIndex !== -1) {
                this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
            }
            else {
                this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
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
                    this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
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
        this.iiifContentSearchService.setConfig(this.config);
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
                if (this.modeService.mode === ViewerMode.PAGE ||
                    this.modeService.mode === ViewerMode.DASHBOARD) {
                    this.zoomStrategy.goToHomeZoom();
                }
            }
        }));
        this.subscriptions.add(this.onOsdReadyChange.subscribe((state) => {
            if (state) {
                this.initialCanvasGroupLoaded();
                this.currentCenter.next(this.viewer?.viewport.getCenter(true));
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
            this.modeService.destroy();
            this.unsubscribe();
        }
    }
    addEvents() {
        this.clickService.reset();
        this.clickService.addSingleClickHandler(this.singleClickHandler);
        this.clickService.addDoubleClickHandler(this.dblClickHandler);
        this.viewer.addHandler('animation-finish', () => {
            this.currentCenter.next(this.viewer?.viewport.getCenter(true));
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
            this.currentCenter.next(this.viewer?.viewport.getCenter(true));
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
        if (!this.viewer) {
            return;
        }
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
        const calculateCanvasGroupPositionStrategy = CalculateCanvasGroupPositionFactory.create(this.viewerLayoutService.layout, this.isManifestPaged, this.config);
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
        return this.viewer?.viewport.getBounds();
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
ViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerService, deps: [{ token: i0.NgZone }, { token: i1.ClickService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.ViewerLayoutService }, { token: i5.IiifContentSearchService }, { token: i6.StyleService }, { token: i7.AltoService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.ClickService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.ViewerLayoutService }, { type: i5.IiifContentSearchService }, { type: i6.StyleService }, { type: i7.AltoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUVSLE9BQU8sRUFDUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFHdkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBSzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLekQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsOEJBQThCLEdBRS9CLE1BQU0sK0JBQStCLENB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QUM1QztZQUNBLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLG1CQUFtQjtnQkFDckMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFVO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLGNBQWM7WUFDekIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjO1lBQ3RCLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU8sS0FBSyxDQUFDLElBQXNCLEVBQUUsV0FBVyxHQUFHLEtBQUs7UUFDdkQsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ3hCO2dCQUNFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDVixFQUNELFdBQVcsQ0FDWixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7OzBHQWorQlUsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgaW50ZXJ2YWwsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2FtcGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z092ZXJsYXkgfSBmcm9tICcuLi9leHQvc3ZnLW92ZXJsYXknO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvZGlyZWN0aW9uJztcbmltcG9ydCB7IE1hbmlmZXN0LCBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBQaW5jaFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9waW5jaFN0YXR1cyc7XG5pbXBvcnQgeyBTaWRlIH0gZnJvbSAnLi4vbW9kZWxzL3NpZGUnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkgfSBmcm9tICcuL2NhbGN1bGF0ZS1uZXh0LWNhbnZhcy1ncm91cC1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc0dyb3VwTWFzayB9IGZyb20gJy4vY2FudmFzLWdyb3VwLW1hc2snO1xuaW1wb3J0IHtcbiAgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LFxuICBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbn0gZnJvbSAnLi9nby10by1jYW52YXMtZ3JvdXAtc3RyYXRlZ3knO1xuaW1wb3J0IHsgT3B0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL29wdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBTd2lwZURyYWdFbmRDb3VudGVyIH0gZnJvbSAnLi9zd2lwZS1kcmFnLWVuZC1jb3VudGVyJztcbmltcG9ydCB7IFN3aXBlVXRpbHMgfSBmcm9tICcuL3N3aXBlLXV0aWxzJztcbmltcG9ydCB7IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3RpbGUtc291cmNlLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgRGVmYXVsdFpvb21TdHJhdGVneSwgWm9vbVN0cmF0ZWd5IH0gZnJvbSAnLi96b29tLXN0cmF0ZWd5JztcblxuZGVjbGFyZSBjb25zdCBPcGVuU2VhZHJhZ29uOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI/OiBhbnk7XG4gIHByaXZhdGUgc3ZnT3ZlcmxheTogYW55O1xuICBwcml2YXRlIHN2Z05vZGU6IGFueTtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PiA9IFtdO1xuICBwcml2YXRlIHRpbGVTb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIHB1YmxpYyBpc0NhbnZhc1ByZXNzZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIGZhbHNlXG4gICk7XG5cbiAgcHJpdmF0ZSBjdXJyZW50Q2VudGVyOiBTdWJqZWN0PFBvaW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudENhbnZhc0luZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgY3VycmVudEhpdCA9IG5ldyBTdWJqZWN0PEhpdD4oKTtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgZHJhZ1N0YXR1cyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2VcbiAgKSB7fVxuXG4gIGdldCBvblJvdGF0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRpb24uYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNlbnRlckNoYW5nZSgpOiBPYnNlcnZhYmxlPFBvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENlbnRlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkhpdENoYW5nZSgpOiBPYnNlcnZhYmxlPEhpdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRIaXQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk9zZFJlYWR5Q2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm9zZElzUmVhZHkuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaWV3ZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGlsZXNvdXJjZXMoKTogUmVzb3VyY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZVNvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3ZlcmxheXMoKTogU1ZHUmVjdEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluWm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNaW5ab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNYXhab29tKCk7XG4gIH1cblxuICBwdWJsaWMgaG9tZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20odGhpcy5tb2RlU2VydmljZS5tb2RlKTtcblxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuY2VudGVyQ3VycmVudENhbnZhcygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvUHJldmlvdXNDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9OZXh0Q2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvTmV4dENhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbnZhc0dyb3VwKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiBjYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGltbWVkaWF0ZWx5LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXMoY2FudmFzSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICBjYW52YXNJbmRleFxuICAgICk7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogY2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBpbW1lZGlhdGVseSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoaWdobGlnaHQoc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFySGlnaHRsaWdodCgpO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgaWYgKHNlYXJjaFJlc3VsdC5xKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNlYXJjaFJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG5cbiAgICAgIGZvciAoY29uc3QgaGl0IG9mIHNlYXJjaFJlc3VsdC5oaXRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVjdCBvZiBoaXQucmVjdHMpIHtcbiAgICAgICAgICBjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc1JlY3QoaGl0LmluZGV4KTtcbiAgICAgICAgICBpZiAoY2FudmFzUmVjdCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGxldCB4ID0gY2FudmFzUmVjdC54O1xuICAgICAgICAgICAgbGV0IHkgPSBjYW52YXNSZWN0Lnk7XG5cbiAgICAgICAgICAgIC8qIGhpdCByZWN0IGFyZSByZWxhdGl2ZSB0byBlYWNoIHVucm90YXRlZCBwYWdlIGNhbnZhc1JlY3Qgc28geCx5IG11c3QgYmUgYWRqdXN0ZWQgYnkgdGhlIHJlbWFpbmluZyBzcGFjZSAqL1xuICAgICAgICAgICAgc3dpdGNoIChyb3RhdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSA5MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSByZWN0LnkgLSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB5ICs9IHJlY3QueDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTgwOlxuICAgICAgICAgICAgICAgIHggKz0gY2FudmFzUmVjdC53aWR0aCAtIChyZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgICAgICB4ICs9IHJlY3QueTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gcmVjdC54IC0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T3ZlcmxheTogU1ZHUmVjdEVsZW1lbnQgPSB0aGlzLnN2Z05vZGVcbiAgICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgIC5hdHRyKCdtaW1lSGl0SW5kZXgnLCBoaXQuaWQpXG4gICAgICAgICAgICAgIC5hdHRyKCd4JywgeClcbiAgICAgICAgICAgICAgLmF0dHIoJ3knLCB5KVxuICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlnaGxpZ2h0Q3VycmVudEhpdChoaXQ6IEhpdCkge1xuICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoYGcgPiByZWN0LnNlbGVjdGVkYCkuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgdGhpcy5zdmdOb2RlXG4gICAgICAuc2VsZWN0QWxsKGBnID4gcmVjdFttaW1lSGl0SW5kZXg9JyR7aGl0LmlkfSddYClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQgc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpZ2h0bGlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ZnTm9kZSkge1xuICAgICAgdGhpcy5zdmdOb2RlLnNlbGVjdEFsbCgnLmhpdCcpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRVcFZpZXdlcihtYW5pZmVzdDogTWFuaWZlc3QsIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgaWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LnRpbGVTb3VyY2UpIHtcbiAgICAgIHRoaXMudGlsZVNvdXJjZXMgPSBtYW5pZmVzdC50aWxlU291cmNlO1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICB0aGlzLmlzTWFuaWZlc3RQYWdlZCA9IE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKHRoaXMubWFuaWZlc3QpO1xuICAgICAgICB0aGlzLnZpZXdlciA9IG5ldyBPcGVuU2VhZHJhZ29uLlZpZXdlcihcbiAgICAgICAgICBPcHRpb25zRmFjdG9yeS5jcmVhdGUodGhpcy5jb25maWcpXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVN2Z092ZXJsYXkoKTtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdFpvb21TdHJhdGVneShcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UsXG4gICAgICAgICAgdGhpcy5tb2RlU2VydmljZSxcbiAgICAgICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneSA9IG5ldyBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3ksXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy5jb25maWcsXG4gICAgICAgICAgdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICBUaGlzIGRpc2FibGVzIGtleWJvYXJkIG5hdmlnYXRpb24gaW4gb3BlbnNlYWRyYWdvbi5cbiAgICAgICAgICBXZSB1c2UgcyBmb3Igb3BlbmluZyBzZWFyY2ggZGlhbG9nIGFuZCBPU0QgdXNlIHRoZSBzYW1lIGtleSBmb3IgcGFubmluZy5cbiAgICAgICAgICBJc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL29wZW5zZWFkcmFnb24vb3BlbnNlYWRyYWdvbi9pc3N1ZXMvNzk0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlZmF1bHRLZXlEb3duSGFuZGxlciA9IHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlcjtcbiAgICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleUhhbmRsZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2sgPSBuZXcgQ2FudmFzR3JvdXBNYXNrKFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5hZGRUb1dpbmRvdygpO1xuICAgICAgdGhpcy5zZXR1cE92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmNyZWF0ZU92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgICAgdGhpcy5hZGRTdWJzY3JpcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKG1vZGU6IE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgIHRoaXMubW9kZUNoYW5nZWQobW9kZSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgdGhpcy5vbkNlbnRlckNoYW5nZVxuICAgICAgICAgIC5waXBlKHNhbXBsZShpbnRlcnZhbCg1MDApKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChjZW50ZXI6IFBvaW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXIpO1xuICAgICAgICAgICAgaWYgKGNlbnRlciAmJiBjZW50ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5vc2RJc1JlYWR5Lm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIucmVzZXQoKTtcbiAgICAgICAgICBpZiAoY2FudmFzR3JvdXBJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmNoYW5nZUNhbnZhc0dyb3VwKFxuICAgICAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzR3JvdXBSZWN0KGNhbnZhc0dyb3VwSW5kZXgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uT3NkUmVhZHlDaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxDYW52YXNHcm91cExvYWRlZCgpO1xuICAgICAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICB0aGlzLmxheW91dFBhZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25TZWxlY3RlZC5zdWJzY3JpYmUoKGhpdDogSGl0IHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRDdXJyZW50SGl0KGhpdCk7XG4gICAgICAgICAgdGhpcy5nb1RvQ2FudmFzKGhpdC5pbmRleCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5vblJvdGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocm90YXRpb246IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmxheW91dFBhZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxheW91dFBhZ2VzKCkge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0luZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNJbmRleDtcbiAgICAgIHRoaXMuZGVzdHJveSh0cnVlKTtcbiAgICAgIHRoaXMuc2V0VXBWaWV3ZXIodGhpcy5tYW5pZmVzdCwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICBjdXJyZW50Q2FudmFzSW5kZXhcbiAgICAgICAgKSxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGhpZ2hsaWdodHMgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlYXJjaCBnb2luZyBvblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNlYXJjaCkge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmN1cnJlbnRTZWFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFRvV2luZG93KCkge1xuICAgICg8YW55PndpbmRvdykub3BlblNlYWRyYWdvblZpZXdlciA9IHRoaXMudmlld2VyO1xuICB9XG5cbiAgc2V0dXBPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLnN2Z092ZXJsYXkgPSB0aGlzLnZpZXdlci5zdmdPdmVybGF5KCk7XG4gICAgdGhpcy5zdmdOb2RlID0gZDMuc2VsZWN0KHRoaXMuc3ZnT3ZlcmxheS5ub2RlKCkpO1xuICB9XG5cbiAgZGlzYWJsZUtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IG51bGw7XG4gIH1cblxuICByZXNldEtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IHRoaXMuZGVmYXVsdEtleURvd25IYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBsYXlvdXRTd2l0Y2ggdHJ1ZSBpZiBzd2l0Y2hpbmcgYmV0d2VlbiBsYXlvdXRzXG4gICAqIHRvIGtlZXAgY3VycmVudCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uXG4gICAqL1xuICBkZXN0cm95KGxheW91dFN3aXRjaD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9zZElzUmVhZHkubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodW5kZWZpbmVkKTtcbiAgICBpZiAodGhpcy52aWV3ZXIgIT0gbnVsbCAmJiB0aGlzLnZpZXdlci5pc09wZW4oKSkge1xuICAgICAgaWYgKHRoaXMudmlld2VyLmNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzLnZpZXdlci5jb250YWluZXIucGFyZW50Tm9kZSkuc3R5bGUoJ29wYWNpdHknLCAnMCcpO1xuICAgICAgfVxuICAgICAgdGhpcy52aWV3ZXIuZGVzdHJveSgpO1xuICAgICAgdGhpcy52aWV3ZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FudmFzR3JvdXBNYXNrKSB7XG4gICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8vIEtlZXAgc2VhcmNoLXN0YXRlIGFuZCByb3RhdGlvbiBvbmx5IGlmIGxheW91dC1zd2l0Y2hcbiAgICBpZiAoIWxheW91dFN3aXRjaCkge1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBudWxsO1xuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KDApO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtY2xpY2snLCB0aGlzLmNsaWNrU2VydmljZS5jbGljayk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcihcbiAgICAgICdjYW52YXMtZG91YmxlLWNsaWNrJyxcbiAgICAgIChlOiBhbnkpID0+IChlLnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1wcmVzcycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXJlbGVhc2UnLCAoKSA9PlxuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dChmYWxzZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1zY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMucGluY2hIYW5kbGVyKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5kcmFnU3RhdHVzID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhZ0hhbmRsZXIoZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgKGU6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXR1cykge1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnRDYW52YXMoKTtcbiAgICAgICAgdGhpcy5zd2lwZVRvQ2FudmFzR3JvdXAoZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYWdTdGF0dXMgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24nLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHpvb21Jbih6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHpvb21PdXQoem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KCh0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCkgKyA5MCkgJSAzNjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3IgbW9kZS1jaGFuZ2VcbiAgICogQHBhcmFtIG1vZGUgVmlld2VyTW9kZVxuICAgKi9cbiAgbW9kZUNoYW5nZWQobW9kZTogTW9kZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudmlld2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlVG9EYXNoYm9hcmQoKTtcbiAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb1BhZ2UoKTtcbiAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSB0cnVlO1xuICAgICAgdGhpcy5yZXNldEtleURvd25IYW5kbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIERBU0hCT0FSRC1tb2RlLCByZXBvc2l0aW9ucyBjYW52YXMgZ3JvdXAgYW5kIHJlbW92ZXMgbWF4LXdpZHRoIG9uIHZpZXdlclxuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb0Rhc2hib2FyZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzU2VydmljZS5pc0N1cnJlbnRDYW52YXNHcm91cFZhbGlkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaGlkZSgpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbShWaWV3ZXJNb2RlLkRBU0hCT0FSRCk7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gUEFHRS1tb2RlLCBjZW50ZXJzIGN1cnJlbnQgY2FudmFzIGdyb3VwIGFuZCByZXBvc2l0aW9ucyBvdGhlciBjYW52YXMgZ3JvdXBzXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzU2VydmljZS5pc0N1cnJlbnRDYW52YXNHcm91cFZhbGlkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suc2hvdygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbShWaWV3ZXJNb2RlLlBBR0UpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbC1oYW5kbGVyXG4gICAqL1xuICBzY3JvbGxIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gTWF0aC5wb3coVmlld2VyT3B0aW9ucy56b29tLnpvb21GYWN0b3IsIGV2ZW50LnNjcm9sbCk7XG4gICAgLy8gU2Nyb2xsaW5nIHVwXG4gICAgaWYgKGV2ZW50LnNjcm9sbCA+IDApIHtcbiAgICAgIHRoaXMuem9vbUluR2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBTY3JvbGxpbmcgZG93blxuICAgIH0gZWxzZSBpZiAoZXZlbnQuc2Nyb2xsIDwgMCkge1xuICAgICAgdGhpcy56b29tT3V0R2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQaW5jaC1oYW5kbGVyXG4gICAqL1xuICBwaW5jaEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gdHJ1ZTtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gZXZlbnQuZGlzdGFuY2UgLyBldmVudC5sYXN0RGlzdGFuY2U7XG4gICAgLy8gUGluY2ggT3V0XG4gICAgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgPlxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZFxuICAgICkge1xuICAgICAgdGhpcy56b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgICAgLy8gUGluY2ggSW5cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkIDxcbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZVxuICAgICkge1xuICAgICAgdGhpcy56b29tT3V0UGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludCB0byB6b29tIHRvLiBJZiBub3Qgc2V0LCB0aGUgdmlld2VyIHdpbGwgem9vbSB0byBjZW50ZXJcbiAgICovXG4gIHpvb21Jbkdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21Jbih6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB6b29tT3V0R2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBpbiBwaW5jaCBnZXN0dXJlIChwaW5jaCBvdXQpXG4gICAqXG4gICAqIFRvZ2dsZSB0byBwYWdlIG1vZGUgYW5kIFpvb20gaW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbUluUGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbUluKHpvb21GYWN0b3IsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gfHwgZXZlbnQuY2VudGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIG91dCBwaW5jaCBnZXN0dXJlIChwaW5jaCBpbilcbiAgICpcbiAgICogWm9vbSBvdXQgYW5kIHRvZ2dsZSB0byBkYXNoYm9hcmQgd2hlbiBhbGwgem9vbWVkIG91dC5cbiAgICogU3RvcCBiZXR3ZWVuIHpvb21pbmcgb3V0IGFuZCB0b2dnbGluZyB0byBkYXNoYm9hcmQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZ2VzdHVyZUlkID0gZXZlbnQuZ2VzdHVyZVBvaW50c1swXS5pZDtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gdHJ1ZTtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgZXZlbnQuY2VudGVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgfHxcbiAgICAgICAgZ2VzdHVyZUlkID09PSB0aGlzLnBpbmNoU3RhdHVzLnByZXZpb3VzR2VzdHVyZUlkICsgMlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgPSBnZXN0dXJlSWQ7XG4gICAgfVxuICB9XG5cbiAgZ29Ub0hvbWVab29tKCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbmdsZS1jbGljay1oYW5kbGVyXG4gICAqIFNpbmdsZS1jbGljayB0b2dnbGVzIGJldHdlZW4gcGFnZS9kYXNoYm9hcmQtbW9kZSBpZiBhIHBhZ2UgaXMgaGl0XG4gICAqL1xuICBzaW5nbGVDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRpbGVJbmRleCA9IHRoaXMuZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgIHRpbGVJbmRleFxuICAgICk7XG4gICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9XG4gICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERvdWJsZS1jbGljay1oYW5kbGVyXG4gICAqIERvdWJsZS1jbGljayBkYXNoYm9hcmQtbW9kZSBzaG91bGQgZ28gdG8gcGFnZS1tb2RlXG4gICAqIERvdWJsZS1jbGljayBwYWdlLW1vZGUgc2hvdWxkXG4gICAqICAgIGEpIFpvb20gaW4gaWYgcGFnZSBpcyBmaXR0ZWQgdmVydGljYWxseSwgb3JcbiAgICogICAgYikgRml0IHZlcnRpY2FsbHkgaWYgcGFnZSBpcyBhbHJlYWR5IHpvb21lZCBpblxuICAgKi9cbiAgZGJsQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAvLyBQYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBzbyBkYmwtY2xpY2sgem9vbXMgaW5cbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oXG4gICAgICAgIFZpZXdlck9wdGlvbnMuem9vbS5kYmxDbGlja1pvb21GYWN0b3IsXG4gICAgICAgIGV2ZW50LnBvc2l0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgICBjb25zdCBjYW52YXNJbmRleDogbnVtYmVyID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudChldmVudCk7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIGNhbnZhc0luZGV4XG4gICAgICApO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaGl0IGVsZW1lbnQgaXMgYSA8cmVjdD4tZWxlbWVudFxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBpc0NhbnZhc0dyb3VwSGl0KHRhcmdldDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgU1ZHUmVjdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGlsZXNvdXJjZXMgYW5kIGFkZHMgdGhlbSB0byB2aWV3ZXJcbiAgICogQ3JlYXRlcyBzdmcgY2xpY2thYmxlIG92ZXJsYXlzIGZvciBlYWNoIHRpbGVcbiAgICovXG4gIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICBjb25zdCBjYW52YXNSZWN0czogUmVjdFtdID0gW107XG4gICAgY29uc3QgY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5ID0gQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkuY3JlYXRlKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCxcbiAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkLFxuICAgICAgdGhpcy5jb25maWdcbiAgICApO1xuXG4gICAgY29uc3QgaXNUd29QYWdlVmlldzogYm9vbGVhbiA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG4gICAgbGV0IGdyb3VwOiBhbnkgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuXG4gICAgdGhpcy50aWxlU291cmNlcy5mb3JFYWNoKCh0aWxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneS5jYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgY2FudmFzR3JvdXBJbmRleDogaSxcbiAgICAgICAgICBjYW52YXNTb3VyY2U6IHRpbGUsXG4gICAgICAgICAgcHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uOiBjYW52YXNSZWN0c1tpIC0gMV0sXG4gICAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICByb3RhdGlvblxuICAgICAgKTtcblxuICAgICAgY2FudmFzUmVjdHMucHVzaChwb3NpdGlvbik7XG5cbiAgICAgIGNvbnN0IHRpbGVTb3VyY2VTdHJhdGVneSA9IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkuY3JlYXRlKHRpbGUpO1xuICAgICAgY29uc3QgdGlsZVNvdXJjZSA9IHRpbGVTb3VyY2VTdHJhdGVneS5nZXRUaWxlU291cmNlKHRpbGUpO1xuXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3RhdGVkID0gcm90YXRpb24gPT09IDkwIHx8IHJvdGF0aW9uID09PSAyNzA7XG5cbiAgICAgICAgbGV0IGJvdW5kcztcblxuICAgICAgICAvKiBCZWNhdXNlIGltYWdlIHNjYWxpbmcgaXMgcGVyZm9ybWVkIGJlZm9yZSByb3RhdGlvbixcbiAgICAgICAgICogd2UgbXVzdCBpbnZlcnQgd2lkdGggJiBoZWlnaHQgYW5kIHRyYW5zbGF0ZSBwb3NpdGlvbiBzbyB0aGF0IHRpbGUgcm90YXRpb24gZW5kcyB1cCBjb3JyZWN0XG4gICAgICAgICAqL1xuICAgICAgICBpZiAocm90YXRlZCkge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54ICsgKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi55IC0gKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQsXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGgsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3ZXIuYWRkVGlsZWRJbWFnZSh7XG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgdGlsZVNvdXJjZTogdGlsZVNvdXJjZSxcbiAgICAgICAgICBmaXRCb3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBkZWdyZWVzOiByb3RhdGlvbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcgJiYgaSAlIDIgIT09IDApIHtcbiAgICAgICAgZ3JvdXAgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50T3ZlcmxheSA9IGdyb3VwXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cigneCcsIHBvc2l0aW9uLngpXG4gICAgICAgIC5hdHRyKCd5JywgcG9zaXRpb24ueSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgcG9zaXRpb24ud2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBwb3NpdGlvbi5oZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0aWxlJyk7XG5cbiAgICAgIC8vIE1ha2UgY3VzdG9tIGJvcmRlcnMgaWYgY3VycmVudCBsYXlvdXQgaXMgdHdvLXBhZ2VkXG4gICAgICBpZiAoaXNUd29QYWdlVmlldykge1xuICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG5vTGVmdFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIE51bWJlcihwb3NpdGlvbi53aWR0aCAqIDIgKyBwb3NpdGlvbi5oZWlnaHQpICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggKiAyO1xuICAgICAgICAgIGN1cnJlbnRPdmVybGF5LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jywgbm9MZWZ0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgJSAyICE9PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub1JpZ2h0U3Ryb2tlU3R5bGUgPVxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQgK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KTtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vUmlnaHRTdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXlOb2RlOiBTVkdSZWN0RWxlbWVudCA9IGN1cnJlbnRPdmVybGF5Lm5vZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheXNbaV0gPSBjdXJyZW50T3ZlcmxheU5vZGU7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsYXlvdXQgPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFIHx8XG4gICAgICAhdGhpcy5pc01hbmlmZXN0UGFnZWRcbiAgICAgICAgPyBWaWV3ZXJMYXlvdXQuT05FX1BBR0VcbiAgICAgICAgOiBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgdGhpcy5jYW52YXNTZXJ2aWNlLmFkZEFsbChjYW52YXNSZWN0cywgbGF5b3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHZpZXdlciBzaXplIGFuZCBvcGFjaXR5IG9uY2UgdGhlIGZpcnN0IGNhbnZhcyBncm91cCBoYXMgZnVsbHkgbG9hZGVkXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxDYW52YXNHcm91cExvYWRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvbWUoKTtcbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5pbml0aWFsaXplKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKSxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSAhPT0gVmlld2VyTW9kZS5EQVNIQk9BUkRcbiAgICApO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbihWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsICcxJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb3ZlcmxheS1pbmRleCBmb3IgY2xpY2stZXZlbnQgaWYgaGl0XG4gICAqIEBwYXJhbSB0YXJnZXQgaGl0IDxyZWN0PlxuICAgKi9cbiAgZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0KSkge1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXA6IG51bWJlciA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwID49IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RlZENhbnZhc0dyb3VwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICBjZW50ZXJcbiAgICAgICk7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgICAgY29uc3QgdnBCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2cEJvdW5kc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogbnVtYmVyID0gZS5kaXJlY3Rpb247XG4gICAgICBpZiAoXG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuTEVGVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JblJpZ2h0U2VtaWNpcmNsZShkaXJlY3Rpb24pKSB8fFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLlJJR0hUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluTGVmdFNlbWljaXJjbGUoZGlyZWN0aW9uKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhcygpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzQm91bmRzID0gdGhpcy5nZXRDdXJyZW50Q2FudmFzQm91bmRzKCk7XG4gICAgICB0aGlzLmlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KHZpZXdwb3J0Qm91bmRzLCBjdXJyZW50Q2FudmFzQm91bmRzKVxuICAgICAgICA/IHRoaXMuY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICAgICAgICAgIHZpZXdwb3J0Qm91bmRzLFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0JvdW5kc1xuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50Q2FudmFzQm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlci53b3JsZFxuICAgICAgLmdldEl0ZW1BdCh0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpXG4gICAgICAuZ2V0Qm91bmRzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMuaGVpZ2h0IDwgY2FudmFzQm91bmRzLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogdm9pZCB7XG4gICAgbGV0IHJlY3Q6IFJlY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodCAvIDIsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDYW52YXNBYm92ZVZpZXdwb3J0Qm90dG9tKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgLSB2aWV3cG9ydEJvdW5kcy5oZWlnaHQgLyAyLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucGFuVG8ocmVjdCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kczogUmVjdCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cFJlY3QoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgeTogY2FudmFzR3JvdXBSZWN0LmNlbnRlclksXG4gICAgfSk7XG4gICAgdGhpcy5wYW5UbyhyZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMueSA8IGNhbnZhc0JvdW5kcy55O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NhbnZhc0Fib3ZlVmlld3BvcnRCb3R0b20oXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgPFxuICAgICAgdmlld3BvcnRCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN3aXBlVG9DYW52YXNHcm91cChlOiBhbnkpIHtcbiAgICAvLyBEb24ndCBzd2lwZSBvbiBwaW5jaCBhY3Rpb25zXG4gICAgaWYgKHRoaXMucGluY2hTdGF0dXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlZWQ6IG51bWJlciA9IGUuc3BlZWQ7XG4gICAgY29uc3QgZHJhZ0VuZFBvc2lzaW9uID0gZS5wb3NpdGlvbjtcblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG5cbiAgICBjb25zdCBkaXJlY3Rpb246IERpcmVjdGlvbiA9IFN3aXBlVXRpbHMuZ2V0U3dpcGVEaXJlY3Rpb24oXG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uLFxuICAgICAgZHJhZ0VuZFBvc2lzaW9uLFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyID0gdGhpcy5jYW52YXNTZXJ2aWNlXG4gICAgICAuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgY29uc3QgY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kgPSBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5LmNyZWF0ZShcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZVxuICAgICk7XG5cbiAgICBsZXQgcGFubmVkUGFzdFNpZGU6IFNpZGUgfCBudWxsO1xuICAgIGxldCBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBwYW5uZWRQYXN0U2lkZSA9IFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgIHZpZXdwb3J0Qm91bmRzXG4gICAgICApO1xuICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmFkZEhpdChwYW5uZWRQYXN0U2lkZSwgZGlyZWN0aW9uKTtcbiAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkID0gdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmhpdENvdW50UmVhY2hlZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0NhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY29uc3RyYWluVG9SYW5nZShcbiAgICAgIGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5LmNhbGN1bGF0ZU5leHRDYW52YXNHcm91cCh7XG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cENlbnRlcjogdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKSxcbiAgICAgICAgc3BlZWQ6IHNwZWVkLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IGN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZDogY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQsXG4gICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgKGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkICYmIGRpcmVjdGlvbilcbiAgICApIHtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDogbmV3Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld3BvcnRCb3VuZHMoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRCb3VuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQ6IGFueSkge1xuICAgIHJldHVybiBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgPyBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgOiBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgcGFuVG8ocmVjdDogUmVjdCB8IHVuZGVmaW5lZCwgaW1tZWRpYXRlbHkgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChyZWN0KSB7XG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5wYW5UbyhcbiAgICAgICAge1xuICAgICAgICAgIHg6IHJlY3QueCxcbiAgICAgICAgICB5OiByZWN0LnksXG4gICAgICAgIH0sXG4gICAgICAgIGltbWVkaWF0ZWx5XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=
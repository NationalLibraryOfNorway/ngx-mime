import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, interval, Subject, Subscription, } from 'rxjs';
import { distinctUntilChanged, sample } from 'rxjs/operators';
import { CalculateCanvasGroupPositionFactory } from '../canvas-group-position/calculate-canvas-group-position-factory';
import { createSvgOverlay } from '../ext/svg-overlay';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';
import { RecognizedTextMode, } from '../models';
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
import * as i8 from "@angular/material/snack-bar";
import * as i9 from "../intl";
export class ViewerService {
    constructor(zone, clickService, canvasService, modeService, viewerLayoutService, iiifContentSearchService, styleService, altoService, snackBar, intl) {
        this.zone = zone;
        this.clickService = clickService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.styleService = styleService;
        this.altoService = altoService;
        this.snackBar = snackBar;
        this.intl = intl;
        this.overlays = [];
        this.tileSources = [];
        this.isCanvasPressed = new BehaviorSubject(false);
        this.currentCenter = new Subject();
        this.currentCanvasIndex = new BehaviorSubject(0);
        this.currentHit = null;
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
                        const currentHitStrokeOffset = 8;
                        let width = rect.width + currentHitStrokeOffset;
                        let height = rect.height + currentHitStrokeOffset;
                        let x = canvasRect.x - currentHitStrokeOffset / 2;
                        let y = canvasRect.y - currentHitStrokeOffset / 2;
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
                                width = rect.height + currentHitStrokeOffset;
                                height = rect.width + currentHitStrokeOffset;
                                break;
                            case 180:
                                x += canvasRect.width - (rect.x + rect.width);
                                y += canvasRect.height - (rect.y + rect.height);
                                break;
                            case 270:
                                x += rect.y;
                                y += canvasRect.height - rect.x - rect.width;
                                /* Flip height & width */
                                width = rect.height + currentHitStrokeOffset;
                                height = rect.width + currentHitStrokeOffset;
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
    highlightCurrentHit() {
        if (this.currentHit) {
            this.svgNode.selectAll(`g > rect.selected`).attr('class', 'hit');
            this.svgNode
                .selectAll(`g > rect[mimeHitIndex='${this.currentHit.id}']`)
                .attr('class', 'hit selected');
        }
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
                this.currentHit = hit;
                this.highlightCurrentHit();
                this.goToCanvas(hit.index, false);
            }
        }));
        this.subscriptions.add(this.onRotationChange.subscribe((rotation) => {
            this.layoutPages();
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            if (recognizedTextModeChanges.currentValue === RecognizedTextMode.ONLY) {
                this.hidePages();
            }
            if (recognizedTextModeChanges.previousValue === RecognizedTextMode.ONLY) {
                this.showPages();
            }
            if (recognizedTextModeChanges.previousValue ===
                RecognizedTextMode.ONLY &&
                recognizedTextModeChanges.currentValue === RecognizedTextMode.SPLIT) {
                setTimeout(() => {
                    this.home();
                }, ViewerOptions.transitions.OSDAnimationTime);
            }
        }));
    }
    hidePages() {
        this.setOpacityOnPages(0);
    }
    showPages() {
        this.setOpacityOnPages(1);
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
        this.currentCenter.next({ x: 0, y: 0 });
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
            if (this.viewer.useCanvas) {
                this.rotateToRight();
                this.highlightCurrentHit();
            }
            else {
                this.showRotationIsNotSupportetMessage();
            }
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
        const currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);
        let pannedPastSide;
        let canvasGroupEndHitCountReached = false;
        if (this.modeService.isPageZoomed()) {
            pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
            this.swipeDragEndCounter.addHit(pannedPastSide, direction);
            canvasGroupEndHitCountReached =
                this.swipeDragEndCounter.hitCountReached();
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
    rotateToRight() {
        this.rotation.next((this.rotation.getValue() + 90) % 360);
    }
    showRotationIsNotSupportetMessage() {
        this.snackBar.open(this.intl.rotationIsNotSupported, undefined, {
            duration: 3000,
        });
    }
    setOpacityOnPages(opacity) {
        if (this.viewer) {
            const itemCount = this.viewer.world.getItemCount();
            for (let i = 0; i < itemCount; i++) {
                const item = this.viewer.world.getItemAt(i);
                item.setOpacity(opacity);
            }
        }
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
ViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerService, deps: [{ token: i0.NgZone }, { token: i1.ClickService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.ViewerLayoutService }, { token: i5.IiifContentSearchService }, { token: i6.StyleService }, { token: i7.AltoService }, { token: i8.MatSnackBar }, { token: i9.MimeViewerIntl }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.ClickService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.ViewerLayoutService }, { type: i5.IiifContentSearchService }, { type: i6.StyleService }, { type: i7.AltoService }, { type: i8.MatSnackBar }, { type: i9.MimeViewerIntl }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUVSLE9BQU8sRUFDUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFHdkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRzdFLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSxXQUFXLENBQUM7QUFHbkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUt6RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEMsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDTCw4QkFBOEIsR0FFL0IsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7O0FBT3BFLE1BQU0sT0FBTyxhQUFhO0lBaUN4QixZQUNVLElBQVksRUFDWixZQUEwQixFQUMxQixhQUE0QixFQUM1QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsd0JBQWtELEVBQ2xELFlBQTBCLEVBQzFCLFdBQXdCLEVBQ3hCLFFBQXFCLEVBQ3JCLElBQW9CO1FBVHBCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQXJDdEIsYUFBUSxHQUEwQixFQUFFLENBQUM7UUFDckMsZ0JBQVcsR0FBb0IsRUFBRSxDQUFDO1FBR25DLG9CQUFlLEdBQXFCLElBQUksZUFBZSxDQUM1RCxLQUFLLENBQ04sQ0FBQztRQUVNLGtCQUFhLEdBQW1CLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUMsdUJBQWtCLEdBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2pELHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUVoRCxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFHaEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHekIsa0JBQWEsR0FBd0IsSUFBSSxDQUFDO1FBSXpDLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQXNnQjNCOztXQUVHO1FBQ0gsa0JBQWEsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pFLGVBQWU7WUFDZixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLGlCQUFpQjthQUNsQjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDakQ7UUFDSCxDQUFDLENBQUM7UUFFRjs7V0FFRztRQUNILGlCQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3ZELFlBQVk7WUFDWixJQUNFLEtBQUssQ0FBQyxRQUFRO2dCQUNkLEtBQUssQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFDMUQ7Z0JBQ0EsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDM0MsV0FBVzthQUNaO2lCQUFNLElBQ0wsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDdEQsS0FBSyxDQUFDLFlBQVksRUFDbEI7Z0JBQ0EsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3QztRQUNILENBQUMsQ0FBQztRQXNFRjs7O1dBR0c7UUFDSCx1QkFBa0IsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RCxNQUFNLHlCQUF5QixHQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUkseUJBQXlCLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7YUFDeEU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFFRjs7Ozs7O1dBTUc7UUFDSCxvQkFBZSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0IsbURBQW1EO1lBQ25ELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQ2YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLE1BQU0sV0FBVyxHQUFXLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEUsTUFBTSx5QkFBeUIsR0FDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDL0QsSUFBSSx5QkFBeUIsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7aUJBQ3hFO3FCQUFNO29CQUNMLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDekU7YUFDRjtRQUNILENBQUMsQ0FBQztRQWlLTSxnQkFBVyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQztnQkFDakQsTUFBTSxRQUFRLEdBQVMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ2hELE1BQU0scUJBQXFCLEdBQ3pCLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FDN0MsZUFBZSxFQUNmLFFBQVEsQ0FDVCxDQUFDO2dCQUNKLE1BQU0sU0FBUyxHQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLElBQ0UsQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsSUFBSTtvQkFDbEMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRCxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxLQUFLO3dCQUNuQyxVQUFVLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDLENBQUMsRUFDcEQ7b0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2lCQUNuQzthQUNGO1FBQ0gsQ0FBQyxDQUFDO0lBaDBCQyxDQUFDO0lBRUosSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksd0JBQXdCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSx1QkFBdUI7UUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHVCQUF1QixDQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVNLGVBQWUsQ0FBQyxnQkFBd0IsRUFBRSxXQUFvQjtRQUNuRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sVUFBVSxDQUFDLFdBQW1CLEVBQUUsV0FBb0I7UUFDekQsTUFBTSxnQkFBZ0IsR0FDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sU0FBUyxDQUFDLFlBQTBCO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO2FBQ25DO1lBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUxQyxLQUFLLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDNUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvRCxJQUFJLFVBQVUsRUFBRTt3QkFDZCxNQUFNLHNCQUFzQixHQUFHLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQzt3QkFDaEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxzQkFBc0IsR0FBRyxDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO3dCQUVsRCw0R0FBNEc7d0JBQzVHLFFBQVEsUUFBUSxFQUFFOzRCQUNoQixLQUFLLENBQUM7Z0NBQ0osQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1osQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1osTUFBTTs0QkFFUixLQUFLLEVBQUU7Z0NBQ0wsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dDQUM3QyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDWix5QkFBeUI7Z0NBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDO2dDQUM3QyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztnQ0FDN0MsTUFBTTs0QkFFUixLQUFLLEdBQUc7Z0NBQ04sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDOUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDaEQsTUFBTTs0QkFFUixLQUFLLEdBQUc7Z0NBQ04sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1osQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dDQUM3Qyx5QkFBeUI7Z0NBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDO2dDQUM3QyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztnQ0FDN0MsTUFBTTt5QkFDVDt3QkFFRCxNQUFNLGNBQWMsR0FBbUIsSUFBSSxDQUFDLE9BQU87NkJBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUM7NkJBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDOzZCQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs2QkFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs2QkFDWixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQzs2QkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7NkJBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ3pCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTztpQkFDVCxTQUFTLENBQUMsMEJBQTBCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBQzNELElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWtCLEVBQUUsTUFBd0I7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FDcEMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixDQUN6QyxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSw4QkFBOEIsQ0FDL0QsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQy9CLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQ3hDLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsY0FBYztpQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsU0FBUyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxNQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO1lBQ0gsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUNuRCxDQUFDLGdCQUF3QixFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLElBQUksZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FDeEQsQ0FBQztnQkFDRixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJO29CQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUM5QztvQkFDQSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNsQzthQUNGO1FBQ0gsQ0FBQyxDQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDakQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQWUsRUFBRSxFQUFFO1lBQ3JFLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsa0NBQWtDLENBQUMsU0FBUyxDQUMzRCxDQUFDLHlCQUFvRCxFQUFFLEVBQUU7WUFDdkQsSUFDRSx5QkFBeUIsQ0FBQyxZQUFZLEtBQUssa0JBQWtCLENBQUMsSUFBSSxFQUNsRTtnQkFDQSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7WUFFRCxJQUNFLHlCQUF5QixDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQyxJQUFJLEVBQ25FO2dCQUNBLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUVELElBQ0UseUJBQXlCLENBQUMsYUFBYTtnQkFDckMsa0JBQWtCLENBQUMsSUFBSTtnQkFDekIseUJBQXlCLENBQUMsWUFBWSxLQUFLLGtCQUFrQixDQUFDLEtBQUssRUFDbkU7Z0JBQ0EsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7WUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLGdCQUFnQixFQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3JFLFdBQVcsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNILE1BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxZQUFzQjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNqQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQztRQUNELHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQ3BCLHFCQUFxQixFQUNyQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQzVDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBbUIsRUFBRSxRQUFnQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFtQixFQUFFLFFBQWdCO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO2FBQzFDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLElBQWlCO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsRUFBRTtZQUNuRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCO1lBQzVELFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUI7WUFDNUQsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBcUNEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxRQUFlLEVBQUUsVUFBbUI7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDekM7YUFBTTtZQUNMLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWUsRUFBRSxVQUFtQjtRQUNqRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2pEO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWtCLENBQUMsS0FBVSxFQUFFLFVBQWtCO1FBQy9DLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQ3pDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsVUFBa0I7UUFDaEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3BELElBQ0UsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVU7Z0JBQzVCLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFDcEQ7Z0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQThDRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxNQUFtQjtRQUNsQyxPQUFPLE1BQU0sWUFBWSxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWM7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFDL0IsTUFBTSxvQ0FBb0MsR0FDeEMsbUNBQW1DLENBQUMsTUFBTSxDQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUMvQixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7UUFFSixNQUFNLGFBQWEsR0FDakIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFFBQVEsR0FDWixvQ0FBb0MsQ0FBQyw0QkFBNEIsQ0FDL0Q7Z0JBQ0UsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQjthQUNqRCxFQUNELFFBQVEsQ0FDVCxDQUFDO1lBRUosV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUzQixNQUFNLGtCQUFrQixHQUFHLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRSxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLFFBQVEsS0FBSyxFQUFFLElBQUksUUFBUSxLQUFLLEdBQUcsQ0FBQztnQkFFcEQsSUFBSSxNQUFNLENBQUM7Z0JBRVg7O21CQUVHO2dCQUNILElBQUksT0FBTyxFQUFFO29CQUNYLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQzdCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQ25ELFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQ25ELFFBQVEsQ0FBQyxNQUFNLEVBQ2YsUUFBUSxDQUFDLEtBQUssQ0FDZixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQzdCLFFBQVEsQ0FBQyxDQUFDLEVBQ1YsUUFBUSxDQUFDLENBQUMsRUFDVixRQUFRLENBQUMsS0FBSyxFQUNkLFFBQVEsQ0FBQyxNQUFNLENBQ2hCLENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLEtBQUssRUFBRSxDQUFDO29CQUNSLFVBQVUsRUFBRSxVQUFVO29CQUN0QixTQUFTLEVBQUUsTUFBTTtvQkFDakIsT0FBTyxFQUFFLFFBQVE7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxhQUFhLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQzlEO1lBRUQsTUFBTSxjQUFjLEdBQUcsS0FBSztpQkFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDZCxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFekIscURBQXFEO1lBQ3JELElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzFCLE1BQU0saUJBQWlCLEdBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO3dCQUM1QyxJQUFJO3dCQUNKLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixjQUFjLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7aUJBQzdEO3FCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDakMsTUFBTSxrQkFBa0IsR0FDdEIsUUFBUSxDQUFDLEtBQUs7d0JBQ2QsSUFBSTt3QkFDSixRQUFRLENBQUMsTUFBTTt3QkFDZixJQUFJO3dCQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9DLGNBQWMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDOUQ7YUFDRjtZQUVELE1BQU0sa0JBQWtCLEdBQW1CLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQ1YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsUUFBUTtZQUN6RCxDQUFDLElBQUksQ0FBQyxlQUFlO1lBQ25CLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUTtZQUN2QixDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssd0JBQXdCO1FBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLEVBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxTQUFTLENBQy9DLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztpQkFDeEMsVUFBVSxFQUFFO2lCQUNaLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO2lCQUNwRCxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILDZCQUE2QixDQUFDLEtBQVU7UUFDdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sb0JBQW9CLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsSUFBSSxvQkFBb0IsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sb0JBQW9CLENBQUM7YUFDN0I7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU8sMkJBQTJCLENBQUMsTUFBYTtRQUMvQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sdUJBQXVCLEdBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQXlCTyxnQkFBZ0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ25DLE1BQU0sY0FBYyxHQUFTLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FDbEMsY0FBYyxFQUNkLG1CQUFtQixDQUNwQjtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSzthQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQzthQUNyRCxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sdUJBQXVCLENBQzdCLGNBQW9CLEVBQ3BCLFlBQWtCO1FBRWxCLE9BQU8sY0FBYyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3JELENBQUM7SUFFTywrQkFBK0IsQ0FDckMsY0FBb0IsRUFDcEIsWUFBa0I7UUFFbEIsSUFBSSxJQUFJLEdBQXFCLFNBQVMsQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDL0QsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNkLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDOUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQzlDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsMkJBQTJCLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQ3pFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztnQkFDZCxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQzlDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQ3BFLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVPLDhCQUE4QixDQUFDLGNBQW9CO1FBQ3pELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQzNDLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztZQUNwQixDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUM7WUFDOUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxPQUFPO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyx3QkFBd0IsQ0FDOUIsY0FBb0IsRUFDcEIsWUFBa0I7UUFFbEIsT0FBTyxjQUFjLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLDJCQUEyQixDQUNqQyxjQUFvQixFQUNwQixZQUFrQjtRQUVsQixPQUFPLENBQ0wsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTTtZQUNwQyxjQUFjLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQ3pDLENBQUM7SUFDSixDQUFDO0lBRU8sa0JBQWtCLENBQUMsQ0FBTTtRQUMvQiwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFRCxNQUFNLEtBQUssR0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzlCLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFbkMsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqRCxNQUFNLGNBQWMsR0FBUyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV0RCxNQUFNLFNBQVMsR0FBYyxVQUFVLENBQUMsaUJBQWlCLENBQ3ZELElBQUksQ0FBQyxpQkFBaUIsRUFDdEIsZUFBZSxFQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQ2hDLENBQUM7UUFFRixNQUFNLHVCQUF1QixHQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDO1FBQzdDLE1BQU0sZ0NBQWdDLEdBQ3BDLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhFLElBQUksY0FBMkIsQ0FBQztRQUNoQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDbkMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FDOUQsZUFBZSxFQUNmLGNBQWMsQ0FDZixDQUFDO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0QsNkJBQTZCO2dCQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDOUM7UUFFRCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQzdELGdDQUFnQyxDQUFDLHdCQUF3QixDQUFDO1lBQ3hELHdCQUF3QixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7WUFDNUQsS0FBSyxFQUFFLEtBQUs7WUFDWixTQUFTLEVBQUUsU0FBUztZQUNwQix1QkFBdUIsRUFBRSx1QkFBdUI7WUFDaEQsNkJBQTZCLEVBQUUsNkJBQTZCO1lBQzVELGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCO1NBQ2pELENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUztZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSTtZQUN6QyxDQUFDLDZCQUE2QixJQUFJLFNBQVMsQ0FBQyxFQUM1QztZQUNBLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLG1CQUFtQjtnQkFDckMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFVO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLGNBQWM7WUFDekIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjO1lBQ3RCLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU8sS0FBSyxDQUFDLElBQXNCLEVBQUUsV0FBVyxHQUFHLEtBQUs7UUFDdkQsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ3hCO2dCQUNFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDVixFQUNELFdBQVcsQ0FDWixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLGlDQUFpQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFNBQVMsRUFBRTtZQUM5RCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxPQUFlO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzswR0FoaUNVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgaW50ZXJ2YWwsXG4gIE9ic2VydmFibGUsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2FtcGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z092ZXJsYXkgfSBmcm9tICcuLi9leHQvc3ZnLW92ZXJsYXknO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9pbnRsJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHtcbiAgTW9kZUNoYW5nZXMsXG4gIFJlY29nbml6ZWRUZXh0TW9kZSxcbiAgUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcyxcbn0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy9kaXJlY3Rpb24nO1xuaW1wb3J0IHsgTWFuaWZlc3QsIFJlc291cmNlIH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFBpbmNoU3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3BpbmNoU3RhdHVzJztcbmltcG9ydCB7IFNpZGUgfSBmcm9tICcuLi9tb2RlbHMvc2lkZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1tb2RlJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vLi4vbW9kZWxzL3BvaW50JztcbmltcG9ydCB7IFJlY3QgfSBmcm9tICcuLy4uL21vZGVscy9yZWN0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwRmFjdG9yeSB9IGZyb20gJy4vY2FsY3VsYXRlLW5leHQtY2FudmFzLWdyb3VwLWZhY3RvcnknO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBNYXNrIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtbWFzayc7XG5pbXBvcnQge1xuICBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG4gIEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LFxufSBmcm9tICcuL2dvLXRvLWNhbnZhcy1ncm91cC1zdHJhdGVneSc7XG5pbXBvcnQgeyBPcHRpb25zRmFjdG9yeSB9IGZyb20gJy4vb3B0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IFN3aXBlRHJhZ0VuZENvdW50ZXIgfSBmcm9tICcuL3N3aXBlLWRyYWctZW5kLWNvdW50ZXInO1xuaW1wb3J0IHsgU3dpcGVVdGlscyB9IGZyb20gJy4vc3dpcGUtdXRpbHMnO1xuaW1wb3J0IHsgVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vdGlsZS1zb3VyY2Utc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBEZWZhdWx0Wm9vbVN0cmF0ZWd5LCBab29tU3RyYXRlZ3kgfSBmcm9tICcuL3pvb20tc3RyYXRlZ3knO1xuXG5kZWNsYXJlIGNvbnN0IE9wZW5TZWFkcmFnb246IGFueTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlclNlcnZpY2Uge1xuICBwcml2YXRlIHZpZXdlcj86IGFueTtcbiAgcHJpdmF0ZSBzdmdPdmVybGF5OiBhbnk7XG4gIHByaXZhdGUgc3ZnTm9kZTogYW55O1xuICBwcml2YXRlIGNvbmZpZyE6IE1pbWVWaWV3ZXJDb25maWc7XG5cbiAgcHJpdmF0ZSBvdmVybGF5czogQXJyYXk8U1ZHUmVjdEVsZW1lbnQ+ID0gW107XG4gIHByaXZhdGUgdGlsZVNvdXJjZXM6IEFycmF5PFJlc291cmNlPiA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgcHVibGljIGlzQ2FudmFzUHJlc3NlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgZmFsc2VcbiAgKTtcblxuICBwcml2YXRlIGN1cnJlbnRDZW50ZXI6IFN1YmplY3Q8UG9pbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50Q2FudmFzSW5kZXg6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgcHJpdmF0ZSBjdXJyZW50SGl0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgZHJhZ1N0YXR1cyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSBpbnRsOiBNaW1lVmlld2VySW50bFxuICApIHt9XG5cbiAgZ2V0IG9uUm90YXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2VudGVyQ2hhbmdlKCk6IE9ic2VydmFibGU8UG9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2VudGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uT3NkUmVhZHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3NkSXNSZWFkeS5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldFZpZXdlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpZXdlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaWxlc291cmNlcygpOiBSZXNvdXJjZVtdIHtcbiAgICByZXR1cm4gdGhpcy50aWxlU291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdmVybGF5cygpOiBTVkdSZWN0RWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cztcbiAgfVxuXG4gIHB1YmxpYyBnZXRab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5ab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1pblpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1heFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBob21lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbSh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUpO1xuXG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5jZW50ZXJDdXJyZW50Q2FudmFzKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub05leHRDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9OZXh0Q2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzR3JvdXAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyLCBpbW1lZGlhdGVseTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbnZhcyhjYW52YXNJbmRleDogbnVtYmVyLCBpbW1lZGlhdGVseTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoY2FudmFzSW5kZXgpO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0KHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZ2h0bGlnaHQoKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGlmIChzZWFyY2hSZXN1bHQucSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2hSZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBzZWFyY2hSZXN1bHQuaGl0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHJlY3Qgb2YgaGl0LnJlY3RzKSB7XG4gICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNSZWN0KGhpdC5pbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc1JlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRIaXRTdHJva2VPZmZzZXQgPSA4O1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgbGV0IHggPSBjYW52YXNSZWN0LnggLSBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0IC8gMjtcbiAgICAgICAgICAgIGxldCB5ID0gY2FudmFzUmVjdC55IC0gY3VycmVudEhpdFN0cm9rZU9mZnNldCAvIDI7XG5cbiAgICAgICAgICAgIC8qIGhpdCByZWN0IGFyZSByZWxhdGl2ZSB0byBlYWNoIHVucm90YXRlZCBwYWdlIGNhbnZhc1JlY3Qgc28geCx5IG11c3QgYmUgYWRqdXN0ZWQgYnkgdGhlIHJlbWFpbmluZyBzcGFjZSAqL1xuICAgICAgICAgICAgc3dpdGNoIChyb3RhdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSA5MDpcbiAgICAgICAgICAgICAgICB4ICs9IGNhbnZhc1JlY3Qud2lkdGggLSByZWN0LnkgLSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB5ICs9IHJlY3QueDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAxODA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gKHJlY3QueCArIHJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgICAgIHkgKz0gY2FudmFzUmVjdC5oZWlnaHQgLSAocmVjdC55ICsgcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjcwOlxuICAgICAgICAgICAgICAgIHggKz0gcmVjdC55O1xuICAgICAgICAgICAgICAgIHkgKz0gY2FudmFzUmVjdC5oZWlnaHQgLSByZWN0LnggLSByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIC8qIEZsaXAgaGVpZ2h0ICYgd2lkdGggKi9cbiAgICAgICAgICAgICAgICB3aWR0aCA9IHJlY3QuaGVpZ2h0ICsgY3VycmVudEhpdFN0cm9rZU9mZnNldDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSByZWN0LndpZHRoICsgY3VycmVudEhpdFN0cm9rZU9mZnNldDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY3VycmVudE92ZXJsYXk6IFNWR1JlY3RFbGVtZW50ID0gdGhpcy5zdmdOb2RlXG4gICAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAuYXR0cignbWltZUhpdEluZGV4JywgaGl0LmlkKVxuICAgICAgICAgICAgICAuYXR0cigneCcsIHgpXG4gICAgICAgICAgICAgIC5hdHRyKCd5JywgeSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZ2hsaWdodEN1cnJlbnRIaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgdGhpcy5zdmdOb2RlLnNlbGVjdEFsbChgZyA+IHJlY3Quc2VsZWN0ZWRgKS5hdHRyKCdjbGFzcycsICdoaXQnKTtcbiAgICAgIHRoaXMuc3ZnTm9kZVxuICAgICAgICAuc2VsZWN0QWxsKGBnID4gcmVjdFttaW1lSGl0SW5kZXg9JyR7dGhpcy5jdXJyZW50SGl0LmlkfSddYClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpdCBzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpZ2h0bGlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ZnTm9kZSkge1xuICAgICAgdGhpcy5zdmdOb2RlLnNlbGVjdEFsbCgnLmhpdCcpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRVcFZpZXdlcihtYW5pZmVzdDogTWFuaWZlc3QsIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgaWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LnRpbGVTb3VyY2UpIHtcbiAgICAgIHRoaXMudGlsZVNvdXJjZXMgPSBtYW5pZmVzdC50aWxlU291cmNlO1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICB0aGlzLmlzTWFuaWZlc3RQYWdlZCA9IE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKHRoaXMubWFuaWZlc3QpO1xuICAgICAgICB0aGlzLnZpZXdlciA9IG5ldyBPcGVuU2VhZHJhZ29uLlZpZXdlcihcbiAgICAgICAgICBPcHRpb25zRmFjdG9yeS5jcmVhdGUodGhpcy5jb25maWcpXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVN2Z092ZXJsYXkoKTtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdFpvb21TdHJhdGVneShcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UsXG4gICAgICAgICAgdGhpcy5tb2RlU2VydmljZSxcbiAgICAgICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneSA9IG5ldyBEZWZhdWx0R29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3ksXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy5jb25maWcsXG4gICAgICAgICAgdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICBUaGlzIGRpc2FibGVzIGtleWJvYXJkIG5hdmlnYXRpb24gaW4gb3BlbnNlYWRyYWdvbi5cbiAgICAgICAgICBXZSB1c2UgcyBmb3Igb3BlbmluZyBzZWFyY2ggZGlhbG9nIGFuZCBPU0QgdXNlIHRoZSBzYW1lIGtleSBmb3IgcGFubmluZy5cbiAgICAgICAgICBJc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL29wZW5zZWFkcmFnb24vb3BlbnNlYWRyYWdvbi9pc3N1ZXMvNzk0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlZmF1bHRLZXlEb3duSGFuZGxlciA9IHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlcjtcbiAgICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleUhhbmRsZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2sgPSBuZXcgQ2FudmFzR3JvdXBNYXNrKFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5hZGRUb1dpbmRvdygpO1xuICAgICAgdGhpcy5zZXR1cE92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmNyZWF0ZU92ZXJsYXlzKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgICAgdGhpcy5hZGRTdWJzY3JpcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKG1vZGU6IE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgIHRoaXMubW9kZUNoYW5nZWQobW9kZSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgdGhpcy5vbkNlbnRlckNoYW5nZVxuICAgICAgICAgIC5waXBlKHNhbXBsZShpbnRlcnZhbCg1MDApKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChjZW50ZXI6IFBvaW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXIpO1xuICAgICAgICAgICAgaWYgKGNlbnRlciAmJiBjZW50ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5vc2RJc1JlYWR5Lm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIucmVzZXQoKTtcbiAgICAgICAgICBpZiAoY2FudmFzR3JvdXBJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmNoYW5nZUNhbnZhc0dyb3VwKFxuICAgICAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzR3JvdXBSZWN0KGNhbnZhc0dyb3VwSW5kZXgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uT3NkUmVhZHlDaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxDYW52YXNHcm91cExvYWRlZCgpO1xuICAgICAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICB0aGlzLmxheW91dFBhZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25TZWxlY3RlZC5zdWJzY3JpYmUoKGhpdDogSGl0IHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEhpdCgpO1xuICAgICAgICAgIHRoaXMuZ29Ub0NhbnZhcyhoaXQuaW5kZXgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMub25Sb3RhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHJvdGF0aW9uOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5sYXlvdXRQYWdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25SZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlJC5zdWJzY3JpYmUoXG4gICAgICAgIChyZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzOiBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWUgPT09IFJlY29nbml6ZWRUZXh0TW9kZS5PTkxZXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVQYWdlcygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMucHJldmlvdXNWYWx1ZSA9PT0gUmVjb2duaXplZFRleHRNb2RlLk9OTFlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5wcmV2aW91c1ZhbHVlID09PVxuICAgICAgICAgICAgICBSZWNvZ25pemVkVGV4dE1vZGUuT05MWSAmJlxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWUgPT09IFJlY29nbml6ZWRUZXh0TW9kZS5TUExJVFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaG9tZSgpO1xuICAgICAgICAgICAgfSwgVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgaGlkZVBhZ2VzKCkge1xuICAgIHRoaXMuc2V0T3BhY2l0eU9uUGFnZXMoMCk7XG4gIH1cblxuICBzaG93UGFnZXMoKSB7XG4gICAgdGhpcy5zZXRPcGFjaXR5T25QYWdlcygxKTtcbiAgfVxuXG4gIGxheW91dFBhZ2VzKCkge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0luZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNJbmRleDtcbiAgICAgIHRoaXMuZGVzdHJveSh0cnVlKTtcbiAgICAgIHRoaXMuc2V0VXBWaWV3ZXIodGhpcy5tYW5pZmVzdCwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OlxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KGN1cnJlbnRDYW52YXNJbmRleCksXG4gICAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZWNyZWF0ZSBoaWdobGlnaHRzIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSBzZWFyY2ggZ29pbmcgb25cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTZWFyY2gpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQodGhpcy5jdXJyZW50U2VhcmNoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRUb1dpbmRvdygpIHtcbiAgICAoPGFueT53aW5kb3cpLm9wZW5TZWFkcmFnb25WaWV3ZXIgPSB0aGlzLnZpZXdlcjtcbiAgfVxuXG4gIHNldHVwT3ZlcmxheXMoKTogdm9pZCB7XG4gICAgdGhpcy5zdmdPdmVybGF5ID0gdGhpcy52aWV3ZXIuc3ZnT3ZlcmxheSgpO1xuICAgIHRoaXMuc3ZnTm9kZSA9IGQzLnNlbGVjdCh0aGlzLnN2Z092ZXJsYXkubm9kZSgpKTtcbiAgfVxuXG4gIGRpc2FibGVLZXlEb3duSGFuZGxlcigpIHtcbiAgICB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXIgPSBudWxsO1xuICB9XG5cbiAgcmVzZXRLZXlEb3duSGFuZGxlcigpIHtcbiAgICB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXIgPSB0aGlzLmRlZmF1bHRLZXlEb3duSGFuZGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gbGF5b3V0U3dpdGNoIHRydWUgaWYgc3dpdGNoaW5nIGJldHdlZW4gbGF5b3V0c1xuICAgKiB0byBrZWVwIGN1cnJlbnQgc2VhcmNoLXN0YXRlIGFuZCByb3RhdGlvblxuICAgKi9cbiAgZGVzdHJveShsYXlvdXRTd2l0Y2g/OiBib29sZWFuKSB7XG4gICAgdGhpcy5vc2RJc1JlYWR5Lm5leHQoZmFsc2UpO1xuICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHsgeDogMCwgeTogMCB9KTtcbiAgICBpZiAodGhpcy52aWV3ZXIgIT0gbnVsbCAmJiB0aGlzLnZpZXdlci5pc09wZW4oKSkge1xuICAgICAgaWYgKHRoaXMudmlld2VyLmNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzLnZpZXdlci5jb250YWluZXIucGFyZW50Tm9kZSkuc3R5bGUoJ29wYWNpdHknLCAnMCcpO1xuICAgICAgfVxuICAgICAgdGhpcy52aWV3ZXIuZGVzdHJveSgpO1xuICAgICAgdGhpcy52aWV3ZXIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FudmFzR3JvdXBNYXNrKSB7XG4gICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8vIEtlZXAgc2VhcmNoLXN0YXRlIGFuZCByb3RhdGlvbiBvbmx5IGlmIGxheW91dC1zd2l0Y2hcbiAgICBpZiAoIWxheW91dFN3aXRjaCkge1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBudWxsO1xuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5yb3RhdGlvbi5uZXh0KDApO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnJlc2V0KCk7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGREb3VibGVDbGlja0hhbmRsZXIodGhpcy5kYmxDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbi1maW5pc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtY2xpY2snLCB0aGlzLmNsaWNrU2VydmljZS5jbGljayk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcihcbiAgICAgICdjYW52YXMtZG91YmxlLWNsaWNrJyxcbiAgICAgIChlOiBhbnkpID0+IChlLnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1wcmVzcycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXJlbGVhc2UnLCAoKSA9PlxuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dChmYWxzZSlcbiAgICApO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1zY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMucGluY2hIYW5kbGVyKTtcblxuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5kcmFnU3RhdHVzID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhZ0hhbmRsZXIoZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgKGU6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXR1cykge1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnRDYW52YXMoKTtcbiAgICAgICAgdGhpcy5zd2lwZVRvQ2FudmFzR3JvdXAoZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYWdTdGF0dXMgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24nLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHpvb21Jbih6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHpvb21PdXQoem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9zZElzUmVhZHkuZ2V0VmFsdWUoKSkge1xuICAgICAgaWYgKHRoaXMudmlld2VyLnVzZUNhbnZhcykge1xuICAgICAgICB0aGlzLnJvdGF0ZVRvUmlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRDdXJyZW50SGl0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dSb3RhdGlvbklzTm90U3VwcG9ydGV0TWVzc2FnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3IgbW9kZS1jaGFuZ2VcbiAgICogQHBhcmFtIG1vZGUgVmlld2VyTW9kZVxuICAgKi9cbiAgbW9kZUNoYW5nZWQobW9kZTogTW9kZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudmlld2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlVG9EYXNoYm9hcmQoKTtcbiAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb1BhZ2UoKTtcbiAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgfSBlbHNlIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSB0cnVlO1xuICAgICAgdGhpcy5yZXNldEtleURvd25IYW5kbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIERBU0hCT0FSRC1tb2RlLCByZXBvc2l0aW9ucyBjYW52YXMgZ3JvdXAgYW5kIHJlbW92ZXMgbWF4LXdpZHRoIG9uIHZpZXdlclxuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb0Rhc2hib2FyZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzU2VydmljZS5pc0N1cnJlbnRDYW52YXNHcm91cFZhbGlkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaGlkZSgpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbShWaWV3ZXJNb2RlLkRBU0hCT0FSRCk7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gUEFHRS1tb2RlLCBjZW50ZXJzIGN1cnJlbnQgY2FudmFzIGdyb3VwIGFuZCByZXBvc2l0aW9ucyBvdGhlciBjYW52YXMgZ3JvdXBzXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzU2VydmljZS5pc0N1cnJlbnRDYW52YXNHcm91cFZhbGlkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBJbmRleDogdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suc2hvdygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbShWaWV3ZXJNb2RlLlBBR0UpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbC1oYW5kbGVyXG4gICAqL1xuICBzY3JvbGxIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gTWF0aC5wb3coVmlld2VyT3B0aW9ucy56b29tLnpvb21GYWN0b3IsIGV2ZW50LnNjcm9sbCk7XG4gICAgLy8gU2Nyb2xsaW5nIHVwXG4gICAgaWYgKGV2ZW50LnNjcm9sbCA+IDApIHtcbiAgICAgIHRoaXMuem9vbUluR2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBTY3JvbGxpbmcgZG93blxuICAgIH0gZWxzZSBpZiAoZXZlbnQuc2Nyb2xsIDwgMCkge1xuICAgICAgdGhpcy56b29tT3V0R2VzdHVyZShldmVudC5wb3NpdGlvbiwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQaW5jaC1oYW5kbGVyXG4gICAqL1xuICBwaW5jaEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIHRoaXMucGluY2hTdGF0dXMuYWN0aXZlID0gdHJ1ZTtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gZXZlbnQuZGlzdGFuY2UgLyBldmVudC5sYXN0RGlzdGFuY2U7XG4gICAgLy8gUGluY2ggT3V0XG4gICAgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgPlxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZFxuICAgICkge1xuICAgICAgdGhpcy56b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgICAgLy8gUGluY2ggSW5cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZXZlbnQuZGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkIDxcbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZVxuICAgICkge1xuICAgICAgdGhpcy56b29tT3V0UGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludCB0byB6b29tIHRvLiBJZiBub3Qgc2V0LCB0aGUgdmlld2VyIHdpbGwgem9vbSB0byBjZW50ZXJcbiAgICovXG4gIHpvb21Jbkdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21Jbih6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB6b29tT3V0R2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBpbiBwaW5jaCBnZXN0dXJlIChwaW5jaCBvdXQpXG4gICAqXG4gICAqIFRvZ2dsZSB0byBwYWdlIG1vZGUgYW5kIFpvb20gaW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbUluUGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbUluKHpvb21GYWN0b3IsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gfHwgZXZlbnQuY2VudGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIG91dCBwaW5jaCBnZXN0dXJlIChwaW5jaCBpbilcbiAgICpcbiAgICogWm9vbSBvdXQgYW5kIHRvZ2dsZSB0byBkYXNoYm9hcmQgd2hlbiBhbGwgem9vbWVkIG91dC5cbiAgICogU3RvcCBiZXR3ZWVuIHpvb21pbmcgb3V0IGFuZCB0b2dnbGluZyB0byBkYXNoYm9hcmQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZ2VzdHVyZUlkID0gZXZlbnQuZ2VzdHVyZVBvaW50c1swXS5pZDtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gdHJ1ZTtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgZXZlbnQuY2VudGVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgfHxcbiAgICAgICAgZ2VzdHVyZUlkID09PSB0aGlzLnBpbmNoU3RhdHVzLnByZXZpb3VzR2VzdHVyZUlkICsgMlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgPSBnZXN0dXJlSWQ7XG4gICAgfVxuICB9XG5cbiAgZ29Ub0hvbWVab29tKCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbmdsZS1jbGljay1oYW5kbGVyXG4gICAqIFNpbmdsZS1jbGljayB0b2dnbGVzIGJldHdlZW4gcGFnZS9kYXNoYm9hcmQtbW9kZSBpZiBhIHBhZ2UgaXMgaGl0XG4gICAqL1xuICBzaW5nbGVDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRpbGVJbmRleCA9IHRoaXMuZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgodGlsZUluZGV4KTtcbiAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH1cbiAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogRG91YmxlLWNsaWNrLWhhbmRsZXJcbiAgICogRG91YmxlLWNsaWNrIGRhc2hib2FyZC1tb2RlIHNob3VsZCBnbyB0byBwYWdlLW1vZGVcbiAgICogRG91YmxlLWNsaWNrIHBhZ2UtbW9kZSBzaG91bGRcbiAgICogICAgYSkgWm9vbSBpbiBpZiBwYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBvclxuICAgKiAgICBiKSBGaXQgdmVydGljYWxseSBpZiBwYWdlIGlzIGFscmVhZHkgem9vbWVkIGluXG4gICAqL1xuICBkYmxDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vIFBhZ2UgaXMgZml0dGVkIHZlcnRpY2FsbHksIHNvIGRibC1jbGljayB6b29tcyBpblxuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbihcbiAgICAgICAgVmlld2VyT3B0aW9ucy56b29tLmRibENsaWNrWm9vbUZhY3RvcixcbiAgICAgICAgZXZlbnQucG9zaXRpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICAgIGNvbnN0IGNhbnZhc0luZGV4OiBudW1iZXIgPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChjYW52YXNJbmRleCk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBoaXQgZWxlbWVudCBpcyBhIDxyZWN0Pi1lbGVtZW50XG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIGlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBTVkdSZWN0RWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aWxlc291cmNlcyBhbmQgYWRkcyB0aGVtIHRvIHZpZXdlclxuICAgKiBDcmVhdGVzIHN2ZyBjbGlja2FibGUgb3ZlcmxheXMgZm9yIGVhY2ggdGlsZVxuICAgKi9cbiAgY3JlYXRlT3ZlcmxheXMoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5cyA9IFtdO1xuICAgIGNvbnN0IGNhbnZhc1JlY3RzOiBSZWN0W10gPSBbXTtcbiAgICBjb25zdCBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kgPVxuICAgICAgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkuY3JlYXRlKFxuICAgICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0LFxuICAgICAgICB0aGlzLmlzTWFuaWZlc3RQYWdlZCxcbiAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICk7XG5cbiAgICBjb25zdCBpc1R3b1BhZ2VWaWV3OiBib29sZWFuID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgICBjb25zdCByb3RhdGlvbiA9IHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKTtcbiAgICBsZXQgZ3JvdXA6IGFueSA9IHRoaXMuc3ZnTm9kZS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdwYWdlLWdyb3VwJyk7XG5cbiAgICB0aGlzLnRpbGVTb3VyY2VzLmZvckVhY2goKHRpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID1cbiAgICAgICAgY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5LmNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FudmFzR3JvdXBJbmRleDogaSxcbiAgICAgICAgICAgIGNhbnZhc1NvdXJjZTogdGlsZSxcbiAgICAgICAgICAgIHByZXZpb3VzQ2FudmFzR3JvdXBQb3NpdGlvbjogY2FudmFzUmVjdHNbaSAtIDFdLFxuICAgICAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm90YXRpb25cbiAgICAgICAgKTtcblxuICAgICAgY2FudmFzUmVjdHMucHVzaChwb3NpdGlvbik7XG5cbiAgICAgIGNvbnN0IHRpbGVTb3VyY2VTdHJhdGVneSA9IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkuY3JlYXRlKHRpbGUpO1xuICAgICAgY29uc3QgdGlsZVNvdXJjZSA9IHRpbGVTb3VyY2VTdHJhdGVneS5nZXRUaWxlU291cmNlKHRpbGUpO1xuXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3RhdGVkID0gcm90YXRpb24gPT09IDkwIHx8IHJvdGF0aW9uID09PSAyNzA7XG5cbiAgICAgICAgbGV0IGJvdW5kcztcblxuICAgICAgICAvKiBCZWNhdXNlIGltYWdlIHNjYWxpbmcgaXMgcGVyZm9ybWVkIGJlZm9yZSByb3RhdGlvbixcbiAgICAgICAgICogd2UgbXVzdCBpbnZlcnQgd2lkdGggJiBoZWlnaHQgYW5kIHRyYW5zbGF0ZSBwb3NpdGlvbiBzbyB0aGF0IHRpbGUgcm90YXRpb24gZW5kcyB1cCBjb3JyZWN0XG4gICAgICAgICAqL1xuICAgICAgICBpZiAocm90YXRlZCkge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54ICsgKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi55IC0gKHBvc2l0aW9uLndpZHRoIC0gcG9zaXRpb24uaGVpZ2h0KSAvIDIsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQsXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLngsXG4gICAgICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGgsXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3ZXIuYWRkVGlsZWRJbWFnZSh7XG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgdGlsZVNvdXJjZTogdGlsZVNvdXJjZSxcbiAgICAgICAgICBmaXRCb3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBkZWdyZWVzOiByb3RhdGlvbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcgJiYgaSAlIDIgIT09IDApIHtcbiAgICAgICAgZ3JvdXAgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50T3ZlcmxheSA9IGdyb3VwXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cigneCcsIHBvc2l0aW9uLngpXG4gICAgICAgIC5hdHRyKCd5JywgcG9zaXRpb24ueSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgcG9zaXRpb24ud2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBwb3NpdGlvbi5oZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0aWxlJyk7XG5cbiAgICAgIC8vIE1ha2UgY3VzdG9tIGJvcmRlcnMgaWYgY3VycmVudCBsYXlvdXQgaXMgdHdvLXBhZ2VkXG4gICAgICBpZiAoaXNUd29QYWdlVmlldykge1xuICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG5vTGVmdFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIE51bWJlcihwb3NpdGlvbi53aWR0aCAqIDIgKyBwb3NpdGlvbi5oZWlnaHQpICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggKiAyO1xuICAgICAgICAgIGN1cnJlbnRPdmVybGF5LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jywgbm9MZWZ0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgJSAyICE9PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub1JpZ2h0U3Ryb2tlU3R5bGUgPVxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGggK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBwb3NpdGlvbi5oZWlnaHQgK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KTtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vUmlnaHRTdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXlOb2RlOiBTVkdSZWN0RWxlbWVudCA9IGN1cnJlbnRPdmVybGF5Lm5vZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheXNbaV0gPSBjdXJyZW50T3ZlcmxheU5vZGU7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsYXlvdXQgPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFIHx8XG4gICAgICAhdGhpcy5pc01hbmlmZXN0UGFnZWRcbiAgICAgICAgPyBWaWV3ZXJMYXlvdXQuT05FX1BBR0VcbiAgICAgICAgOiBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgdGhpcy5jYW52YXNTZXJ2aWNlLmFkZEFsbChjYW52YXNSZWN0cywgbGF5b3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHZpZXdlciBzaXplIGFuZCBvcGFjaXR5IG9uY2UgdGhlIGZpcnN0IGNhbnZhcyBncm91cCBoYXMgZnVsbHkgbG9hZGVkXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxDYW52YXNHcm91cExvYWRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvbWUoKTtcbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5pbml0aWFsaXplKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKSxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSAhPT0gVmlld2VyTW9kZS5EQVNIQk9BUkRcbiAgICApO1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbihWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsICcxJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb3ZlcmxheS1pbmRleCBmb3IgY2xpY2stZXZlbnQgaWYgaGl0XG4gICAqIEBwYXJhbSB0YXJnZXQgaGl0IDxyZWN0PlxuICAgKi9cbiAgZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmlzQ2FudmFzR3JvdXBIaXQodGFyZ2V0KSkge1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXA6IG51bWJlciA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwID49IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RlZENhbnZhc0dyb3VwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cChjZW50ZXI6IFBvaW50KSB7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KGNlbnRlcik7XG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKGU6IGFueSkgPT4ge1xuICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSB0cnVlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPVxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgICAgY29uc3QgdnBCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPVxuICAgICAgICBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgICAgdnBCb3VuZHNcbiAgICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogbnVtYmVyID0gZS5kaXJlY3Rpb247XG4gICAgICBpZiAoXG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuTEVGVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JblJpZ2h0U2VtaWNpcmNsZShkaXJlY3Rpb24pKSB8fFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLlJJR0hUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluTGVmdFNlbWljaXJjbGUoZGlyZWN0aW9uKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhcygpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzQm91bmRzID0gdGhpcy5nZXRDdXJyZW50Q2FudmFzQm91bmRzKCk7XG4gICAgICB0aGlzLmlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KHZpZXdwb3J0Qm91bmRzLCBjdXJyZW50Q2FudmFzQm91bmRzKVxuICAgICAgICA/IHRoaXMuY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICAgICAgICAgIHZpZXdwb3J0Qm91bmRzLFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0JvdW5kc1xuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50Q2FudmFzQm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlci53b3JsZFxuICAgICAgLmdldEl0ZW1BdCh0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpXG4gICAgICAuZ2V0Qm91bmRzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2FudmFzT3V0c2lkZVZpZXdwb3J0KFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMuaGVpZ2h0IDwgY2FudmFzQm91bmRzLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogdm9pZCB7XG4gICAgbGV0IHJlY3Q6IFJlY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodCAvIDIsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDYW52YXNBYm92ZVZpZXdwb3J0Qm90dG9tKHZpZXdwb3J0Qm91bmRzLCBjYW52YXNCb3VuZHMpKSB7XG4gICAgICByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgICB5OiBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgLSB2aWV3cG9ydEJvdW5kcy5oZWlnaHQgLyAyLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucGFuVG8ocmVjdCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnN0cmFpbnRDYW52YXNJbnNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kczogUmVjdCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cFJlY3QoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiB2aWV3cG9ydEJvdW5kcy54ICsgdmlld3BvcnRCb3VuZHMud2lkdGggLyAyLFxuICAgICAgeTogY2FudmFzR3JvdXBSZWN0LmNlbnRlclksXG4gICAgfSk7XG4gICAgdGhpcy5wYW5UbyhyZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDYW52YXNCZWxvd1ZpZXdwb3J0VG9wKFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmlld3BvcnRCb3VuZHMueSA8IGNhbnZhc0JvdW5kcy55O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NhbnZhc0Fib3ZlVmlld3BvcnRCb3R0b20oXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjYW52YXNCb3VuZHMueSArIGNhbnZhc0JvdW5kcy5oZWlnaHQgPFxuICAgICAgdmlld3BvcnRCb3VuZHMueSArIHZpZXdwb3J0Qm91bmRzLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN3aXBlVG9DYW52YXNHcm91cChlOiBhbnkpIHtcbiAgICAvLyBEb24ndCBzd2lwZSBvbiBwaW5jaCBhY3Rpb25zXG4gICAgaWYgKHRoaXMucGluY2hTdGF0dXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlZWQ6IG51bWJlciA9IGUuc3BlZWQ7XG4gICAgY29uc3QgZHJhZ0VuZFBvc2lzaW9uID0gZS5wb3NpdGlvbjtcblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0Qm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBTd2lwZVV0aWxzLmdldFN3aXBlRGlyZWN0aW9uKFxuICAgICAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbixcbiAgICAgIGRyYWdFbmRQb3Npc2lvbixcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKClcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlciA9XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgY29uc3QgY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kgPVxuICAgICAgQ2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwRmFjdG9yeS5jcmVhdGUodGhpcy5tb2RlU2VydmljZS5tb2RlKTtcblxuICAgIGxldCBwYW5uZWRQYXN0U2lkZTogU2lkZSB8IG51bGw7XG4gICAgbGV0IGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHBhbm5lZFBhc3RTaWRlID0gU3dpcGVVdGlscy5nZXRTaWRlSWZQYW5uaW5nUGFzdEVuZE9mQ2FudmFzR3JvdXAoXG4gICAgICAgIGNhbnZhc0dyb3VwUmVjdCxcbiAgICAgICAgdmlld3BvcnRCb3VuZHNcbiAgICAgICk7XG4gICAgICB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIuYWRkSGl0KHBhbm5lZFBhc3RTaWRlLCBkaXJlY3Rpb24pO1xuICAgICAgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgPVxuICAgICAgICB0aGlzLnN3aXBlRHJhZ0VuZENvdW50ZXIuaGl0Q291bnRSZWFjaGVkKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3Q2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5jb25zdHJhaW5Ub1JhbmdlKFxuICAgICAgY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwU3RyYXRlZ3kuY2FsY3VsYXRlTmV4dENhbnZhc0dyb3VwKHtcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwQ2VudGVyOiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpLFxuICAgICAgICBzcGVlZDogc3BlZWQsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkOiBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCxcbiAgICAgICAgdmlld2luZ0RpcmVjdGlvbjogdGhpcy5tYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uLFxuICAgICAgfSlcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICAoY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgJiYgZGlyZWN0aW9uKVxuICAgICkge1xuICAgICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvQ2FudmFzR3JvdXAoe1xuICAgICAgICBjYW52YXNHcm91cEluZGV4OiBuZXdDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaWV3cG9ydEJvdW5kcygpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldEJvdW5kcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcmlnaW5hbFRhcmdldChldmVudDogYW55KSB7XG4gICAgcmV0dXJuIGV2ZW50Lm9yaWdpbmFsVGFyZ2V0XG4gICAgICA/IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0XG4gICAgICA6IGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYW5UbyhyZWN0OiBSZWN0IHwgdW5kZWZpbmVkLCBpbW1lZGlhdGVseSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHJlY3QpIHtcbiAgICAgIHRoaXMudmlld2VyLnZpZXdwb3J0LnBhblRvKFxuICAgICAgICB7XG4gICAgICAgICAgeDogcmVjdC54LFxuICAgICAgICAgIHk6IHJlY3QueSxcbiAgICAgICAgfSxcbiAgICAgICAgaW1tZWRpYXRlbHlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByb3RhdGVUb1JpZ2h0KCkge1xuICAgIHRoaXMucm90YXRpb24ubmV4dCgodGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpICsgOTApICUgMzYwKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd1JvdGF0aW9uSXNOb3RTdXBwb3J0ZXRNZXNzYWdlKCkge1xuICAgIHRoaXMuc25hY2tCYXIub3Blbih0aGlzLmludGwucm90YXRpb25Jc05vdFN1cHBvcnRlZCwgdW5kZWZpbmVkLCB7XG4gICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3BhY2l0eU9uUGFnZXMob3BhY2l0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlld2VyKSB7XG4gICAgICBjb25zdCBpdGVtQ291bnQgPSB0aGlzLnZpZXdlci53b3JsZC5nZXRJdGVtQ291bnQoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMudmlld2VyLndvcmxkLmdldEl0ZW1BdChpKTtcbiAgICAgICAgaXRlbS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=
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
ViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerService, deps: [{ token: i0.NgZone }, { token: i1.ClickService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.ViewerLayoutService }, { token: i5.IiifContentSearchService }, { token: i6.StyleService }, { token: i7.AltoService }, { token: i8.MatSnackBar }, { token: i9.MimeViewerIntl }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.ClickService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.ViewerLayoutService }, { type: i5.IiifContentSearchService }, { type: i6.StyleService }, { type: i7.AltoService }, { type: i8.MatSnackBar }, { type: i9.MimeViewerIntl }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUVSLE9BQU8sRUFDUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFHdkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRzdFLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSxXQUFXLENBQUM7QUFHbkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUt6RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEMsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFD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RTtZQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzswR0FoaUNVLGFBQWE7OEdBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGludGVydmFsLFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNhbXBsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi4vYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2NhbnZhcy1ncm91cC1wb3NpdGlvbi9jYWxjdWxhdGUtY2FudmFzLWdyb3VwLXBvc2l0aW9uLWZhY3RvcnknO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrU2VydmljZSB9IGZyb20gJy4uL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZSc7XG5pbXBvcnQgeyBjcmVhdGVTdmdPdmVybGF5IH0gZnJvbSAnLi4vZXh0L3N2Zy1vdmVybGF5JztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3RVdGlscyB9IGZyb20gJy4uL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXV0aWxzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bCc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7XG4gIE1vZGVDaGFuZ2VzLFxuICBSZWNvZ25pemVkVGV4dE1vZGUsXG4gIFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMsXG59IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvZGlyZWN0aW9uJztcbmltcG9ydCB7IE1hbmlmZXN0LCBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBQaW5jaFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9waW5jaFN0YXR1cyc7XG5pbXBvcnQgeyBTaWRlIH0gZnJvbSAnLi4vbW9kZWxzL3NpZGUnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkgfSBmcm9tICcuL2NhbGN1bGF0ZS1uZXh0LWNhbnZhcy1ncm91cC1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc0dyb3VwTWFzayB9IGZyb20gJy4vY2FudmFzLWdyb3VwLW1hc2snO1xuaW1wb3J0IHtcbiAgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LFxuICBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbn0gZnJvbSAnLi9nby10by1jYW52YXMtZ3JvdXAtc3RyYXRlZ3knO1xuaW1wb3J0IHsgT3B0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL29wdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBTd2lwZURyYWdFbmRDb3VudGVyIH0gZnJvbSAnLi9zd2lwZS1kcmFnLWVuZC1jb3VudGVyJztcbmltcG9ydCB7IFN3aXBlVXRpbHMgfSBmcm9tICcuL3N3aXBlLXV0aWxzJztcbmltcG9ydCB7IFRpbGVTb3VyY2VTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3RpbGUtc291cmNlLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgRGVmYXVsdFpvb21TdHJhdGVneSwgWm9vbVN0cmF0ZWd5IH0gZnJvbSAnLi96b29tLXN0cmF0ZWd5JztcblxuZGVjbGFyZSBjb25zdCBPcGVuU2VhZHJhZ29uOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2aWV3ZXI/OiBhbnk7XG4gIHByaXZhdGUgc3ZnT3ZlcmxheTogYW55O1xuICBwcml2YXRlIHN2Z05vZGU6IGFueTtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuXG4gIHByaXZhdGUgb3ZlcmxheXM6IEFycmF5PFNWR1JlY3RFbGVtZW50PiA9IFtdO1xuICBwcml2YXRlIHRpbGVTb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIHB1YmxpYyBpc0NhbnZhc1ByZXNzZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIGZhbHNlXG4gICk7XG5cbiAgcHJpdmF0ZSBjdXJyZW50Q2VudGVyOiBTdWJqZWN0PFBvaW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudENhbnZhc0luZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgY3VycmVudEhpdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb3NkSXNSZWFkeSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcml2YXRlIHN3aXBlRHJhZ0VuZENvdW50ZXIgPSBuZXcgU3dpcGVEcmFnRW5kQ291bnRlcigpO1xuICBwcml2YXRlIGNhbnZhc0dyb3VwTWFzayE6IENhbnZhc0dyb3VwTWFzaztcbiAgcHJpdmF0ZSBwaW5jaFN0YXR1cyA9IG5ldyBQaW5jaFN0YXR1cygpO1xuICBwcml2YXRlIGRyYWdTdGFydFBvc2l0aW9uOiBhbnk7XG4gIHByaXZhdGUgbWFuaWZlc3QhOiBNYW5pZmVzdDtcbiAgcHJpdmF0ZSBpc01hbmlmZXN0UGFnZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZWZhdWx0S2V5RG93bkhhbmRsZXI6IGFueTtcblxuICBwdWJsaWMgY3VycmVudFNlYXJjaDogU2VhcmNoUmVzdWx0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgem9vbVN0cmF0ZWd5ITogWm9vbVN0cmF0ZWd5O1xuICBwcml2YXRlIGdvVG9DYW52YXNHcm91cFN0cmF0ZWd5ITogR29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3k7XG5cbiAgcHJpdmF0ZSByb3RhdGlvbjogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBwcml2YXRlIGRyYWdTdGF0dXMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGNsaWNrU2VydmljZTogQ2xpY2tTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIG1vZGVTZXJ2aWNlOiBNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlckxheW91dFNlcnZpY2U6IFZpZXdlckxheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIHN0eWxlU2VydmljZTogU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWx0b1NlcnZpY2U6IEFsdG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgIHByaXZhdGUgaW50bDogTWltZVZpZXdlckludGxcbiAgKSB7fVxuXG4gIGdldCBvblJvdGF0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRpb24uYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNlbnRlckNoYW5nZSgpOiBPYnNlcnZhYmxlPFBvaW50PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENlbnRlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk9zZFJlYWR5Q2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm9zZElzUmVhZHkuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaWV3ZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGlsZXNvdXJjZXMoKTogUmVzb3VyY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZVNvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3ZlcmxheXMoKTogU1ZHUmVjdEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluWm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNaW5ab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4Wm9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb21TdHJhdGVneS5nZXRNYXhab29tKCk7XG4gIH1cblxuICBwdWJsaWMgaG9tZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20odGhpcy5tb2RlU2VydmljZS5tb2RlKTtcblxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuY2VudGVyQ3VycmVudENhbnZhcygpO1xuXG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvUHJldmlvdXNDYW52YXNHcm91cChcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdvVG9OZXh0Q2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5nb1RvTmV4dENhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbnZhc0dyb3VwKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiBjYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGltbWVkaWF0ZWx5LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdvVG9DYW52YXMoY2FudmFzSW5kZXg6IG51bWJlciwgaW1tZWRpYXRlbHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXNHcm91cEluZGV4ID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KGNhbnZhc0luZGV4KTtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiBjYW52YXNHcm91cEluZGV4LFxuICAgICAgaW1tZWRpYXRlbHk6IGltbWVkaWF0ZWx5LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhpZ2hsaWdodChzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJIaWdodGxpZ2h0KCk7XG4gICAgaWYgKHRoaXMudmlld2VyKSB7XG4gICAgICBpZiAoc2VhcmNoUmVzdWx0LnEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gc2VhcmNoUmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCByb3RhdGlvbiA9IHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKTtcblxuICAgICAgZm9yIChjb25zdCBoaXQgb2Ygc2VhcmNoUmVzdWx0LmhpdHMpIHtcbiAgICAgICAgZm9yIChjb25zdCByZWN0IG9mIGhpdC5yZWN0cykge1xuICAgICAgICAgIGNvbnN0IGNhbnZhc1JlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzUmVjdChoaXQuaW5kZXgpO1xuICAgICAgICAgIGlmIChjYW52YXNSZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0ID0gODtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGggKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0ICsgY3VycmVudEhpdFN0cm9rZU9mZnNldDtcbiAgICAgICAgICAgIGxldCB4ID0gY2FudmFzUmVjdC54IC0gY3VycmVudEhpdFN0cm9rZU9mZnNldCAvIDI7XG4gICAgICAgICAgICBsZXQgeSA9IGNhbnZhc1JlY3QueSAtIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQgLyAyO1xuXG4gICAgICAgICAgICAvKiBoaXQgcmVjdCBhcmUgcmVsYXRpdmUgdG8gZWFjaCB1bnJvdGF0ZWQgcGFnZSBjYW52YXNSZWN0IHNvIHgseSBtdXN0IGJlIGFkanVzdGVkIGJ5IHRoZSByZW1haW5pbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggKz0gcmVjdC54O1xuICAgICAgICAgICAgICAgIHkgKz0gcmVjdC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gcmVjdC55IC0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgeSArPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcmVjdC5oZWlnaHQgKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHJlY3Qud2lkdGggKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTgwOlxuICAgICAgICAgICAgICAgIHggKz0gY2FudmFzUmVjdC53aWR0aCAtIChyZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgICAgICB4ICs9IHJlY3QueTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gcmVjdC54IC0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSByZWN0LmhlaWdodCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC53aWR0aCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5OiBTVkdSZWN0RWxlbWVudCA9IHRoaXMuc3ZnTm9kZVxuICAgICAgICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgLmF0dHIoJ21pbWVIaXRJbmRleCcsIGhpdC5pZClcbiAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgICAuYXR0cigneScsIHkpXG4gICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWdobGlnaHRDdXJyZW50SGl0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoYGcgPiByZWN0LnNlbGVjdGVkYCkuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgICB0aGlzLnN2Z05vZGVcbiAgICAgICAgLnNlbGVjdEFsbChgZyA+IHJlY3RbbWltZUhpdEluZGV4PScke3RoaXMuY3VycmVudEhpdC5pZH0nXWApXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQgc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJIaWdodGxpZ2h0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN2Z05vZGUpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoJy5oaXQnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBWaWV3ZXIobWFuaWZlc3Q6IE1hbmlmZXN0LCBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC50aWxlU291cmNlKSB7XG4gICAgICB0aGlzLnRpbGVTb3VyY2VzID0gbWFuaWZlc3QudGlsZVNvdXJjZTtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWQgPSBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZCh0aGlzLm1hbmlmZXN0KTtcbiAgICAgICAgdGhpcy52aWV3ZXIgPSBuZXcgT3BlblNlYWRyYWdvbi5WaWV3ZXIoXG4gICAgICAgICAgT3B0aW9uc0ZhY3RvcnkuY3JlYXRlKHRoaXMuY29uZmlnKVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVTdmdPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRab29tU3RyYXRlZ3koXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UsXG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdEdvVG9DYW52YXNHcm91cFN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgIHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgVGhpcyBkaXNhYmxlcyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluIG9wZW5zZWFkcmFnb24uXG4gICAgICAgICAgV2UgdXNlIHMgZm9yIG9wZW5pbmcgc2VhcmNoIGRpYWxvZyBhbmQgT1NEIHVzZSB0aGUgc2FtZSBrZXkgZm9yIHBhbm5pbmcuXG4gICAgICAgICAgSXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzc5NFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXIgPSB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5RG93bkhhbmRsZXI7XG4gICAgICAgIHRoaXMuZGlzYWJsZUtleURvd25IYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrID0gbmV3IENhbnZhc0dyb3VwTWFzayhcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkVG9XaW5kb3coKTtcbiAgICAgIHRoaXMuc2V0dXBPdmVybGF5cygpO1xuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICB0aGlzLm1vZGVDaGFuZ2VkKG1vZGUpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHRoaXMub25DZW50ZXJDaGFuZ2VcbiAgICAgICAgICAucGlwZShzYW1wbGUoaW50ZXJ2YWwoNTAwKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY2VudGVyOiBQb2ludCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyKTtcbiAgICAgICAgICAgIGlmIChjZW50ZXIgJiYgY2VudGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLnJlc2V0KCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5jaGFuZ2VDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgICAgICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5vbk9zZFJlYWR5Q2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgdGhpcy5pbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBWaWV3ZXJMYXlvdXQpID0+IHtcbiAgICAgICAgdGhpcy5sYXlvdXRQYWdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uU2VsZWN0ZWQuc3Vic2NyaWJlKChoaXQ6IEhpdCB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhpdCA9IGhpdDtcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRIaXQoKTtcbiAgICAgICAgICB0aGlzLmdvVG9DYW52YXMoaGl0LmluZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm9uUm90YXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChyb3RhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLm9uUmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZSQuc3Vic2NyaWJlKFxuICAgICAgICAocmVjb2duaXplZFRleHRNb2RlQ2hhbmdlczogUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMuY3VycmVudFZhbHVlID09PSBSZWNvZ25pemVkVGV4dE1vZGUuT05MWVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5oaWRlUGFnZXMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLnByZXZpb3VzVmFsdWUgPT09IFJlY29nbml6ZWRUZXh0TW9kZS5PTkxZXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlcygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMucHJldmlvdXNWYWx1ZSA9PT1cbiAgICAgICAgICAgICAgUmVjb2duaXplZFRleHRNb2RlLk9OTFkgJiZcbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMuY3VycmVudFZhbHVlID09PSBSZWNvZ25pemVkVGV4dE1vZGUuU1BMSVRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmhvbWUoKTtcbiAgICAgICAgICAgIH0sIFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGhpZGVQYWdlcygpIHtcbiAgICB0aGlzLnNldE9wYWNpdHlPblBhZ2VzKDApO1xuICB9XG5cbiAgc2hvd1BhZ2VzKCkge1xuICAgIHRoaXMuc2V0T3BhY2l0eU9uUGFnZXMoMSk7XG4gIH1cblxuICBsYXlvdXRQYWdlcygpIHtcbiAgICBpZiAodGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYW52YXNJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzSW5kZXg7XG4gICAgICB0aGlzLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB0aGlzLnNldFVwVmlld2VyKHRoaXMubWFuaWZlc3QsIHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDpcbiAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChjdXJyZW50Q2FudmFzSW5kZXgpLFxuICAgICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgLy8gUmVjcmVhdGUgaGlnaGxpZ2h0cyBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgc2VhcmNoIGdvaW5nIG9uXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuY3VycmVudFNlYXJjaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVG9XaW5kb3coKSB7XG4gICAgKDxhbnk+d2luZG93KS5vcGVuU2VhZHJhZ29uVmlld2VyID0gdGhpcy52aWV3ZXI7XG4gIH1cblxuICBzZXR1cE92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMuc3ZnT3ZlcmxheSA9IHRoaXMudmlld2VyLnN2Z092ZXJsYXkoKTtcbiAgICB0aGlzLnN2Z05vZGUgPSBkMy5zZWxlY3QodGhpcy5zdmdPdmVybGF5Lm5vZGUoKSk7XG4gIH1cblxuICBkaXNhYmxlS2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0S2V5RG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyID0gdGhpcy5kZWZhdWx0S2V5RG93bkhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGxheW91dFN3aXRjaCB0cnVlIGlmIHN3aXRjaGluZyBiZXR3ZWVuIGxheW91dHNcbiAgICogdG8ga2VlcCBjdXJyZW50IHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb25cbiAgICovXG4gIGRlc3Ryb3kobGF5b3V0U3dpdGNoPzogYm9vbGVhbikge1xuICAgIHRoaXMub3NkSXNSZWFkeS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRDZW50ZXIubmV4dCh7IHg6IDAsIHk6IDAgfSk7XG4gICAgaWYgKHRoaXMudmlld2VyICE9IG51bGwgJiYgdGhpcy52aWV3ZXIuaXNPcGVuKCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdlci5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpLnN0eWxlKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmlld2VyLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMudmlld2VyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5cyA9IFtdO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5yZXNldCgpO1xuICAgIGlmICh0aGlzLmNhbnZhc0dyb3VwTWFzaykge1xuICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2suZGVzdHJveSgpO1xuICAgIH1cbiAgICAvLyBLZWVwIHNlYXJjaC1zdGF0ZSBhbmQgcm90YXRpb24gb25seSBpZiBsYXlvdXQtc3dpdGNoXG4gICAgaWYgKCFsYXlvdXRTd2l0Y2gpIHtcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gbnVsbDtcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMucm90YXRpb24ubmV4dCgwKTtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5yZXNldCgpO1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFkZFNpbmdsZUNsaWNrSGFuZGxlcih0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcik7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UuYWRkRG91YmxlQ2xpY2tIYW5kbGVyKHRoaXMuZGJsQ2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdhbmltYXRpb24tZmluaXNoJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWNsaWNrJywgdGhpcy5jbGlja1NlcnZpY2UuY2xpY2spO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoXG4gICAgICAnY2FudmFzLWRvdWJsZS1jbGljaycsXG4gICAgICAoZTogYW55KSA9PiAoZS5wcmV2ZW50RGVmYXVsdEFjdGlvbiA9IHRydWUpXG4gICAgKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcHJlc3MnLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiA9IGUucG9zaXRpb247XG4gICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZC5uZXh0KHRydWUpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1yZWxlYXNlJywgKCkgPT5cbiAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkLm5leHQoZmFsc2UpXG4gICAgKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcGluY2gnLCB0aGlzLnBpbmNoSGFuZGxlcik7XG5cbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZycsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZHJhZ1N0YXR1cyA9IHRydWU7XG4gICAgICB0aGlzLmRyYWdIYW5kbGVyKGUpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1kcmFnLWVuZCcsIChlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyYWdTdGF0dXMpIHtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50Q2FudmFzKCk7XG4gICAgICAgIHRoaXMuc3dpcGVUb0NhbnZhc0dyb3VwKGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmFnU3RhdHVzID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignYW5pbWF0aW9uJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgfSk7XG4gIH1cblxuICB6b29tSW4oem9vbUZhY3Rvcj86IG51bWJlciwgcG9zaXRpb24/OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21Jbih6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gIH1cblxuICB6b29tT3V0KHpvb21GYWN0b3I/OiBudW1iZXIsIHBvc2l0aW9uPzogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHJvdGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdlci51c2VDYW52YXMpIHtcbiAgICAgICAgdGhpcy5yb3RhdGVUb1JpZ2h0KCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEhpdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93Um90YXRpb25Jc05vdFN1cHBvcnRldE1lc3NhZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgZm9yIG1vZGUtY2hhbmdlXG4gICAqIEBwYXJhbSBtb2RlIFZpZXdlck1vZGVcbiAgICovXG4gIG1vZGVDaGFuZ2VkKG1vZGU6IE1vZGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZpZXdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvRGFzaGJvYXJkKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy52aWV3ZXIucGFuVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlVG9QYWdlKCk7XG4gICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgIH0gZWxzZSBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzZXRLZXlEb3duSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBEQVNIQk9BUkQtbW9kZSwgcmVwb3NpdGlvbnMgY2FudmFzIGdyb3VwIGFuZCByZW1vdmVzIG1heC13aWR0aCBvbiB2aWV3ZXJcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9EYXNoYm9hcmQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmhpZGUoKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5EQVNIQk9BUkQpO1xuICAgIHRoaXMuem9vbVN0cmF0ZWd5LmdvVG9Ib21lWm9vbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRvIFBBR0UtbW9kZSwgY2VudGVycyBjdXJyZW50IGNhbnZhcyBncm91cCBhbmQgcmVwb3NpdGlvbnMgb3RoZXIgY2FudmFzIGdyb3Vwc1xuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVUb1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhc1NlcnZpY2UuaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLnNob3coKTtcblxuICAgIHRoaXMuem9vbVN0cmF0ZWd5LnNldE1pblpvb20oVmlld2VyTW9kZS5QQUdFKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwtaGFuZGxlclxuICAgKi9cbiAgc2Nyb2xsSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IE1hdGgucG93KFZpZXdlck9wdGlvbnMuem9vbS56b29tRmFjdG9yLCBldmVudC5zY3JvbGwpO1xuICAgIC8vIFNjcm9sbGluZyB1cFxuICAgIGlmIChldmVudC5zY3JvbGwgPiAwKSB7XG4gICAgICB0aGlzLnpvb21Jbkdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgICAgLy8gU2Nyb2xsaW5nIGRvd25cbiAgICB9IGVsc2UgaWYgKGV2ZW50LnNjcm9sbCA8IDApIHtcbiAgICAgIHRoaXMuem9vbU91dEdlc3R1cmUoZXZlbnQucG9zaXRpb24sIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUGluY2gtaGFuZGxlclxuICAgKi9cbiAgcGluY2hIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICB0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IGV2ZW50LmRpc3RhbmNlIC8gZXZlbnQubGFzdERpc3RhbmNlO1xuICAgIC8vIFBpbmNoIE91dFxuICAgIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlID5cbiAgICAgIGV2ZW50Lmxhc3REaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGRcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbUluUGluY2hHZXN0dXJlKGV2ZW50LCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFBpbmNoIEluXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGV2ZW50LmRpc3RhbmNlICsgVmlld2VyT3B0aW9ucy56b29tLnBpbmNoWm9vbVRocmVzaG9sZCA8XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2VcbiAgICApIHtcbiAgICAgIHRoaXMuem9vbU91dFBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnQgdG8gem9vbSB0by4gSWYgbm90IHNldCwgdGhlIHZpZXdlciB3aWxsIHpvb20gdG8gY2VudGVyXG4gICAqL1xuICB6b29tSW5HZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgem9vbU91dEdlc3R1cmUocG9zaXRpb246IFBvaW50LCB6b29tRmFjdG9yPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21PdXQoem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHpvb20gaW4gcGluY2ggZ2VzdHVyZSAocGluY2ggb3V0KVxuICAgKlxuICAgKiBUb2dnbGUgdG8gcGFnZSBtb2RlIGFuZCBab29tIGluXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBmcm9tIHBpbmNoIGdlc3R1cmVcbiAgICovXG4gIHpvb21JblBpbmNoR2VzdHVyZShldmVudDogYW55LCB6b29tRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnpvb21Jbih6b29tRmFjdG9yLCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uIHx8IGV2ZW50LmNlbnRlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgem9vbSBvdXQgcGluY2ggZ2VzdHVyZSAocGluY2ggaW4pXG4gICAqXG4gICAqIFpvb20gb3V0IGFuZCB0b2dnbGUgdG8gZGFzaGJvYXJkIHdoZW4gYWxsIHpvb21lZCBvdXQuXG4gICAqIFN0b3AgYmV0d2VlbiB6b29taW5nIG91dCBhbmQgdG9nZ2xpbmcgdG8gZGFzaGJvYXJkLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZnJvbSBwaW5jaCBnZXN0dXJlXG4gICAqL1xuICB6b29tT3V0UGluY2hHZXN0dXJlKGV2ZW50OiBhbnksIHpvb21GYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGdlc3R1cmVJZCA9IGV2ZW50Lmdlc3R1cmVQb2ludHNbMF0uaWQ7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCA9IHRydWU7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIGV2ZW50LmNlbnRlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wIHx8XG4gICAgICAgIGdlc3R1cmVJZCA9PT0gdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCArIDJcbiAgICAgICkge1xuICAgICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnByZXZpb3VzR2VzdHVyZUlkID0gZ2VzdHVyZUlkO1xuICAgIH1cbiAgfVxuXG4gIGdvVG9Ib21lWm9vbSgpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW5nbGUtY2xpY2staGFuZGxlclxuICAgKiBTaW5nbGUtY2xpY2sgdG9nZ2xlcyBiZXR3ZWVuIHBhZ2UvZGFzaGJvYXJkLW1vZGUgaWYgYSBwYWdlIGlzIGhpdFxuICAgKi9cbiAgc2luZ2xlQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCB0aWxlSW5kZXggPSB0aGlzLmdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KHRpbGVJbmRleCk7XG4gICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRDYW52YXNHcm91cCh0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Q2VudGVyKHRydWUpKTtcbiAgICB9XG4gICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERvdWJsZS1jbGljay1oYW5kbGVyXG4gICAqIERvdWJsZS1jbGljayBkYXNoYm9hcmQtbW9kZSBzaG91bGQgZ28gdG8gcGFnZS1tb2RlXG4gICAqIERvdWJsZS1jbGljayBwYWdlLW1vZGUgc2hvdWxkXG4gICAqICAgIGEpIFpvb20gaW4gaWYgcGFnZSBpcyBmaXR0ZWQgdmVydGljYWxseSwgb3JcbiAgICogICAgYikgRml0IHZlcnRpY2FsbHkgaWYgcGFnZSBpcyBhbHJlYWR5IHpvb21lZCBpblxuICAgKi9cbiAgZGJsQ2xpY2tIYW5kbGVyID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAvLyBQYWdlIGlzIGZpdHRlZCB2ZXJ0aWNhbGx5LCBzbyBkYmwtY2xpY2sgem9vbXMgaW5cbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oXG4gICAgICAgIFZpZXdlck9wdGlvbnMuem9vbS5kYmxDbGlja1pvb21GYWN0b3IsXG4gICAgICAgIGV2ZW50LnBvc2l0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgICBjb25zdCBjYW52YXNJbmRleDogbnVtYmVyID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudChldmVudCk7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID1cbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoY2FudmFzSW5kZXgpO1xuICAgICAgaWYgKHJlcXVlc3RlZENhbnZhc0dyb3VwSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSByZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaGl0IGVsZW1lbnQgaXMgYSA8cmVjdD4tZWxlbWVudFxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBpc0NhbnZhc0dyb3VwSGl0KHRhcmdldDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgU1ZHUmVjdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGlsZXNvdXJjZXMgYW5kIGFkZHMgdGhlbSB0byB2aWV3ZXJcbiAgICogQ3JlYXRlcyBzdmcgY2xpY2thYmxlIG92ZXJsYXlzIGZvciBlYWNoIHRpbGVcbiAgICovXG4gIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICBjb25zdCBjYW52YXNSZWN0czogUmVjdFtdID0gW107XG4gICAgY29uc3QgY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5ID1cbiAgICAgIENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25GYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCxcbiAgICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWQsXG4gICAgICAgIHRoaXMuY29uZmlnXG4gICAgICApO1xuXG4gICAgY29uc3QgaXNUd29QYWdlVmlldzogYm9vbGVhbiA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgY29uc3Qgcm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCk7XG4gICAgbGV0IGdyb3VwOiBhbnkgPSB0aGlzLnN2Z05vZGUuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncGFnZS1ncm91cCcpO1xuXG4gICAgdGhpcy50aWxlU291cmNlcy5mb3JFYWNoKCh0aWxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9XG4gICAgICAgIGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneS5jYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGksXG4gICAgICAgICAgICBjYW52YXNTb3VyY2U6IHRpbGUsXG4gICAgICAgICAgICBwcmV2aW91c0NhbnZhc0dyb3VwUG9zaXRpb246IGNhbnZhc1JlY3RzW2kgLSAxXSxcbiAgICAgICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvdGF0aW9uXG4gICAgICAgICk7XG5cbiAgICAgIGNhbnZhc1JlY3RzLnB1c2gocG9zaXRpb24pO1xuXG4gICAgICBjb25zdCB0aWxlU291cmNlU3RyYXRlZ3kgPSBUaWxlU291cmNlU3RyYXRlZ3lGYWN0b3J5LmNyZWF0ZSh0aWxlKTtcbiAgICAgIGNvbnN0IHRpbGVTb3VyY2UgPSB0aWxlU291cmNlU3RyYXRlZ3kuZ2V0VGlsZVNvdXJjZSh0aWxlKTtcblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3Qgcm90YXRlZCA9IHJvdGF0aW9uID09PSA5MCB8fCByb3RhdGlvbiA9PT0gMjcwO1xuXG4gICAgICAgIGxldCBib3VuZHM7XG5cbiAgICAgICAgLyogQmVjYXVzZSBpbWFnZSBzY2FsaW5nIGlzIHBlcmZvcm1lZCBiZWZvcmUgcm90YXRpb24sXG4gICAgICAgICAqIHdlIG11c3QgaW52ZXJ0IHdpZHRoICYgaGVpZ2h0IGFuZCB0cmFuc2xhdGUgcG9zaXRpb24gc28gdGhhdCB0aWxlIHJvdGF0aW9uIGVuZHMgdXAgY29ycmVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHJvdGF0ZWQpIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCArIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24ueSAtIChwb3NpdGlvbi53aWR0aCAtIHBvc2l0aW9uLmhlaWdodCkgLyAyLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0LFxuICAgICAgICAgICAgcG9zaXRpb24ud2lkdGhcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdW5kcyA9IG5ldyBPcGVuU2VhZHJhZ29uLlJlY3QoXG4gICAgICAgICAgICBwb3NpdGlvbi54LFxuICAgICAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoLFxuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld2VyLmFkZFRpbGVkSW1hZ2Uoe1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHRpbGVTb3VyY2U6IHRpbGVTb3VyY2UsXG4gICAgICAgICAgZml0Qm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgZGVncmVlczogcm90YXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3ICYmIGkgJSAyICE9PSAwKSB7XG4gICAgICAgIGdyb3VwID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE92ZXJsYXkgPSBncm91cFxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBwb3NpdGlvbi54KVxuICAgICAgICAuYXR0cigneScsIHBvc2l0aW9uLnkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHBvc2l0aW9uLndpZHRoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgcG9zaXRpb24uaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndGlsZScpO1xuXG4gICAgICAvLyBNYWtlIGN1c3RvbSBib3JkZXJzIGlmIGN1cnJlbnQgbGF5b3V0IGlzIHR3by1wYWdlZFxuICAgICAgaWYgKGlzVHdvUGFnZVZpZXcpIHtcbiAgICAgICAgaWYgKGkgJSAyID09PSAwICYmIGkgIT09IDApIHtcbiAgICAgICAgICBjb25zdCBub0xlZnRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBOdW1iZXIocG9zaXRpb24ud2lkdGggKiAyICsgcG9zaXRpb24uaGVpZ2h0KSArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICogMjtcbiAgICAgICAgICBjdXJyZW50T3ZlcmxheS5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsIG5vTGVmdFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpICUgMiAhPT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9SaWdodFN0cm9rZVN0eWxlID1cbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgcG9zaXRpb24uaGVpZ2h0ICtcbiAgICAgICAgICAgICcsICcgK1xuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub1JpZ2h0U3Ryb2tlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5Tm9kZTogU1ZHUmVjdEVsZW1lbnQgPSBjdXJyZW50T3ZlcmxheS5ub2RlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlzW2ldID0gY3VycmVudE92ZXJsYXlOb2RlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGF5b3V0ID1cbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSB8fFxuICAgICAgIXRoaXMuaXNNYW5pZmVzdFBhZ2VkXG4gICAgICAgID8gVmlld2VyTGF5b3V0Lk9ORV9QQUdFXG4gICAgICAgIDogVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIHRoaXMuY2FudmFzU2VydmljZS5hZGRBbGwoY2FudmFzUmVjdHMsIGxheW91dCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2aWV3ZXIgc2l6ZSBhbmQgb3BhY2l0eSBvbmNlIHRoZSBmaXJzdCBjYW52YXMgZ3JvdXAgaGFzIGZ1bGx5IGxvYWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsQ2FudmFzR3JvdXBMb2FkZWQoKTogdm9pZCB7XG4gICAgdGhpcy5ob21lKCk7XG4gICAgdGhpcy5jYW52YXNHcm91cE1hc2suaW5pdGlhbGl6ZShcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCksXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgIT09IFZpZXdlck1vZGUuREFTSEJPQVJEXG4gICAgKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGQzLnNlbGVjdCh0aGlzLnZpZXdlci5jb250YWluZXIucGFyZW50Tm9kZSlcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAnMScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG92ZXJsYXktaW5kZXggZm9yIGNsaWNrLWV2ZW50IGlmIGhpdFxuICAgKiBAcGFyYW0gdGFyZ2V0IGhpdCA8cmVjdD5cbiAgICovXG4gIGdldE92ZXJsYXlJbmRleEZyb21DbGlja0V2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldE9yaWdpbmFsVGFyZ2V0KGV2ZW50KTtcbiAgICBpZiAodGhpcy5pc0NhbnZhc0dyb3VwSGl0KHRhcmdldCkpIHtcbiAgICAgIGNvbnN0IHJlcXVlc3RlZENhbnZhc0dyb3VwOiBudW1iZXIgPSB0aGlzLm92ZXJsYXlzLmluZGV4T2YodGFyZ2V0KTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cCA+PSAwKSB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0ZWRDYW52YXNHcm91cDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAoY2VudGVyOiBQb2ludCkge1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID1cbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDbG9zZXN0Q2FudmFzR3JvdXBJbmRleChjZW50ZXIpO1xuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXgubmV4dChjdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmFnSGFuZGxlciA9IChlOiBhbnkpID0+IHtcbiAgICB0aGlzLnZpZXdlci5wYW5Ib3Jpem9udGFsID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID1cbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICAgIGNvbnN0IHZwQm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuICAgICAgY29uc3QgcGFubmVkUGFzdENhbnZhc0dyb3VwID1cbiAgICAgICAgU3dpcGVVdGlscy5nZXRTaWRlSWZQYW5uaW5nUGFzdEVuZE9mQ2FudmFzR3JvdXAoXG4gICAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICAgIHZwQm91bmRzXG4gICAgICAgICk7XG4gICAgICBjb25zdCBkaXJlY3Rpb246IG51bWJlciA9IGUuZGlyZWN0aW9uO1xuICAgICAgaWYgKFxuICAgICAgICAocGFubmVkUGFzdENhbnZhc0dyb3VwID09PSBTaWRlLkxFRlQgJiZcbiAgICAgICAgICBTd2lwZVV0aWxzLmlzRGlyZWN0aW9uSW5SaWdodFNlbWljaXJjbGUoZGlyZWN0aW9uKSkgfHxcbiAgICAgICAgKHBhbm5lZFBhc3RDYW52YXNHcm91cCA9PT0gU2lkZS5SSUdIVCAmJlxuICAgICAgICAgIFN3aXBlVXRpbHMuaXNEaXJlY3Rpb25JbkxlZnRTZW1pY2lyY2xlKGRpcmVjdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy52aWV3ZXIucGFuSG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGNvbnN0cmFpbnRDYW52YXMoKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIGNvbnN0IHZpZXdwb3J0Qm91bmRzOiBSZWN0ID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kcygpO1xuICAgICAgY29uc3QgY3VycmVudENhbnZhc0JvdW5kcyA9IHRoaXMuZ2V0Q3VycmVudENhbnZhc0JvdW5kcygpO1xuICAgICAgdGhpcy5pc0NhbnZhc091dHNpZGVWaWV3cG9ydCh2aWV3cG9ydEJvdW5kcywgY3VycmVudENhbnZhc0JvdW5kcylcbiAgICAgICAgPyB0aGlzLmNvbnN0cmFpbnRDYW52YXNPdXRzaWRlVmlld3BvcnQoXG4gICAgICAgICAgICB2aWV3cG9ydEJvdW5kcyxcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNCb3VuZHNcbiAgICAgICAgICApXG4gICAgICAgIDogdGhpcy5jb25zdHJhaW50Q2FudmFzSW5zaWRlVmlld3BvcnQodmlld3BvcnRCb3VuZHMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VycmVudENhbnZhc0JvdW5kcygpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy52aWV3ZXIud29ybGRcbiAgICAgIC5nZXRJdGVtQXQodGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4KVxuICAgICAgLmdldEJvdW5kcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NhbnZhc091dHNpZGVWaWV3cG9ydChcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZpZXdwb3J0Qm91bmRzLmhlaWdodCA8IGNhbnZhc0JvdW5kcy5oZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbnN0cmFpbnRDYW52YXNPdXRzaWRlVmlld3BvcnQoXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IHZvaWQge1xuICAgIGxldCByZWN0OiBSZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLmlzQ2FudmFzQmVsb3dWaWV3cG9ydFRvcCh2aWV3cG9ydEJvdW5kcywgY2FudmFzQm91bmRzKSkge1xuICAgICAgcmVjdCA9IG5ldyBSZWN0KHtcbiAgICAgICAgeDogdmlld3BvcnRCb3VuZHMueCArIHZpZXdwb3J0Qm91bmRzLndpZHRoIC8gMixcbiAgICAgICAgeTogY2FudmFzQm91bmRzLnkgKyB2aWV3cG9ydEJvdW5kcy5oZWlnaHQgLyAyLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ2FudmFzQWJvdmVWaWV3cG9ydEJvdHRvbSh2aWV3cG9ydEJvdW5kcywgY2FudmFzQm91bmRzKSkge1xuICAgICAgcmVjdCA9IG5ldyBSZWN0KHtcbiAgICAgICAgeDogdmlld3BvcnRCb3VuZHMueCArIHZpZXdwb3J0Qm91bmRzLndpZHRoIC8gMixcbiAgICAgICAgeTogY2FudmFzQm91bmRzLnkgKyBjYW52YXNCb3VuZHMuaGVpZ2h0IC0gdmlld3BvcnRCb3VuZHMuaGVpZ2h0IC8gMixcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnBhblRvKHJlY3QsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25zdHJhaW50Q2FudmFzSW5zaWRlVmlld3BvcnQodmlld3BvcnRCb3VuZHM6IFJlY3QpOiB2b2lkIHtcbiAgICBjb25zdCBjYW52YXNHcm91cFJlY3QgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzR3JvdXBSZWN0KFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgKTtcbiAgICBjb25zdCByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgeDogdmlld3BvcnRCb3VuZHMueCArIHZpZXdwb3J0Qm91bmRzLndpZHRoIC8gMixcbiAgICAgIHk6IGNhbnZhc0dyb3VwUmVjdC5jZW50ZXJZLFxuICAgIH0pO1xuICAgIHRoaXMucGFuVG8ocmVjdCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2FudmFzQmVsb3dWaWV3cG9ydFRvcChcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZpZXdwb3J0Qm91bmRzLnkgPCBjYW52YXNCb3VuZHMueTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDYW52YXNBYm92ZVZpZXdwb3J0Qm90dG9tKFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgY2FudmFzQm91bmRzLnkgKyBjYW52YXNCb3VuZHMuaGVpZ2h0IDxcbiAgICAgIHZpZXdwb3J0Qm91bmRzLnkgKyB2aWV3cG9ydEJvdW5kcy5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzd2lwZVRvQ2FudmFzR3JvdXAoZTogYW55KSB7XG4gICAgLy8gRG9uJ3Qgc3dpcGUgb24gcGluY2ggYWN0aW9uc1xuICAgIGlmICh0aGlzLnBpbmNoU3RhdHVzLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWVkOiBudW1iZXIgPSBlLnNwZWVkO1xuICAgIGNvbnN0IGRyYWdFbmRQb3Npc2lvbiA9IGUucG9zaXRpb247XG5cbiAgICBjb25zdCBjYW52YXNHcm91cFJlY3Q6IFJlY3QgPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbjogRGlyZWN0aW9uID0gU3dpcGVVdGlscy5nZXRTd2lwZURpcmVjdGlvbihcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24sXG4gICAgICBkcmFnRW5kUG9zaXNpb24sXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIgPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICAgIGNvbnN0IGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5ID1cbiAgICAgIENhbGN1bGF0ZU5leHRDYW52YXNHcm91cEZhY3RvcnkuY3JlYXRlKHRoaXMubW9kZVNlcnZpY2UubW9kZSk7XG5cbiAgICBsZXQgcGFubmVkUGFzdFNpZGU6IFNpZGUgfCBudWxsO1xuICAgIGxldCBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBwYW5uZWRQYXN0U2lkZSA9IFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICBjYW52YXNHcm91cFJlY3QsXG4gICAgICAgIHZpZXdwb3J0Qm91bmRzXG4gICAgICApO1xuICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmFkZEhpdChwYW5uZWRQYXN0U2lkZSwgZGlyZWN0aW9uKTtcbiAgICAgIGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkID1cbiAgICAgICAgdGhpcy5zd2lwZURyYWdFbmRDb3VudGVyLmhpdENvdW50UmVhY2hlZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0NhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY29uc3RyYWluVG9SYW5nZShcbiAgICAgIGNhbGN1bGF0ZU5leHRDYW52YXNHcm91cFN0cmF0ZWd5LmNhbGN1bGF0ZU5leHRDYW52YXNHcm91cCh7XG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cENlbnRlcjogdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKSxcbiAgICAgICAgc3BlZWQ6IHNwZWVkLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IGN1cnJlbnRDYW52YXNHcm91cEluZGV4LFxuICAgICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZDogY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQsXG4gICAgICAgIHZpZXdpbmdEaXJlY3Rpb246IHRoaXMubWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgKGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkICYmIGRpcmVjdGlvbilcbiAgICApIHtcbiAgICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgICAgY2FudmFzR3JvdXBJbmRleDogbmV3Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld3BvcnRCb3VuZHMoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRCb3VuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JpZ2luYWxUYXJnZXQoZXZlbnQ6IGFueSkge1xuICAgIHJldHVybiBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgPyBldmVudC5vcmlnaW5hbFRhcmdldFxuICAgICAgOiBldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgfVxuXG4gIHByaXZhdGUgcGFuVG8ocmVjdDogUmVjdCB8IHVuZGVmaW5lZCwgaW1tZWRpYXRlbHkgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChyZWN0KSB7XG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5wYW5UbyhcbiAgICAgICAge1xuICAgICAgICAgIHg6IHJlY3QueCxcbiAgICAgICAgICB5OiByZWN0LnksXG4gICAgICAgIH0sXG4gICAgICAgIGltbWVkaWF0ZWx5XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcm90YXRlVG9SaWdodCgpIHtcbiAgICB0aGlzLnJvdGF0aW9uLm5leHQoKHRoaXMucm90YXRpb24uZ2V0VmFsdWUoKSArIDkwKSAlIDM2MCk7XG4gIH1cblxuICBwcml2YXRlIHNob3dSb3RhdGlvbklzTm90U3VwcG9ydGV0TWVzc2FnZSgpIHtcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW4odGhpcy5pbnRsLnJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQsIHVuZGVmaW5lZCwge1xuICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wYWNpdHlPblBhZ2VzKG9wYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgY29uc3QgaXRlbUNvdW50ID0gdGhpcy52aWV3ZXIud29ybGQuZ2V0SXRlbUNvdW50KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1Db3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnZpZXdlci53b3JsZC5nZXRJdGVtQXQoaSk7XG4gICAgICAgIGl0ZW0uc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, Subject, Subscription, interval, } from 'rxjs';
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
        this.id = 'ngx-mime-mimeViewer';
        this.openseadragonId = 'openseadragon';
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
        this.id = this.generateRandomId('ngx-mime-mimeViewer');
        this.openseadragonId = this.generateRandomId('openseadragon');
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
    setConfig(config) {
        this.config = config;
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
                for (const highlightRect of hit.highlightRects) {
                    const canvasRect = this.canvasService.getCanvasRect(highlightRect.canvasIndex);
                    if (canvasRect) {
                        const currentHitStrokeOffset = 8;
                        let width = highlightRect.width + currentHitStrokeOffset;
                        let height = highlightRect.height + currentHitStrokeOffset;
                        let x = canvasRect.x - currentHitStrokeOffset / 2;
                        let y = canvasRect.y - currentHitStrokeOffset / 2;
                        /* hit rect are relative to each unrotated page canvasRect so x,y must be adjusted by the remaining space */
                        switch (rotation) {
                            case 0:
                                x += highlightRect.x;
                                y += highlightRect.y;
                                break;
                            case 90:
                                x += canvasRect.width - highlightRect.y - highlightRect.height;
                                y += highlightRect.x;
                                /* Flip height & width */
                                width = highlightRect.height + currentHitStrokeOffset;
                                height = highlightRect.width + currentHitStrokeOffset;
                                break;
                            case 180:
                                x += canvasRect.width - (highlightRect.x + highlightRect.width);
                                y += canvasRect.height - (highlightRect.y + highlightRect.height);
                                break;
                            case 270:
                                x += highlightRect.y;
                                y += canvasRect.height - highlightRect.x - highlightRect.width;
                                /* Flip height & width */
                                width = highlightRect.height + currentHitStrokeOffset;
                                height = highlightRect.width + currentHitStrokeOffset;
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
                this.viewer = new OpenSeadragon.Viewer(OptionsFactory.create(this.openseadragonId, this.config));
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
    generateRandomId(prefix) {
        const randomString = Math.random().toString(16).slice(2);
        return `${prefix}-${randomString}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFDTCxlQUFlLEVBRWYsT0FBTyxFQUNQLFlBQVksRUFDWixRQUFRLEdBQ1QsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFHdkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRzdFLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSxXQUFXLENBQUM7QUFHbkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUt6RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEMsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFD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amVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIGludGVydmFsLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzYW1wbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9jYW52YXMtZ3JvdXAtcG9zaXRpb24vY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9jbGljay1zZXJ2aWNlL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnT3ZlcmxheSB9IGZyb20gJy4uL2V4dC9zdmctb3ZlcmxheSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2ludGwnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQge1xuICBNb2RlQ2hhbmdlcyxcbiAgUmVjb2duaXplZFRleHRNb2RlLFxuICBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLFxufSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2RpcmVjdGlvbic7XG5pbXBvcnQgeyBNYW5pZmVzdCwgUmVzb3VyY2UgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgUGluY2hTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcGluY2hTdGF0dXMnO1xuaW1wb3J0IHsgU2lkZSB9IGZyb20gJy4uL21vZGVscy9zaWRlJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi8uLi9tb2RlbHMvcG9pbnQnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5IH0gZnJvbSAnLi9jYWxjdWxhdGUtbmV4dC1jYW52YXMtZ3JvdXAtZmFjdG9yeSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE1hc2sgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1tYXNrJztcbmltcG9ydCB7XG4gIERlZmF1bHRHb1RvQ2FudmFzR3JvdXBTdHJhdGVneSxcbiAgR29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3ksXG59IGZyb20gJy4vZ28tdG8tY2FudmFzLWdyb3VwLXN0cmF0ZWd5JztcbmltcG9ydCB7IE9wdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9vcHRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgU3dpcGVEcmFnRW5kQ291bnRlciB9IGZyb20gJy4vc3dpcGUtZHJhZy1lbmQtY291bnRlcic7XG5pbXBvcnQgeyBTd2lwZVV0aWxzIH0gZnJvbSAnLi9zd2lwZS11dGlscyc7XG5pbXBvcnQgeyBUaWxlU291cmNlU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi90aWxlLXNvdXJjZS1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IERlZmF1bHRab29tU3RyYXRlZ3ksIFpvb21TdHJhdGVneSB9IGZyb20gJy4vem9vbS1zdHJhdGVneSc7XG5cbmRlY2xhcmUgY29uc3QgT3BlblNlYWRyYWdvbjogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld2VyU2VydmljZSB7XG4gIGNvbmZpZyE6IE1pbWVWaWV3ZXJDb25maWc7XG4gIHByaXZhdGUgdmlld2VyPzogYW55O1xuICBwcml2YXRlIHN2Z092ZXJsYXk6IGFueTtcbiAgcHJpdmF0ZSBzdmdOb2RlOiBhbnk7XG5cbiAgcHJpdmF0ZSBvdmVybGF5czogQXJyYXk8U1ZHUmVjdEVsZW1lbnQ+ID0gW107XG4gIHByaXZhdGUgdGlsZVNvdXJjZXM6IEFycmF5PFJlc291cmNlPiA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgcHVibGljIGlzQ2FudmFzUHJlc3NlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgZmFsc2VcbiAgKTtcblxuICBwcml2YXRlIGN1cnJlbnRDZW50ZXI6IFN1YmplY3Q8UG9pbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50Q2FudmFzSW5kZXg6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgcHJpdmF0ZSBjdXJyZW50SGl0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvc2RJc1JlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgc3dpcGVEcmFnRW5kQ291bnRlciA9IG5ldyBTd2lwZURyYWdFbmRDb3VudGVyKCk7XG4gIHByaXZhdGUgY2FudmFzR3JvdXBNYXNrITogQ2FudmFzR3JvdXBNYXNrO1xuICBwcml2YXRlIHBpbmNoU3RhdHVzID0gbmV3IFBpbmNoU3RhdHVzKCk7XG4gIHByaXZhdGUgZHJhZ1N0YXJ0UG9zaXRpb246IGFueTtcbiAgcHJpdmF0ZSBtYW5pZmVzdCE6IE1hbmlmZXN0O1xuICBwcml2YXRlIGlzTWFuaWZlc3RQYWdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRLZXlEb3duSGFuZGxlcjogYW55O1xuXG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB6b29tU3RyYXRlZ3khOiBab29tU3RyYXRlZ3k7XG4gIHByaXZhdGUgZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3khOiBHb1RvQ2FudmFzR3JvdXBTdHJhdGVneTtcblxuICBwcml2YXRlIHJvdGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgZHJhZ1N0YXR1cyA9IGZhbHNlO1xuICBwdWJsaWMgaWQgPSAnbmd4LW1pbWUtbWltZVZpZXdlcic7XG4gIHB1YmxpYyBvcGVuc2VhZHJhZ29uSWQgPSAnb3BlbnNlYWRyYWdvbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIGludGw6IE1pbWVWaWV3ZXJJbnRsXG4gICkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmdlbmVyYXRlUmFuZG9tSWQoJ25neC1taW1lLW1pbWVWaWV3ZXInKTtcbiAgICB0aGlzLm9wZW5zZWFkcmFnb25JZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21JZCgnb3BlbnNlYWRyYWdvbicpO1xuICB9XG5cbiAgZ2V0IG9uUm90YXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbi5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2VudGVyQ2hhbmdlKCk6IE9ic2VydmFibGU8UG9pbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2VudGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uT3NkUmVhZHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3NkSXNSZWFkeS5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgcHVibGljIGdldFZpZXdlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpZXdlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaWxlc291cmNlcygpOiBSZXNvdXJjZVtdIHtcbiAgICByZXR1cm4gdGhpcy50aWxlU291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRPdmVybGF5cygpOiBTVkdSZWN0RWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cztcbiAgfVxuXG4gIHB1YmxpYyBnZXRab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5ab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1pblpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVN0cmF0ZWd5LmdldE1heFpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBob21lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vc2RJc1JlYWR5LmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuc2V0TWluWm9vbSh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUpO1xuXG4gICAgdGhpcy5nb1RvQ2FudmFzR3JvdXBTdHJhdGVneS5jZW50ZXJDdXJyZW50Q2FudmFzKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzSW5kZXguZ2V0VmFsdWUoKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub05leHRDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9OZXh0Q2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmN1cnJlbnRDYW52YXNJbmRleC5nZXRWYWx1ZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvQ2FudmFzR3JvdXAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyLCBpbW1lZGlhdGVseTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhbnZhcyhjYW52YXNJbmRleDogbnVtYmVyLCBpbW1lZGlhdGVseTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoY2FudmFzSW5kZXgpO1xuICAgIHRoaXMuZ29Ub0NhbnZhc0dyb3VwU3RyYXRlZ3kuZ29Ub0NhbnZhc0dyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IGNhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogaW1tZWRpYXRlbHksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0KHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZ2h0bGlnaHQoKTtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGlmIChzZWFyY2hSZXN1bHQucSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2hSZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBzZWFyY2hSZXN1bHQuaGl0cykge1xuICAgICAgICBmb3IgKGNvbnN0IGhpZ2hsaWdodFJlY3Qgb2YgaGl0LmhpZ2hsaWdodFJlY3RzKSB7XG4gICAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNSZWN0KGhpZ2hsaWdodFJlY3QuY2FudmFzSW5kZXgpO1xuICAgICAgICAgIGlmIChjYW52YXNSZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0ID0gODtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGhpZ2hsaWdodFJlY3Qud2lkdGggKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IGhpZ2hsaWdodFJlY3QuaGVpZ2h0ICsgY3VycmVudEhpdFN0cm9rZU9mZnNldDtcbiAgICAgICAgICAgIGxldCB4ID0gY2FudmFzUmVjdC54IC0gY3VycmVudEhpdFN0cm9rZU9mZnNldCAvIDI7XG4gICAgICAgICAgICBsZXQgeSA9IGNhbnZhc1JlY3QueSAtIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQgLyAyO1xuXG4gICAgICAgICAgICAvKiBoaXQgcmVjdCBhcmUgcmVsYXRpdmUgdG8gZWFjaCB1bnJvdGF0ZWQgcGFnZSBjYW52YXNSZWN0IHNvIHgseSBtdXN0IGJlIGFkanVzdGVkIGJ5IHRoZSByZW1haW5pbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHN3aXRjaCAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggKz0gaGlnaGxpZ2h0UmVjdC54O1xuICAgICAgICAgICAgICAgIHkgKz0gaGlnaGxpZ2h0UmVjdC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgeCArPSBjYW52YXNSZWN0LndpZHRoIC0gaGlnaGxpZ2h0UmVjdC55IC0gaGlnaGxpZ2h0UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgeSArPSBoaWdobGlnaHRSZWN0Lng7XG4gICAgICAgICAgICAgICAgLyogRmxpcCBoZWlnaHQgJiB3aWR0aCAqL1xuICAgICAgICAgICAgICAgIHdpZHRoID0gaGlnaGxpZ2h0UmVjdC5oZWlnaHQgKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IGhpZ2hsaWdodFJlY3Qud2lkdGggKyBjdXJyZW50SGl0U3Ryb2tlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTgwOlxuICAgICAgICAgICAgICAgIHggKz0gY2FudmFzUmVjdC53aWR0aCAtIChoaWdobGlnaHRSZWN0LnggKyBoaWdobGlnaHRSZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gKGhpZ2hsaWdodFJlY3QueSArIGhpZ2hsaWdodFJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI3MDpcbiAgICAgICAgICAgICAgICB4ICs9IGhpZ2hsaWdodFJlY3QueTtcbiAgICAgICAgICAgICAgICB5ICs9IGNhbnZhc1JlY3QuaGVpZ2h0IC0gaGlnaGxpZ2h0UmVjdC54IC0gaGlnaGxpZ2h0UmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICAvKiBGbGlwIGhlaWdodCAmIHdpZHRoICovXG4gICAgICAgICAgICAgICAgd2lkdGggPSBoaWdobGlnaHRSZWN0LmhlaWdodCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gaGlnaGxpZ2h0UmVjdC53aWR0aCArIGN1cnJlbnRIaXRTdHJva2VPZmZzZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5OiBTVkdSZWN0RWxlbWVudCA9IHRoaXMuc3ZnTm9kZVxuICAgICAgICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgLmF0dHIoJ21pbWVIaXRJbmRleCcsIGhpdC5pZClcbiAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4KVxuICAgICAgICAgICAgICAuYXR0cigneScsIHkpXG4gICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWdobGlnaHRDdXJyZW50SGl0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoYGcgPiByZWN0LnNlbGVjdGVkYCkuYXR0cignY2xhc3MnLCAnaGl0Jyk7XG4gICAgICB0aGlzLnN2Z05vZGVcbiAgICAgICAgLnNlbGVjdEFsbChgZyA+IHJlY3RbbWltZUhpdEluZGV4PScke3RoaXMuY3VycmVudEhpdC5pZH0nXWApXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaXQgc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJIaWdodGxpZ2h0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN2Z05vZGUpIHtcbiAgICAgIHRoaXMuc3ZnTm9kZS5zZWxlY3RBbGwoJy5oaXQnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0VXBWaWV3ZXIobWFuaWZlc3Q6IE1hbmlmZXN0LCBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC50aWxlU291cmNlKSB7XG4gICAgICB0aGlzLnRpbGVTb3VyY2VzID0gbWFuaWZlc3QudGlsZVNvdXJjZTtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgdGhpcy5pc01hbmlmZXN0UGFnZWQgPSBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZCh0aGlzLm1hbmlmZXN0KTtcbiAgICAgICAgdGhpcy52aWV3ZXIgPSBuZXcgT3BlblNlYWRyYWdvbi5WaWV3ZXIoXG4gICAgICAgICAgT3B0aW9uc0ZhY3RvcnkuY3JlYXRlKHRoaXMub3BlbnNlYWRyYWdvbklkLCB0aGlzLmNvbmZpZylcbiAgICAgICAgKTtcbiAgICAgICAgY3JlYXRlU3ZnT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnpvb21TdHJhdGVneSA9IG5ldyBEZWZhdWx0Wm9vbVN0cmF0ZWd5KFxuICAgICAgICAgIHRoaXMudmlld2VyLFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZSxcbiAgICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLFxuICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5ID0gbmV3IERlZmF1bHRHb1RvQ2FudmFzR3JvdXBTdHJhdGVneShcbiAgICAgICAgICB0aGlzLnZpZXdlcixcbiAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneSxcbiAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UsXG4gICAgICAgICAgdGhpcy5tb2RlU2VydmljZSxcbiAgICAgICAgICB0aGlzLmNvbmZpZyxcbiAgICAgICAgICB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb25cbiAgICAgICAgKTtcblxuICAgICAgICAvKlxuICAgICAgICAgIFRoaXMgZGlzYWJsZXMga2V5Ym9hcmQgbmF2aWdhdGlvbiBpbiBvcGVuc2VhZHJhZ29uLlxuICAgICAgICAgIFdlIHVzZSBzIGZvciBvcGVuaW5nIHNlYXJjaCBkaWFsb2cgYW5kIE9TRCB1c2UgdGhlIHNhbWUga2V5IGZvciBwYW5uaW5nLlxuICAgICAgICAgIElzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vb3BlbnNlYWRyYWdvbi9vcGVuc2VhZHJhZ29uL2lzc3Vlcy83OTRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVmYXVsdEtleURvd25IYW5kbGVyID0gdGhpcy52aWV3ZXIuaW5uZXJUcmFja2VyLmtleURvd25IYW5kbGVyO1xuICAgICAgICB0aGlzLmRpc2FibGVLZXlEb3duSGFuZGxlcigpO1xuICAgICAgICB0aGlzLnZpZXdlci5pbm5lclRyYWNrZXIua2V5SGFuZGxlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5yZXNldCgpO1xuICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTWFzayA9IG5ldyBDYW52YXNHcm91cE1hc2soXG4gICAgICAgICAgdGhpcy52aWV3ZXIsXG4gICAgICAgICAgdGhpcy5zdHlsZVNlcnZpY2VcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmFkZFRvV2luZG93KCk7XG4gICAgICB0aGlzLnNldHVwT3ZlcmxheXMoKTtcbiAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheXMoKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgobW9kZTogTW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlQ2hhbmdlZChtb2RlKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICB0aGlzLm9uQ2VudGVyQ2hhbmdlXG4gICAgICAgICAgLnBpcGUoc2FtcGxlKGludGVydmFsKDUwMCkpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNlbnRlcjogUG9pbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKGNlbnRlcik7XG4gICAgICAgICAgICBpZiAoY2VudGVyICYmIGNlbnRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLm9zZElzUmVhZHkubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5yZXNldCgpO1xuICAgICAgICAgIGlmIChjYW52YXNHcm91cEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNHcm91cE1hc2suY2hhbmdlQ2FudmFzR3JvdXAoXG4gICAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cFJlY3QoY2FudmFzR3JvdXBJbmRleClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICAgICAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgIHRoaXMubGF5b3V0UGFnZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBoaXQ7XG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRDdXJyZW50SGl0KCk7XG4gICAgICAgICAgdGhpcy5nb1RvQ2FudmFzKGhpdC5pbmRleCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5vblJvdGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgocm90YXRpb246IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmxheW91dFBhZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2UkLnN1YnNjcmliZShcbiAgICAgICAgKHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM6IFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSA9PT0gUmVjb2duaXplZFRleHRNb2RlLk9OTFlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBhZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5wcmV2aW91c1ZhbHVlID09PSBSZWNvZ25pemVkVGV4dE1vZGUuT05MWVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zaG93UGFnZXMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLnByZXZpb3VzVmFsdWUgPT09XG4gICAgICAgICAgICAgIFJlY29nbml6ZWRUZXh0TW9kZS5PTkxZICYmXG4gICAgICAgICAgICByZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSA9PT0gUmVjb2duaXplZFRleHRNb2RlLlNQTElUXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5ob21lKCk7XG4gICAgICAgICAgICB9LCBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBoaWRlUGFnZXMoKSB7XG4gICAgdGhpcy5zZXRPcGFjaXR5T25QYWdlcygwKTtcbiAgfVxuXG4gIHNob3dQYWdlcygpIHtcbiAgICB0aGlzLnNldE9wYWNpdHlPblBhZ2VzKDEpO1xuICB9XG5cbiAgbGF5b3V0UGFnZXMoKSB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzSW5kZXggPSB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0luZGV4O1xuICAgICAgdGhpcy5kZXN0cm95KHRydWUpO1xuICAgICAgdGhpcy5zZXRVcFZpZXdlcih0aGlzLm1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6XG4gICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoY3VycmVudENhbnZhc0luZGV4KSxcbiAgICAgICAgaW1tZWRpYXRlbHk6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlY3JlYXRlIGhpZ2hsaWdodHMgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlYXJjaCBnb2luZyBvblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNlYXJjaCkge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLmN1cnJlbnRTZWFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFRvV2luZG93KCkge1xuICAgICg8YW55PndpbmRvdykub3BlblNlYWRyYWdvblZpZXdlciA9IHRoaXMudmlld2VyO1xuICB9XG5cbiAgc2V0dXBPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLnN2Z092ZXJsYXkgPSB0aGlzLnZpZXdlci5zdmdPdmVybGF5KCk7XG4gICAgdGhpcy5zdmdOb2RlID0gZDMuc2VsZWN0KHRoaXMuc3ZnT3ZlcmxheS5ub2RlKCkpO1xuICB9XG5cbiAgZGlzYWJsZUtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IG51bGw7XG4gIH1cblxuICByZXNldEtleURvd25IYW5kbGVyKCkge1xuICAgIHRoaXMudmlld2VyLmlubmVyVHJhY2tlci5rZXlEb3duSGFuZGxlciA9IHRoaXMuZGVmYXVsdEtleURvd25IYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBsYXlvdXRTd2l0Y2ggdHJ1ZSBpZiBzd2l0Y2hpbmcgYmV0d2VlbiBsYXlvdXRzXG4gICAqIHRvIGtlZXAgY3VycmVudCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uXG4gICAqL1xuICBkZXN0cm95KGxheW91dFN3aXRjaD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9zZElzUmVhZHkubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jdXJyZW50Q2VudGVyLm5leHQoeyB4OiAwLCB5OiAwIH0pO1xuICAgIGlmICh0aGlzLnZpZXdlciAhPSBudWxsICYmIHRoaXMudmlld2VyLmlzT3BlbigpKSB7XG4gICAgICBpZiAodGhpcy52aWV3ZXIuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMudmlld2VyLmNvbnRhaW5lci5wYXJlbnROb2RlKS5zdHlsZSgnb3BhY2l0eScsICcwJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXdlci5kZXN0cm95KCk7XG4gICAgICB0aGlzLnZpZXdlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UucmVzZXQoKTtcbiAgICBpZiAodGhpcy5jYW52YXNHcm91cE1hc2spIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gS2VlcCBzZWFyY2gtc3RhdGUgYW5kIHJvdGF0aW9uIG9ubHkgaWYgbGF5b3V0LXN3aXRjaFxuICAgIGlmICghbGF5b3V0U3dpdGNoKSB7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IG51bGw7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJvdGF0aW9uLm5leHQoMCk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5jbGlja1NlcnZpY2UucmVzZXQoKTtcbiAgICB0aGlzLmNsaWNrU2VydmljZS5hZGRTaW5nbGVDbGlja0hhbmRsZXIodGhpcy5zaW5nbGVDbGlja0hhbmRsZXIpO1xuICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFkZERvdWJsZUNsaWNrSGFuZGxlcih0aGlzLmRibENsaWNrSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignYW5pbWF0aW9uLWZpbmlzaCcsICgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2NhbnZhcy1jbGljaycsIHRoaXMuY2xpY2tTZXJ2aWNlLmNsaWNrKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKFxuICAgICAgJ2NhbnZhcy1kb3VibGUtY2xpY2snLFxuICAgICAgKGU6IGFueSkgPT4gKGUucHJldmVudERlZmF1bHRBY3Rpb24gPSB0cnVlKVxuICAgICk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXByZXNzJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5waW5jaFN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gPSBlLnBvc2l0aW9uO1xuICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcmVsZWFzZScsICgpID0+XG4gICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZC5uZXh0KGZhbHNlKVxuICAgICk7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXNjcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLXBpbmNoJywgdGhpcy5waW5jaEhhbmRsZXIpO1xuXG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWcnLCAoZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmRyYWdTdGF0dXMgPSB0cnVlO1xuICAgICAgdGhpcy5kcmFnSGFuZGxlcihlKTtcbiAgICB9KTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZy1lbmQnLCAoZTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kcmFnU3RhdHVzKSB7XG4gICAgICAgIHRoaXMuY29uc3RyYWludENhbnZhcygpO1xuICAgICAgICB0aGlzLnN3aXBlVG9DYW52YXNHcm91cChlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhZ1N0YXR1cyA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbicsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudENlbnRlci5uZXh0KHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgem9vbUluKHpvb21GYWN0b3I/OiBudW1iZXIsIHBvc2l0aW9uPzogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLnpvb21TdHJhdGVneS56b29tSW4oem9vbUZhY3RvciwgcG9zaXRpb24pO1xuICB9XG5cbiAgem9vbU91dCh6b29tRmFjdG9yPzogbnVtYmVyLCBwb3NpdGlvbj86IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBwb3NpdGlvbik7XG4gIH1cblxuICByb3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3NkSXNSZWFkeS5nZXRWYWx1ZSgpKSB7XG4gICAgICBpZiAodGhpcy52aWV3ZXIudXNlQ2FudmFzKSB7XG4gICAgICAgIHRoaXMucm90YXRlVG9SaWdodCgpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRIaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1JvdGF0aW9uSXNOb3RTdXBwb3J0ZXRNZXNzYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZvciBtb2RlLWNoYW5nZVxuICAgKiBAcGFyYW0gbW9kZSBWaWV3ZXJNb2RlXG4gICAqL1xuICBtb2RlQ2hhbmdlZChtb2RlOiBNb2RlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy52aWV3ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVUb0Rhc2hib2FyZCgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIHRoaXMudmlld2VyLnBhblZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZVRvUGFnZSgpO1xuICAgICAgdGhpcy5kaXNhYmxlS2V5RG93bkhhbmRsZXIoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnZpZXdlci5wYW5WZXJ0aWNhbCA9IHRydWU7XG4gICAgICB0aGlzLnJlc2V0S2V5RG93bkhhbmRsZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmFuZG9tSWQocHJlZml4OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJhbmRvbVN0cmluZyA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7cmFuZG9tU3RyaW5nfWA7XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoZXMgdG8gREFTSEJPQVJELW1vZGUsIHJlcG9zaXRpb25zIGNhbnZhcyBncm91cCBhbmQgcmVtb3ZlcyBtYXgtd2lkdGggb24gdmlld2VyXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVRvRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5oaWRlKCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuREFTSEJPQVJEKTtcbiAgICB0aGlzLnpvb21TdHJhdGVneS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0byBQQUdFLW1vZGUsIGNlbnRlcnMgY3VycmVudCBjYW52YXMgZ3JvdXAgYW5kIHJlcG9zaXRpb25zIG90aGVyIGNhbnZhcyBncm91cHNcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlVG9QYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jYW52YXNTZXJ2aWNlLmlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICBjYW52YXNHcm91cEluZGV4OiB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICBpbW1lZGlhdGVseTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwTWFzay5zaG93KCk7XG5cbiAgICB0aGlzLnpvb21TdHJhdGVneS5zZXRNaW5ab29tKFZpZXdlck1vZGUuUEFHRSk7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsLWhhbmRsZXJcbiAgICovXG4gIHNjcm9sbEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBNYXRoLnBvdyhWaWV3ZXJPcHRpb25zLnpvb20uem9vbUZhY3RvciwgZXZlbnQuc2Nyb2xsKTtcbiAgICAvLyBTY3JvbGxpbmcgdXBcbiAgICBpZiAoZXZlbnQuc2Nyb2xsID4gMCkge1xuICAgICAgdGhpcy56b29tSW5HZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICAgIC8vIFNjcm9sbGluZyBkb3duXG4gICAgfSBlbHNlIGlmIChldmVudC5zY3JvbGwgPCAwKSB7XG4gICAgICB0aGlzLnpvb21PdXRHZXN0dXJlKGV2ZW50LnBvc2l0aW9uLCB6b29tRmFjdG9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFBpbmNoLWhhbmRsZXJcbiAgICovXG4gIHBpbmNoSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgdGhpcy5waW5jaFN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSBldmVudC5kaXN0YW5jZSAvIGV2ZW50Lmxhc3REaXN0YW5jZTtcbiAgICAvLyBQaW5jaCBPdXRcbiAgICBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSA+XG4gICAgICBldmVudC5sYXN0RGlzdGFuY2UgKyBWaWV3ZXJPcHRpb25zLnpvb20ucGluY2hab29tVGhyZXNob2xkXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21JblBpbmNoR2VzdHVyZShldmVudCwgem9vbUZhY3Rvcik7XG4gICAgICAvLyBQaW5jaCBJblxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBldmVudC5kaXN0YW5jZSArIFZpZXdlck9wdGlvbnMuem9vbS5waW5jaFpvb21UaHJlc2hvbGQgPFxuICAgICAgZXZlbnQubGFzdERpc3RhbmNlXG4gICAgKSB7XG4gICAgICB0aGlzLnpvb21PdXRQaW5jaEdlc3R1cmUoZXZlbnQsIHpvb21GYWN0b3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBvaW50IHRvIHpvb20gdG8uIElmIG5vdCBzZXQsIHRoZSB2aWV3ZXIgd2lsbCB6b29tIHRvIGNlbnRlclxuICAgKi9cbiAgem9vbUluR2VzdHVyZShwb3NpdGlvbjogUG9pbnQsIHpvb21GYWN0b3I/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVN0cmF0ZWd5Lnpvb21JbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHpvb21PdXRHZXN0dXJlKHBvc2l0aW9uOiBQb2ludCwgem9vbUZhY3Rvcj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICB0aGlzLnpvb21TdHJhdGVneS56b29tT3V0KHpvb21GYWN0b3IsIHBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB6b29tIGluIHBpbmNoIGdlc3R1cmUgKHBpbmNoIG91dClcbiAgICpcbiAgICogVG9nZ2xlIHRvIHBhZ2UgbW9kZSBhbmQgWm9vbSBpblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZnJvbSBwaW5jaCBnZXN0dXJlXG4gICAqL1xuICB6b29tSW5QaW5jaEdlc3R1cmUoZXZlbnQ6IGFueSwgem9vbUZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy56b29tSW4oem9vbUZhY3RvciwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiB8fCBldmVudC5jZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHpvb20gb3V0IHBpbmNoIGdlc3R1cmUgKHBpbmNoIGluKVxuICAgKlxuICAgKiBab29tIG91dCBhbmQgdG9nZ2xlIHRvIGRhc2hib2FyZCB3aGVuIGFsbCB6b29tZWQgb3V0LlxuICAgKiBTdG9wIGJldHdlZW4gem9vbWluZyBvdXQgYW5kIHRvZ2dsaW5nIHRvIGRhc2hib2FyZC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGZyb20gcGluY2ggZ2VzdHVyZVxuICAgKi9cbiAgem9vbU91dFBpbmNoR2VzdHVyZShldmVudDogYW55LCB6b29tRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBnZXN0dXJlSWQgPSBldmVudC5nZXN0dXJlUG9pbnRzWzBdLmlkO1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICB0aGlzLnBpbmNoU3RhdHVzLnNob3VsZFN0b3AgPSB0cnVlO1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbU91dCh6b29tRmFjdG9yLCBldmVudC5jZW50ZXIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGluY2hTdGF0dXMuc2hvdWxkU3RvcCB8fFxuICAgICAgICBnZXN0dXJlSWQgPT09IHRoaXMucGluY2hTdGF0dXMucHJldmlvdXNHZXN0dXJlSWQgKyAyXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5waW5jaFN0YXR1cy5zaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5waW5jaFN0YXR1cy5wcmV2aW91c0dlc3R1cmVJZCA9IGdlc3R1cmVJZDtcbiAgICB9XG4gIH1cblxuICBnb1RvSG9tZVpvb20oKTogdm9pZCB7XG4gICAgdGhpcy56b29tU3RyYXRlZ3kuZ29Ub0hvbWVab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogU2luZ2xlLWNsaWNrLWhhbmRsZXJcbiAgICogU2luZ2xlLWNsaWNrIHRvZ2dsZXMgYmV0d2VlbiBwYWdlL2Rhc2hib2FyZC1tb2RlIGlmIGEgcGFnZSBpcyBoaXRcbiAgICovXG4gIHNpbmdsZUNsaWNrSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgdGlsZUluZGV4ID0gdGhpcy5nZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudChldmVudCk7XG4gICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleCh0aWxlSW5kZXgpO1xuICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxjdWxhdGVDdXJyZW50Q2FudmFzR3JvdXAodGhpcy52aWV3ZXI/LnZpZXdwb3J0LmdldENlbnRlcih0cnVlKSk7XG4gICAgfVxuICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEb3VibGUtY2xpY2staGFuZGxlclxuICAgKiBEb3VibGUtY2xpY2sgZGFzaGJvYXJkLW1vZGUgc2hvdWxkIGdvIHRvIHBhZ2UtbW9kZVxuICAgKiBEb3VibGUtY2xpY2sgcGFnZS1tb2RlIHNob3VsZFxuICAgKiAgICBhKSBab29tIGluIGlmIHBhZ2UgaXMgZml0dGVkIHZlcnRpY2FsbHksIG9yXG4gICAqICAgIGIpIEZpdCB2ZXJ0aWNhbGx5IGlmIHBhZ2UgaXMgYWxyZWFkeSB6b29tZWQgaW5cbiAgICovXG4gIGRibENsaWNrSGFuZGxlciA9IChldmVudDogYW55KSA9PiB7XG4gICAgLy8gUGFnZSBpcyBmaXR0ZWQgdmVydGljYWxseSwgc28gZGJsLWNsaWNrIHpvb21zIGluXG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEO1xuICAgICAgdGhpcy56b29tU3RyYXRlZ3kuem9vbUluKFxuICAgICAgICBWaWV3ZXJPcHRpb25zLnpvb20uZGJsQ2xpY2tab29tRmFjdG9yLFxuICAgICAgICBldmVudC5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgICAgY29uc3QgY2FudmFzSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0T3ZlcmxheUluZGV4RnJvbUNsaWNrRXZlbnQoZXZlbnQpO1xuICAgICAgY29uc3QgcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleCA9XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KGNhbnZhc0luZGV4KTtcbiAgICAgIGlmIChyZXF1ZXN0ZWRDYW52YXNHcm91cEluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gcmVxdWVzdGVkQ2FudmFzR3JvdXBJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKHRoaXMudmlld2VyPy52aWV3cG9ydC5nZXRDZW50ZXIodHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGhpdCBlbGVtZW50IGlzIGEgPHJlY3Q+LWVsZW1lbnRcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgaXNDYW52YXNHcm91cEhpdCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFNWR1JlY3RFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRpbGVzb3VyY2VzIGFuZCBhZGRzIHRoZW0gdG8gdmlld2VyXG4gICAqIENyZWF0ZXMgc3ZnIGNsaWNrYWJsZSBvdmVybGF5cyBmb3IgZWFjaCB0aWxlXG4gICAqL1xuICBjcmVhdGVPdmVybGF5cygpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gICAgY29uc3QgY2FudmFzUmVjdHM6IFJlY3RbXSA9IFtdO1xuICAgIGNvbnN0IGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneSA9XG4gICAgICBDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uRmFjdG9yeS5jcmVhdGUoXG4gICAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5sYXlvdXQsXG4gICAgICAgIHRoaXMuaXNNYW5pZmVzdFBhZ2VkLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKTtcblxuICAgIGNvbnN0IGlzVHdvUGFnZVZpZXc6IGJvb2xlYW4gPVxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgIGNvbnN0IHJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGxldCBncm91cDogYW55ID0gdGhpcy5zdmdOb2RlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BhZ2UtZ3JvdXAnKTtcblxuICAgIHRoaXMudGlsZVNvdXJjZXMuZm9yRWFjaCgodGlsZSwgaSkgPT4ge1xuICAgICAgY29uc3QgcG9zaXRpb24gPVxuICAgICAgICBjYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kuY2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYW52YXNHcm91cEluZGV4OiBpLFxuICAgICAgICAgICAgY2FudmFzU291cmNlOiB0aWxlLFxuICAgICAgICAgICAgcHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uOiBjYW52YXNSZWN0c1tpIC0gMV0sXG4gICAgICAgICAgICB2aWV3aW5nRGlyZWN0aW9uOiB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByb3RhdGlvblxuICAgICAgICApO1xuXG4gICAgICBjYW52YXNSZWN0cy5wdXNoKHBvc2l0aW9uKTtcblxuICAgICAgY29uc3QgdGlsZVNvdXJjZVN0cmF0ZWd5ID0gVGlsZVNvdXJjZVN0cmF0ZWd5RmFjdG9yeS5jcmVhdGUodGlsZSk7XG4gICAgICBjb25zdCB0aWxlU291cmNlID0gdGlsZVNvdXJjZVN0cmF0ZWd5LmdldFRpbGVTb3VyY2UodGlsZSk7XG5cbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZWQgPSByb3RhdGlvbiA9PT0gOTAgfHwgcm90YXRpb24gPT09IDI3MDtcblxuICAgICAgICBsZXQgYm91bmRzO1xuXG4gICAgICAgIC8qIEJlY2F1c2UgaW1hZ2Ugc2NhbGluZyBpcyBwZXJmb3JtZWQgYmVmb3JlIHJvdGF0aW9uLFxuICAgICAgICAgKiB3ZSBtdXN0IGludmVydCB3aWR0aCAmIGhlaWdodCBhbmQgdHJhbnNsYXRlIHBvc2l0aW9uIHNvIHRoYXQgdGlsZSByb3RhdGlvbiBlbmRzIHVwIGNvcnJlY3RcbiAgICAgICAgICovXG4gICAgICAgIGlmIChyb3RhdGVkKSB7XG4gICAgICAgICAgYm91bmRzID0gbmV3IE9wZW5TZWFkcmFnb24uUmVjdChcbiAgICAgICAgICAgIHBvc2l0aW9uLnggKyAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgLSAocG9zaXRpb24ud2lkdGggLSBwb3NpdGlvbi5oZWlnaHQpIC8gMixcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodCxcbiAgICAgICAgICAgIHBvc2l0aW9uLndpZHRoXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgICAgICAgcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHBvc2l0aW9uLnksXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCxcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdlci5hZGRUaWxlZEltYWdlKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0aWxlU291cmNlOiB0aWxlU291cmNlLFxuICAgICAgICAgIGZpdEJvdW5kczogYm91bmRzLFxuICAgICAgICAgIGRlZ3JlZXM6IHJvdGF0aW9uLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNUd29QYWdlVmlldyAmJiBpICUgMiAhPT0gMCkge1xuICAgICAgICBncm91cCA9IHRoaXMuc3ZnTm9kZS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdwYWdlLWdyb3VwJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVybGF5ID0gZ3JvdXBcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCd4JywgcG9zaXRpb24ueClcbiAgICAgICAgLmF0dHIoJ3knLCBwb3NpdGlvbi55KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBwb3NpdGlvbi53aWR0aClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHBvc2l0aW9uLmhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpbGUnKTtcblxuICAgICAgLy8gTWFrZSBjdXN0b20gYm9yZGVycyBpZiBjdXJyZW50IGxheW91dCBpcyB0d28tcGFnZWRcbiAgICAgIGlmIChpc1R3b1BhZ2VWaWV3KSB7XG4gICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBpICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgbm9MZWZ0U3Ryb2tlU3R5bGUgPVxuICAgICAgICAgICAgTnVtYmVyKHBvc2l0aW9uLndpZHRoICogMiArIHBvc2l0aW9uLmhlaWdodCkgK1xuICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCAqIDI7XG4gICAgICAgICAgY3VycmVudE92ZXJsYXkuc3R5bGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBub0xlZnRTdHJva2VTdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSAlIDIgIT09IDAgJiYgaSAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG5vUmlnaHRTdHJva2VTdHlsZSA9XG4gICAgICAgICAgICBwb3NpdGlvbi53aWR0aCArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIHBvc2l0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAnLCAnICtcbiAgICAgICAgICAgIE51bWJlcihwb3NpdGlvbi53aWR0aCAqIDIgKyBwb3NpdGlvbi5oZWlnaHQpO1xuICAgICAgICAgIGN1cnJlbnRPdmVybGF5LnN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jywgbm9SaWdodFN0cm9rZVN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50T3ZlcmxheU5vZGU6IFNWR1JlY3RFbGVtZW50ID0gY3VycmVudE92ZXJsYXkubm9kZSgpO1xuICAgICAgdGhpcy5vdmVybGF5c1tpXSA9IGN1cnJlbnRPdmVybGF5Tm9kZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxheW91dCA9XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UubGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UgfHxcbiAgICAgICF0aGlzLmlzTWFuaWZlc3RQYWdlZFxuICAgICAgICA/IFZpZXdlckxheW91dC5PTkVfUEFHRVxuICAgICAgICA6IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgICB0aGlzLmNhbnZhc1NlcnZpY2UuYWRkQWxsKGNhbnZhc1JlY3RzLCBsYXlvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdmlld2VyIHNpemUgYW5kIG9wYWNpdHkgb25jZSB0aGUgZmlyc3QgY2FudmFzIGdyb3VwIGhhcyBmdWxseSBsb2FkZWRcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbENhbnZhc0dyb3VwTG9hZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuaG9tZSgpO1xuICAgIHRoaXMuY2FudmFzR3JvdXBNYXNrLmluaXRpYWxpemUoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpLFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlICE9PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRFxuICAgICk7XG4gICAgaWYgKHRoaXMudmlld2VyKSB7XG4gICAgICBkMy5zZWxlY3QodGhpcy52aWV3ZXIuY29udGFpbmVyLnBhcmVudE5vZGUpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSlcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgJzEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvdmVybGF5LWluZGV4IGZvciBjbGljay1ldmVudCBpZiBoaXRcbiAgICogQHBhcmFtIHRhcmdldCBoaXQgPHJlY3Q+XG4gICAqL1xuICBnZXRPdmVybGF5SW5kZXhGcm9tQ2xpY2tFdmVudChldmVudDogYW55KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRPcmlnaW5hbFRhcmdldChldmVudCk7XG4gICAgaWYgKHRoaXMuaXNDYW52YXNHcm91cEhpdCh0YXJnZXQpKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ZWRDYW52YXNHcm91cDogbnVtYmVyID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICBpZiAocmVxdWVzdGVkQ2FudmFzR3JvdXAgPj0gMCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdGVkQ2FudmFzR3JvdXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQ3VycmVudENhbnZhc0dyb3VwKGNlbnRlcjogUG9pbnQpIHtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2xvc2VzdENhbnZhc0dyb3VwSW5kZXgoY2VudGVyKTtcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0luZGV4Lm5leHQoY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhZ0hhbmRsZXIgPSAoZTogYW55KSA9PiB7XG4gICAgdGhpcy52aWV3ZXIucGFuSG9yaXpvbnRhbCA9IHRydWU7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0dyb3VwUmVjdDogUmVjdCA9XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgICBjb25zdCB2cEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcbiAgICAgIGNvbnN0IHBhbm5lZFBhc3RDYW52YXNHcm91cCA9XG4gICAgICAgIFN3aXBlVXRpbHMuZ2V0U2lkZUlmUGFubmluZ1Bhc3RFbmRPZkNhbnZhc0dyb3VwKFxuICAgICAgICAgIGNhbnZhc0dyb3VwUmVjdCxcbiAgICAgICAgICB2cEJvdW5kc1xuICAgICAgICApO1xuICAgICAgY29uc3QgZGlyZWN0aW9uOiBudW1iZXIgPSBlLmRpcmVjdGlvbjtcbiAgICAgIGlmIChcbiAgICAgICAgKHBhbm5lZFBhc3RDYW52YXNHcm91cCA9PT0gU2lkZS5MRUZUICYmXG4gICAgICAgICAgU3dpcGVVdGlscy5pc0RpcmVjdGlvbkluUmlnaHRTZW1pY2lyY2xlKGRpcmVjdGlvbikpIHx8XG4gICAgICAgIChwYW5uZWRQYXN0Q2FudmFzR3JvdXAgPT09IFNpZGUuUklHSFQgJiZcbiAgICAgICAgICBTd2lwZVV0aWxzLmlzRGlyZWN0aW9uSW5MZWZ0U2VtaWNpcmNsZShkaXJlY3Rpb24pKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudmlld2VyLnBhbkhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBjb25zdHJhaW50Q2FudmFzKCkge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICBjb25zdCB2aWV3cG9ydEJvdW5kczogUmVjdCA9IHRoaXMuZ2V0Vmlld3BvcnRCb3VuZHMoKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDYW52YXNCb3VuZHMgPSB0aGlzLmdldEN1cnJlbnRDYW52YXNCb3VuZHMoKTtcbiAgICAgIHRoaXMuaXNDYW52YXNPdXRzaWRlVmlld3BvcnQodmlld3BvcnRCb3VuZHMsIGN1cnJlbnRDYW52YXNCb3VuZHMpXG4gICAgICAgID8gdGhpcy5jb25zdHJhaW50Q2FudmFzT3V0c2lkZVZpZXdwb3J0KFxuICAgICAgICAgICAgdmlld3BvcnRCb3VuZHMsXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzQm91bmRzXG4gICAgICAgICAgKVxuICAgICAgICA6IHRoaXMuY29uc3RyYWludENhbnZhc0luc2lkZVZpZXdwb3J0KHZpZXdwb3J0Qm91bmRzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEN1cnJlbnRDYW52YXNCb3VuZHMoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudmlld2VyLndvcmxkXG4gICAgICAuZ2V0SXRlbUF0KHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleClcbiAgICAgIC5nZXRCb3VuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDYW52YXNPdXRzaWRlVmlld3BvcnQoXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2aWV3cG9ydEJvdW5kcy5oZWlnaHQgPCBjYW52YXNCb3VuZHMuaGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb25zdHJhaW50Q2FudmFzT3V0c2lkZVZpZXdwb3J0KFxuICAgIHZpZXdwb3J0Qm91bmRzOiBSZWN0LFxuICAgIGNhbnZhc0JvdW5kczogUmVjdFxuICApOiB2b2lkIHtcbiAgICBsZXQgcmVjdDogUmVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5pc0NhbnZhc0JlbG93Vmlld3BvcnRUb3Aodmlld3BvcnRCb3VuZHMsIGNhbnZhc0JvdW5kcykpIHtcbiAgICAgIHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICAgIHg6IHZpZXdwb3J0Qm91bmRzLnggKyB2aWV3cG9ydEJvdW5kcy53aWR0aCAvIDIsXG4gICAgICAgIHk6IGNhbnZhc0JvdW5kcy55ICsgdmlld3BvcnRCb3VuZHMuaGVpZ2h0IC8gMixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0NhbnZhc0Fib3ZlVmlld3BvcnRCb3R0b20odmlld3BvcnRCb3VuZHMsIGNhbnZhc0JvdW5kcykpIHtcbiAgICAgIHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICAgIHg6IHZpZXdwb3J0Qm91bmRzLnggKyB2aWV3cG9ydEJvdW5kcy53aWR0aCAvIDIsXG4gICAgICAgIHk6IGNhbnZhc0JvdW5kcy55ICsgY2FudmFzQm91bmRzLmhlaWdodCAtIHZpZXdwb3J0Qm91bmRzLmhlaWdodCAvIDIsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5wYW5UbyhyZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RyYWludENhbnZhc0luc2lkZVZpZXdwb3J0KHZpZXdwb3J0Qm91bmRzOiBSZWN0KTogdm9pZCB7XG4gICAgY29uc3QgY2FudmFzR3JvdXBSZWN0ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwUmVjdChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICk7XG4gICAgY29uc3QgcmVjdCA9IG5ldyBSZWN0KHtcbiAgICAgIHg6IHZpZXdwb3J0Qm91bmRzLnggKyB2aWV3cG9ydEJvdW5kcy53aWR0aCAvIDIsXG4gICAgICB5OiBjYW52YXNHcm91cFJlY3QuY2VudGVyWSxcbiAgICB9KTtcbiAgICB0aGlzLnBhblRvKHJlY3QsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NhbnZhc0JlbG93Vmlld3BvcnRUb3AoXG4gICAgdmlld3BvcnRCb3VuZHM6IFJlY3QsXG4gICAgY2FudmFzQm91bmRzOiBSZWN0XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2aWV3cG9ydEJvdW5kcy55IDwgY2FudmFzQm91bmRzLnk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2FudmFzQWJvdmVWaWV3cG9ydEJvdHRvbShcbiAgICB2aWV3cG9ydEJvdW5kczogUmVjdCxcbiAgICBjYW52YXNCb3VuZHM6IFJlY3RcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNhbnZhc0JvdW5kcy55ICsgY2FudmFzQm91bmRzLmhlaWdodCA8XG4gICAgICB2aWV3cG9ydEJvdW5kcy55ICsgdmlld3BvcnRCb3VuZHMuaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3dpcGVUb0NhbnZhc0dyb3VwKGU6IGFueSkge1xuICAgIC8vIERvbid0IHN3aXBlIG9uIHBpbmNoIGFjdGlvbnNcbiAgICBpZiAodGhpcy5waW5jaFN0YXR1cy5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVlZDogbnVtYmVyID0gZS5zcGVlZDtcbiAgICBjb25zdCBkcmFnRW5kUG9zaXNpb24gPSBlLnBvc2l0aW9uO1xuXG4gICAgY29uc3QgY2FudmFzR3JvdXBSZWN0OiBSZWN0ID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRCb3VuZHM6IFJlY3QgPSB0aGlzLmdldFZpZXdwb3J0Qm91bmRzKCk7XG5cbiAgICBjb25zdCBkaXJlY3Rpb246IERpcmVjdGlvbiA9IFN3aXBlVXRpbHMuZ2V0U3dpcGVEaXJlY3Rpb24oXG4gICAgICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uLFxuICAgICAgZHJhZ0VuZFBvc2lzaW9uLFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgICBjb25zdCBjYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneSA9XG4gICAgICBDYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBGYWN0b3J5LmNyZWF0ZSh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUpO1xuXG4gICAgbGV0IHBhbm5lZFBhc3RTaWRlOiBTaWRlIHwgbnVsbDtcbiAgICBsZXQgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgcGFubmVkUGFzdFNpZGUgPSBTd2lwZVV0aWxzLmdldFNpZGVJZlBhbm5pbmdQYXN0RW5kT2ZDYW52YXNHcm91cChcbiAgICAgICAgY2FudmFzR3JvdXBSZWN0LFxuICAgICAgICB2aWV3cG9ydEJvdW5kc1xuICAgICAgKTtcbiAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5hZGRIaXQocGFubmVkUGFzdFNpZGUsIGRpcmVjdGlvbik7XG4gICAgICBjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCA9XG4gICAgICAgIHRoaXMuc3dpcGVEcmFnRW5kQ291bnRlci5oaXRDb3VudFJlYWNoZWQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdDYW52YXNHcm91cEluZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmNvbnN0cmFpblRvUmFuZ2UoXG4gICAgICBjYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXBTdHJhdGVneS5jYWxjdWxhdGVOZXh0Q2FudmFzR3JvdXAoe1xuICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBDZW50ZXI6IHRoaXMuY3VycmVudENhbnZhc0luZGV4LmdldFZhbHVlKCksXG4gICAgICAgIHNwZWVkOiBzcGVlZCxcbiAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCxcbiAgICAgICAgY2FudmFzR3JvdXBFbmRIaXRDb3VudFJlYWNoZWQ6IGNhbnZhc0dyb3VwRW5kSGl0Q291bnRSZWFjaGVkLFxuICAgICAgICB2aWV3aW5nRGlyZWN0aW9uOiB0aGlzLm1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24sXG4gICAgICB9KVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCB8fFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIChjYW52YXNHcm91cEVuZEhpdENvdW50UmVhY2hlZCAmJiBkaXJlY3Rpb24pXG4gICAgKSB7XG4gICAgICB0aGlzLmdvVG9DYW52YXNHcm91cFN0cmF0ZWd5LmdvVG9DYW52YXNHcm91cCh7XG4gICAgICAgIGNhbnZhc0dyb3VwSW5kZXg6IG5ld0NhbnZhc0dyb3VwSW5kZXgsXG4gICAgICAgIGltbWVkaWF0ZWx5OiBmYWxzZSxcbiAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZpZXdwb3J0Qm91bmRzKCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnZpZXdlcj8udmlld3BvcnQuZ2V0Qm91bmRzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldE9yaWdpbmFsVGFyZ2V0KGV2ZW50OiBhbnkpIHtcbiAgICByZXR1cm4gZXZlbnQub3JpZ2luYWxUYXJnZXRcbiAgICAgID8gZXZlbnQub3JpZ2luYWxUYXJnZXRcbiAgICAgIDogZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gIH1cblxuICBwcml2YXRlIHBhblRvKHJlY3Q6IFJlY3QgfCB1bmRlZmluZWQsIGltbWVkaWF0ZWx5ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAocmVjdCkge1xuICAgICAgdGhpcy52aWV3ZXIudmlld3BvcnQucGFuVG8oXG4gICAgICAgIHtcbiAgICAgICAgICB4OiByZWN0LngsXG4gICAgICAgICAgeTogcmVjdC55LFxuICAgICAgICB9LFxuICAgICAgICBpbW1lZGlhdGVseVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJvdGF0ZVRvUmlnaHQoKSB7XG4gICAgdGhpcy5yb3RhdGlvbi5uZXh0KCh0aGlzLnJvdGF0aW9uLmdldFZhbHVlKCkgKyA5MCkgJSAzNjApO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93Um90YXRpb25Jc05vdFN1cHBvcnRldE1lc3NhZ2UoKSB7XG4gICAgdGhpcy5zbmFja0Jhci5vcGVuKHRoaXMuaW50bC5yb3RhdGlvbklzTm90U3VwcG9ydGVkLCB1bmRlZmluZWQsIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcGFjaXR5T25QYWdlcyhvcGFjaXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgIGNvbnN0IGl0ZW1Db3VudCA9IHRoaXMudmlld2VyLndvcmxkLmdldEl0ZW1Db3VudCgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtQ291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy52aWV3ZXIud29ybGQuZ2V0SXRlbUF0KGkpO1xuICAgICAgICBpdGVtLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
import { NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { ModeService } from '../../core/mode-service/mode.service';
import { AltoService } from '../alto-service/alto.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { ClickService } from '../click-service/click.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeChanges } from '../models';
import { Manifest, Resource } from '../models/manifest';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { Point } from './../models/point';
import { SearchResult } from './../models/search-result';
import * as i0 from "@angular/core";
export declare class ViewerService {
    private zone;
    private clickService;
    private canvasService;
    private modeService;
    private viewerLayoutService;
    private iiifContentSearchService;
    private styleService;
    private altoService;
    private snackBar;
    private intl;
    config: MimeViewerConfig;
    private viewer?;
    private svgOverlay;
    private svgNode;
    private tileSources;
    private subscriptions;
    isCanvasPressed: Subject<boolean>;
    private currentCenter;
    private currentCanvasIndex;
    private currentHit;
    private osdIsReady;
    private swipeDragEndCounter;
    private canvasGroupMask;
    private pinchStatus;
    private dragStartPosition;
    private manifest;
    private isManifestPaged;
    private defaultKeyDownHandler;
    currentSearch: SearchResult | null;
    private zoomStrategy;
    private goToCanvasGroupStrategy;
    private rotation;
    private dragStatus;
    id: string;
    openseadragonId: string;
    constructor(zone: NgZone, clickService: ClickService, canvasService: CanvasService, modeService: ModeService, viewerLayoutService: ViewerLayoutService, iiifContentSearchService: IiifContentSearchService, styleService: StyleService, altoService: AltoService, snackBar: MatSnackBar, intl: MimeViewerIntl);
    get onRotationChange(): Observable<number>;
    get onCenterChange(): Observable<Point>;
    get onCanvasGroupIndexChange(): Observable<number>;
    get onOsdReadyChange(): Observable<boolean>;
    initialize(): void;
    setConfig(config: MimeViewerConfig): void;
    getViewer(): any;
    getTilesources(): Resource[];
    getOverlays(): ReadonlyArray<SVGRectElement>;
    getZoom(): number;
    getMinZoom(): number;
    getMaxZoom(): number;
    home(): void;
    goToPreviousCanvasGroup(): void;
    goToNextCanvasGroup(): void;
    goToCanvasGroup(canvasGroupIndex: number, immediately: boolean): void;
    goToCanvas(canvasIndex: number, immediately: boolean): void;
    highlight(searchResult: SearchResult): void;
    private highlightCurrentHit;
    clearHightlight(): void;
    setUpViewer(manifest: Manifest, config: MimeViewerConfig): void;
    addSubscriptions(): void;
    hidePages(): void;
    showPages(): void;
    layoutPages(): void;
    addToWindow(): void;
    setupOverlays(): void;
    disableKeyDownHandler(): void;
    resetKeyDownHandler(): void;
    /**
     *
     * @param layoutSwitch true if switching between layouts
     * to keep current search-state and rotation
     */
    destroy(layoutSwitch?: boolean): void;
    addEvents(): void;
    zoomIn(zoomFactor?: number, position?: Point): void;
    zoomOut(zoomFactor?: number, position?: Point): void;
    rotate(): void;
    /**
     * Callback for mode-change
     * @param mode ViewerMode
     */
    modeChanged(mode: ModeChanges): void;
    private generateRandomId;
    /**
     * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
     */
    private toggleToDashboard;
    /**
     * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
     */
    private toggleToPage;
    /**
     * Scroll-handler
     */
    scrollHandler: (event: any) => void;
    /**
     * Pinch-handler
     */
    pinchHandler: (event: any) => void;
    /**
     *
     * @param point to zoom to. If not set, the viewer will zoom to center
     */
    zoomInGesture(position: Point, zoomFactor?: number): void;
    zoomOutGesture(position: Point, zoomFactor?: number): void;
    /**
     * Process zoom in pinch gesture (pinch out)
     *
     * Toggle to page mode and Zoom in
     *
     * @param event from pinch gesture
     */
    zoomInPinchGesture(event: any, zoomFactor: number): void;
    /**
     * Process zoom out pinch gesture (pinch in)
     *
     * Zoom out and toggle to dashboard when all zoomed out.
     * Stop between zooming out and toggling to dashboard.
     *
     * @param event from pinch gesture
     */
    zoomOutPinchGesture(event: any, zoomFactor: number): void;
    /**
     * Single-click-handler
     * Single-click toggles between page/dashboard-mode if a page is hit
     */
    singleClickHandler: (event: any) => void;
    /**
     * Double-click-handler
     * Double-click dashboard-mode should go to page-mode
     * Double-click page-mode should
     *    a) Zoom in if page is fitted vertically, or
     *    b) Fit vertically if page is already zoomed in
     */
    dblClickHandler: (event: any) => void;
    /**
     * Checks if hit element is a <rect>-element
     * @param target
     */
    isCanvasGroupHit(target: HTMLElement): boolean;
    /**
     * Iterates tilesources and adds them to viewer
     * Creates svg clickable overlays for each tile
     */
    createOverlays(): void;
    /**
     * Sets viewer size and opacity once the first canvas group has fully loaded
     */
    private initialCanvasGroupLoaded;
    /**
     * Returns overlay-index for click-event if hit
     * @param target hit <rect>
     */
    getOverlayIndexFromClickEvent(event: any): number;
    private calculateCurrentCanvasGroup;
    private dragHandler;
    private constraintCanvas;
    private getCurrentCanvasBounds;
    private isCanvasOutsideViewport;
    private constraintCanvasOutsideViewport;
    private constraintCanvasInsideViewport;
    private isCanvasBelowViewportTop;
    private isCanvasAboveViewportBottom;
    private swipeToCanvasGroup;
    private getViewportBounds;
    private getOriginalTarget;
    private panTo;
    private rotateToRight;
    private showRotationIsNotSupportetMessage;
    private setOpacityOnPages;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewerService>;
}

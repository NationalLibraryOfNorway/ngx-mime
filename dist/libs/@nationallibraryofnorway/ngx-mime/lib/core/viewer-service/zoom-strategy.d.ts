import { CanvasService } from '../canvas-service/canvas-service';
import { ModeService } from '../mode-service/mode.service';
import { Direction } from '../models/direction';
import { Point } from '../models/point';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
export interface CanvasGroup {
    canvasGroupIndex: number;
    canvasGroupEndHitCountReached?: boolean;
    direction: Direction;
    immediately: boolean;
}
export interface Strategy {
    setMinZoom(mode: ViewerMode): void;
    getMinZoom(): number;
    getMaxZoom(): number;
    getZoom(): number;
    goToHomeZoom(): void;
    zoomTo(level: number, position?: Point): void;
    zoomIn(zoomFactor?: number, position?: Point): void;
    zoomOut(zoomFactor?: number, position?: Point): void;
}
export declare class ZoomStrategy {
    protected viewer: any;
    protected canvasService: CanvasService;
    protected modeService: ModeService;
    protected viewerLayoutService: ViewerLayoutService;
    constructor(viewer: any, canvasService: CanvasService, modeService: ModeService, viewerLayoutService: ViewerLayoutService);
    setMinZoom(mode: ViewerMode): void;
    getMinZoom(): number;
    getMaxZoom(): number;
    getZoom(): number;
    goToHomeZoom(): void;
    zoomTo(level: number, position?: Point): void;
    private getHomeZoomLevel;
    zoomIn(zoomFactor?: number, position?: Point): void;
    zoomOut(zoomFactor?: number, position?: Point): void;
    private getDashboardViewportBounds;
    private getFittedZoomLevel;
    private zoomBy;
    private isViewportLargerThanCanvasGroup;
    private getHomeZoomFactor;
    private getDashboardZoomHomeFactor;
}
export declare class DefaultZoomStrategy extends ZoomStrategy implements Strategy {
    constructor(viewer: any, canvasService: CanvasService, modeService: ModeService, viewerLayoutService: ViewerLayoutService);
}

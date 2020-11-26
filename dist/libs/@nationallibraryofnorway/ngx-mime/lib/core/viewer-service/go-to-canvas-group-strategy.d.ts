import { CanvasService } from '../canvas-service/canvas-service';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeService } from '../mode-service/mode.service';
import { Direction } from '../models/direction';
import { ViewingDirection } from '../models/viewing-direction';
import { Strategy } from './zoom-strategy';
export interface CanvasGroup {
    canvasGroupIndex: number;
    direction?: Direction;
    immediately?: boolean;
}
export interface GoToCanvasGroupStrategy {
    goToCanvasGroup(canvasGroup: CanvasGroup): void;
    goToPreviousCanvasGroup(currentCanvasIndex: number): void;
    goToNextCanvasGroup(currentCanvasIndex: number): void;
    centerCurrentCanvas(): void;
}
export declare class DefaultGoToCanvasGroupStrategy implements GoToCanvasGroupStrategy {
    private viewer;
    private zoomStrategy;
    private canvasService;
    private modeService;
    private config;
    private viewingDirection;
    constructor(viewer: any, zoomStrategy: Strategy, canvasService: CanvasService, modeService: ModeService, config: MimeViewerConfig, viewingDirection: ViewingDirection);
    goToCanvasGroup(canvasGroup: CanvasGroup): void;
    goToPreviousCanvasGroup(currentCanvasIndex: number): void;
    goToNextCanvasGroup(currentCanvasIndex: number): void;
    centerCurrentCanvas(): void;
    private leftX;
    private rightX;
    private panToCenter;
    private panTo;
    private getViewportCenter;
    private getViewportBounds;
}

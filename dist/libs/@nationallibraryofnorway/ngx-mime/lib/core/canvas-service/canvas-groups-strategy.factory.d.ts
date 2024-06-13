import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewingDirection } from '../models/viewing-direction';
import { OneCanvasPerCanvasGroupStrategy } from './one-canvas-per-canvas-group-strategy';
import { TwoCanvasPerCanvasGroupStrategy } from './two-canvas-per-canvas-group-strategy';
export declare class CanvasGroupStrategyFactory {
    static create(layout: ViewerLayout, config: MimeViewerConfig, viewingDirection: ViewingDirection, rotation: number): OneCanvasPerCanvasGroupStrategy | TwoCanvasPerCanvasGroupStrategy;
}

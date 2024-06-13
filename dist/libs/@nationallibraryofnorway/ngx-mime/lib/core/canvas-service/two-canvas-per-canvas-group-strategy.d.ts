import { MimeViewerConfig } from '../mime-viewer-config';
import { CanvasGroups } from '../models/canvas-groups';
import { ViewingDirection } from '../models/viewing-direction';
import { AbstractCanvasGroupStrategy } from './canvas-group.strategy';
export declare class TwoCanvasPerCanvasGroupStrategy implements AbstractCanvasGroupStrategy {
    private config;
    private viewingDirection;
    private rotation;
    private positionStrategy;
    constructor(config: MimeViewerConfig, viewingDirection: ViewingDirection, rotation: number);
    addAll(tileSources: ReadonlyArray<any>): CanvasGroups;
    private addSinglePage;
    private addPairedPages;
    private hasNextPage;
    private createTileSourceAndRect;
    private calculatePosition;
    private getLastCanvasGroup;
    private getLastRect;
    private combineRects;
}

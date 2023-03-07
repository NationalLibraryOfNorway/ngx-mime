import { Point } from '../models/point';
import { Rect } from '../models/rect';
import { StyleService } from '../style-service/style.service';
export declare class CanvasGroupMask {
    private styleService;
    viewer: any;
    canvasGroupRect: Rect;
    leftMask: any;
    rightMask: any;
    disableResize: boolean;
    center: Point;
    backgroundColor: string;
    private subscriptions;
    constructor(viewer: any, styleService: StyleService);
    initialize(pageBounds: Rect, visible: boolean): void;
    destroy(): void;
    changeCanvasGroup(pageBounds: Rect): void;
    show(): void;
    hide(): void;
    private addHandlers;
    private removeHandlers;
    private animationHandler;
    private resizeHandler;
    private canvasGroupPinchHandler;
    private canvasGroupDragHandler;
    private canvasGroupDragEndHandler;
    private addCanvasGroupMask;
    private setCenter;
    private resize;
    private getLeftMaskRect;
    private getRightMaskRect;
    private unsubscribe;
}
//# sourceMappingURL=canvas-group-mask.d.ts.map
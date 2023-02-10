import { BehaviorSubject, Observable } from 'rxjs';
import { ViewerLayout } from '../models/viewer-layout';
import { CanvasGroups } from './../models/canvas-groups';
import { Point } from './../models/point';
import { Rect } from './../models/rect';
import * as i0 from "@angular/core";
export declare class CanvasService {
    protected _currentNumberOfCanvasGroups: BehaviorSubject<number>;
    protected _currentCanvasGroupIndex: BehaviorSubject<number>;
    protected canvasGroups: CanvasGroups;
    protected _numberOfCanvases: number;
    constructor();
    addAll(canvasRects: Rect[], layout: ViewerLayout): void;
    reset(): void;
    get onCanvasGroupIndexChange(): Observable<number>;
    get onNumberOfCanvasGroupsChange(): Observable<number>;
    set currentCanvasGroupIndex(currentCanvasGroupIndex: number);
    get currentCanvasGroupIndex(): number;
    get numberOfCanvases(): number;
    set numberOfCanvases(numberOfCanvases: number);
    get numberOfCanvasGroups(): number;
    get currentCanvasIndex(): number;
    isWithinBounds(canvasGroupIndex: number): boolean;
    isCurrentCanvasGroupValid(): boolean;
    getNextCanvasGroupIndex(): number;
    getPrevCanvasGroupIndex(): number;
    constrainToRange(canvasGroupsIndex: number): number;
    findClosestCanvasGroupIndex(point: Point): number;
    findCanvasGroupByCanvasIndex(canvasIndex: number): number;
    findCanvasByCanvasIndex(canvasIndex: number): number;
    getCanvasGroupLabel(canvasGroupIndex: number): string;
    getCanvasesPerCanvasGroup(canvasIndex: number): number[];
    getCanvasRect(canvasIndex: number): Rect;
    getCurrentCanvasGroupRect(): Rect;
    getCanvasGroupRect(canvasGroupIndex: number): Rect;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CanvasService>;
}
//# sourceMappingURL=canvas-service.d.ts.map
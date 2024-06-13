import { CanvasGroups } from './../models/canvas-groups';
export interface AbstractCanvasGroupStrategy {
    addAll(tileSources: ReadonlyArray<any>): CanvasGroups;
}

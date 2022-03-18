import { Sequence } from '../../../models/manifest';
import { ViewingDirection } from '../../../models/viewing-direction';
export declare class BuilderUtils {
    static extractId(value: any): any;
    static extracType(value: any): any;
    static extractContext(value: any): any;
    static extractViewingDirection(value: any): ViewingDirection;
    static findCanvasIndex(canvases: string[], sequences: Sequence[]): number;
}

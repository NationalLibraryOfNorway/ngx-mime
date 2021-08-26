import { Canvas } from '../models/manifest';
export declare class CanvasBuilder {
    private canvases;
    constructor(canvases: any[]);
    build(): Canvas[];
    private extractAltoUrl;
}

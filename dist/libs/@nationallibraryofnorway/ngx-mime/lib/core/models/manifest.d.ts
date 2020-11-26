import { ViewingDirection } from './viewing-direction';
export declare class Manifest {
    context?: string;
    type?: string;
    id?: string;
    viewingDirection?: ViewingDirection;
    label?: string;
    metadata?: Metadata[];
    license?: string;
    logo?: string;
    attribution?: string;
    service?: Service;
    sequences?: Sequence[];
    structures?: Structure[];
    tileSource?: Service[];
    viewingHint?: string;
    constructor(fields?: {
        context?: string;
        type?: string;
        id?: string;
        viewingDirection?: ViewingDirection;
        label?: string;
        metadata?: Metadata[];
        license?: string;
        logo?: string;
        attribution?: string;
        service?: Service;
        sequences?: Sequence[];
        structures?: Structure[];
        tileSource?: Service[];
        viewingHint?: string;
    });
}
export declare class Metadata {
    label: string;
    value: string | number;
    constructor(label: string, value: string | number);
}
export declare class Sequence {
    id?: string;
    type?: string;
    label?: string;
    viewingHint?: string;
    canvases?: Canvas[];
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        viewingHint?: string;
        canvases?: Canvas[];
    });
}
export declare class Canvas {
    id?: string;
    type?: string;
    label?: string;
    thumbnail?: string;
    height?: number;
    width?: number;
    images?: Images[];
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        thumbnail?: string;
        height?: number;
        width?: number;
        images?: Images[];
    });
}
export declare class Images {
    id: string;
    type: string;
    motivation: string;
    resource: Resource;
    on: string;
    constructor(fields?: {
        id?: string;
        type?: string;
        motivation?: string;
        resource?: Resource;
        on?: string;
    });
}
export declare class Resource {
    id: string;
    type: string;
    format: string;
    service: Service;
    height: number;
    width: number;
    constructor(fields?: {
        id?: string;
        type?: string;
        format?: string;
        service?: Service;
        height?: number;
        width?: number;
    });
}
export declare class Service {
    context?: string;
    id?: string;
    protocol?: string;
    width?: number;
    height?: number;
    sizes?: Size[];
    tiles?: Tile[];
    profile?: string;
    physicalScale?: number;
    physicalUnits?: string;
    service?: Service;
    constructor(fields?: {
        context?: string;
        id?: string;
        protocol?: string;
        width?: number;
        height?: number;
        sizes?: Size[];
        tiles?: Tile[];
        profile?: string;
        physicalScale?: number;
        physicalUnits?: string;
        service?: Service;
    });
}
export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
}
export declare class Tile {
    width: number;
    scaleFactors: number[];
    constructor(fields?: {
        width?: number;
        scaleFactors?: number[];
    });
}
export declare class Structure {
    id: string;
    type: string;
    label: string;
    canvases: string[];
    canvasIndex: number;
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        canvases?: string[];
        canvasIndex?: number;
    });
}
export declare class TileSource {
}

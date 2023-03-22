import { Rect } from './rect';
export declare class Hit {
    id: number;
    index: number;
    label: string;
    match: string;
    before: string;
    after: string;
    rects: Rect[];
    constructor(fields?: {
        id?: number;
        index?: number;
        label?: string;
        match?: string;
        before?: string;
        after?: string;
        rects?: Rect[];
    });
}

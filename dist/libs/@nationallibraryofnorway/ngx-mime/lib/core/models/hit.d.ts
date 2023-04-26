import { HighlightRect } from './highlight-rect';
export declare class Hit {
    id: number;
    index: number;
    label: string;
    match: string;
    before: string;
    after: string;
    highlightRects: HighlightRect[];
    constructor(fields?: {
        id?: number;
        index?: number;
        label?: string;
        match?: string;
        before?: string;
        after?: string;
        highlightRects?: HighlightRect[];
    });
}

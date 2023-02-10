import { Hit } from './hit';
export declare class SearchResult {
    q: string;
    hits: Hit[];
    constructor(fields?: {
        q?: string;
        hits?: Hit[];
    });
    add(hit: Hit): void;
    get(index: number): Hit;
    size(): number;
    last(): Hit;
}
//# sourceMappingURL=search-result.d.ts.map
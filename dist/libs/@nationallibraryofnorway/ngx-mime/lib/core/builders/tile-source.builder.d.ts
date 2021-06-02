import { Resource, Sequence } from '../models/manifest';
export declare class TileSourceBuilder {
    private sequences;
    constructor(sequences: Sequence[]);
    build(): Resource[];
}

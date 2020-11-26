import { Sequence, Service } from '../models/manifest';
export declare class TileSourceBuilder {
    private sequences;
    constructor(sequences: Sequence[]);
    build(): Service[];
}

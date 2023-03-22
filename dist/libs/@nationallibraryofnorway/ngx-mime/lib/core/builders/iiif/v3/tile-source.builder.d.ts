import { Resource } from '../../../models/manifest';
export declare class TileSourceBuilder {
    private items;
    constructor(items: any[]);
    build(): Resource[];
    private flattenService;
}

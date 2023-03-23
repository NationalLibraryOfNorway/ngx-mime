import { Resource } from '../models/manifest';
export interface TileSourceStrategy {
    getTileSource(resource: Resource): any;
}

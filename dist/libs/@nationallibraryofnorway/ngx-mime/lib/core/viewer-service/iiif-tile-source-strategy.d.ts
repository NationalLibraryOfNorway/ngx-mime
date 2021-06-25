import { Resource } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';
export declare class IiifTileSourceStrategy implements TileSourceStrategy {
    getTileSource(resource: Resource): any;
}

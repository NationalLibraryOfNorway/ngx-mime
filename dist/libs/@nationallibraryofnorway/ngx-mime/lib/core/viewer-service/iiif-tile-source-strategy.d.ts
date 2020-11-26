import { Service } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';
export declare class IiifTileSourceStrategy implements TileSourceStrategy {
    getTileSource(resource: Service): any;
}

import { Service } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';
export declare class StaticImageTileSourceStrategy implements TileSourceStrategy {
    getTileSource(resource: Service | any): any;
}

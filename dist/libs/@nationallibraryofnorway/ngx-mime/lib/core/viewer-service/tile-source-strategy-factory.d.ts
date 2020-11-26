import { Service } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';
export declare class TileSourceStrategyFactory {
    static create(resource: Service): TileSourceStrategy;
}

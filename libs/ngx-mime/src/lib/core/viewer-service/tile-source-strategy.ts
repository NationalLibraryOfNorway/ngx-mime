import { Service } from '../models/manifest';

export interface TileSourceStrategy {
  getTileSource(resource: Service): any;
}

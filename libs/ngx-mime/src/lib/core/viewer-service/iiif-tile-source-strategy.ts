import { Service } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';

export class IiifTileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: Service): any {
    let tileSource: any;
    if (resource.service.service) {
      tileSource = resource.service;
    } else {
      tileSource = resource.service['@id'];
      tileSource = tileSource.startsWith('//')
        ? `${location.protocol}${tileSource}`
        : tileSource;
      tileSource = !tileSource.endsWith('/info.json')
        ? `${tileSource}/info.json`
        : tileSource;
    }
    return tileSource;
  }
}

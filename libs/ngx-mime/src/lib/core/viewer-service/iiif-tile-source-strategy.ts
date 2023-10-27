import { Resource } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';

export class IiifTileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: Resource): any {
    let tileSource: any;
    if (resource?.service?.service) {
      tileSource = resource.service;
    } else {
      tileSource = (<any>resource.service)['@id'];
      if (!tileSource) {
        tileSource = (<any>resource)['@id'];
      }

      tileSource =
        tileSource && tileSource.startsWith('//')
          ? `${location.protocol}${tileSource}`
          : tileSource;
      tileSource =
        tileSource && !tileSource.endsWith('/info.json')
          ? `${tileSource}/info.json`
          : tileSource;
    }
    return tileSource;
  }
}

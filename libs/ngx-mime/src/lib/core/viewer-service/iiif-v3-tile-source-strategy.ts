import { buildInlineImageSource } from '../builders/iiif/image-source';
import { Resource } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';

export class IiifV3TileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: Resource): any {
    return buildInlineImageSource(resource.service) || resource.service?.id;
  }
}

import { ImageSourceBuilder } from '../builders/iiif/image-source.builder';
import { Resource } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';

export class IiifV3TileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: Resource): any {
    return new ImageSourceBuilder(resource).build() || resource.service?.id;
  }
}

import { Images } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ResourceBuilder } from './resource.builder';

export class ImagesBuilder {
  constructor(private images: any[]) {}

  build(): Images[] {
    const images: Images[] = [];
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        images.push(
          new Images({
            id: BuilderUtils.extractId(image),
            type: BuilderUtils.extracType(image),
            motivation: image.motivation,
            resource: new ResourceBuilder(image.resource).build(),
            on: image.on,
          }),
        );
      }
    }
    return images;
  }
}

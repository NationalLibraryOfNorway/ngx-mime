import { Images } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ResourceBuilder } from './resource.builder';

export class ImagesBuilder {
  constructor(private images: any[]) {}

  build(): Images[] {
    const images: Images[] = [];

    if (this.images) {
      this.images.forEach((i) => {
        if (i.items) {
          i.items.forEach((image: any) => {
            images.push(
              new Images({
                id: BuilderUtils.extractId(image),
                type: BuilderUtils.extracType(image),
                resource: new ResourceBuilder(image.body).build(),
                motivation: image.motivation,
                on: image.target,
              }),
            );
          });
        }
      });
    }
    return images;
  }
}

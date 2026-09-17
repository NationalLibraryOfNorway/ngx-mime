import { Resource, Service } from '../../models/manifest';

export class ImageSourceBuilder {
  constructor(private resource: Resource) {}

  build(): object | null {
    const service = this.resource.service;

    if (!this.hasImageDimensions(service)) {
      return null;
    }

    return {
      '@context':
        service.context ||
        (service.type === 'ImageService3'
          ? 'http://iiif.io/api/image/3/context.json'
          : 'http://iiif.io/api/image/2/context.json'),
      id: service.id,
      protocol: service.protocol || 'http://iiif.io/api/image',
      width: service.width,
      height: service.height,
      sizes: service.sizes,
      tiles: service.tiles,
      profile: service.profile,
    };
  }

  private hasImageDimensions(service?: Service): service is Service {
    return Boolean(service?.id && service.width && service.height);
  }
}

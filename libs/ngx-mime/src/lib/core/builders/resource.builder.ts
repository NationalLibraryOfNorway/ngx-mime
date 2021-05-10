import { Resource } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ServiceBuilder } from './service.builder';

export class ResourceBuilder {
  constructor(private resource: any) {}

  build(): Resource {
    if (!this.resource) {
      throw new Error('No resource');
    }
    return new Resource({
      id: BuilderUtils.extractId(this.resource),
      type: BuilderUtils.extracType(this.resource),
      format: this.resource.format,
      service: new ServiceBuilder(this.resource.service).build(),
      height: this.resource.height,
      width: this.resource.width,
    });
  }
}

import { Metadata } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';

export class MetadataBuilder {
  constructor(private metadatas: any) {}

  build(): Metadata[] {
    const metadatas: Metadata[] = [];
    if (this.metadatas) {
      for (let i = 0; i < this.metadatas.length; i++) {
        const data = this.metadatas[i];
        metadatas.push(
          new Metadata(
            BuilderUtils.extractLanguageValue(data.label),
            BuilderUtils.extractLanguageValue(data.value)
          )
        );
      }
    }
    return metadatas;
  }
}

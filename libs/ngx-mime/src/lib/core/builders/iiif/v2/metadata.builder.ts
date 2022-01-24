import { Metadata } from '../../../models/manifest';

export class MetadataBuilder {
  constructor(private metadatas: any) {}

  build(): Metadata[] {
    const metadatas: Metadata[] = [];
    if (this.metadatas) {
      for (let i = 0; i < this.metadatas.length; i++) {
        const data = this.metadatas[i];
        metadatas.push(new Metadata(data.label, data.value));
      }
    }
    return metadatas;
  }
}

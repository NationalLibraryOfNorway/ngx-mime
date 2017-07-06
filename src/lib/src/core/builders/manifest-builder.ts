import { Manifest, Metadata, TileSource } from '../models/manifest';
export class ManifestBuilder {
  constructor(private data: any) {}

  build(): Manifest {
    return new Manifest({
      context: this.data['@context'],
      type: this.data['@type'],
      id: this.data['@id'],
      label: this.data.label,
      attribution: this.data.attribution,
      metadata: new MetadataBuilder(this.data.metadata).build(),
      tileSource: new TileSourceBuilder(this.data.sequences[0].canvases).build()
    });
  }
}

export class MetadataBuilder {
  constructor(private metadatas: any) { }

  build(): Metadata[] {
    let metadatas: Metadata[] = [];
    if (this.metadatas) {
      for (let i = 0; i < this.metadatas.length; i++) {
        const data = this.metadatas[i];
        metadatas.push(new Metadata(data.label, data.value));
      }
    }
    return metadatas;
  }
}

export class TileSourceBuilder {
  constructor(private canvases: any) { }

  build(): TileSource[] {
    let tilesources: TileSource[] = [];
    for (let i = 0; i < this.canvases.length; i++) {
      const canvas = this.canvases[i];
      if (canvas) {
        tilesources.push(canvas.images[0].resource.service);
      }
    }
    return tilesources;
  }
}

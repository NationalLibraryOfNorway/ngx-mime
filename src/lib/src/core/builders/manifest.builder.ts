import {
  Canvas, Images, Manifest, Metadata, Resource,
  Sequence, Service, Size, Tile
} from '../models/manifest';

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
      sequences: new SequenceBuilder(this.data.sequences).build(),
      tileSource: new TileSourceBuilder(this.data.sequences).build()
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

export class SequenceBuilder {
  constructor(private sequences: any[]) { }

  build(): Sequence[] {
    let sequences: Sequence[] = [];
    if (this.sequences) {
      for (let i = 0; i < this.sequences.length; i++) {
        const seq = this.sequences[i];
        sequences.push(new Sequence({
          id: seq['@id'],
          type: seq['@type'],
          label: seq.label,
          viewingHint: seq.viewingHint,
          canvases: new CanvasBuilder(seq.canvases).build()
        }));
      }
    }
    return sequences;
  }
}

export class CanvasBuilder {
  constructor(private canvases: any[]) { }

  build(): Canvas[] {
    let canvases: Canvas[] = [];
    if (this.canvases) {
      for (let i = 0; i < this.canvases.length; i++) {
        const canvas = this.canvases[i];
        canvases.push(new Canvas({
          id: canvas['@id'],
          type: canvas['@type'],
          label: canvas.label,
          thumbnail: canvas.thumbnail,
          height: canvas.height,
          width: canvas.width,
          images: new ImagesBuilder(canvas.images).build()
        }));
      }
    }
    return canvases;
  }
}

export class ImagesBuilder {
  constructor(private images: any[]) { }

  build(): Images[] {
    let images: Images[] = [];
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        images.push(new Images({
          id: image['@id'],
          type: image['@type'],
          motivation: image.motivation,
          resource: new ResourceBuilder(image.resource).build(),
          on: image.on
        }));
      }
    }
    return images;
  }
}

export class ResourceBuilder {
  constructor(private resource: any) { }

  build(): Resource {
    if (this.resource) {
      return new Resource({
        id: this.resource['@id'],
        type: this.resource['@id'],
        format: this.resource.format,
        service: new ServiceBuilder(this.resource.service).build()
      });
    }
    return null;
  }
}

export class ServiceBuilder {
  constructor(private service: any) { }

  build(): Service {
    if (this.service) {
      return new Service({
        context: this.service['@context'],
        id: this.service['@id'],
        protocol: this.service.protocol,
        width: this.service.width,
        height: this.service.height,
        sizes: new SizesBuilder(this.service.sizes).build(),
        tiles: new TilesBuilder(this.service.tiles).build(),
        profile: this.service.profile,
        physicalScale: this.service.physicalScale,
        physicalUnits: this.service.physicalUnits,
        service: new ServiceBuilder(this.service.service).build()
      });
    }
    return null;
  }
}

export class SizesBuilder {
  constructor(private sizes: any[]) { }

  build(): Size[] {
    let sizes: Size[] = [];
    if (this.sizes) {
      for (let i = 0; i < this.sizes.length; i++) {
        const size = this.sizes[i];
        sizes.push(new Size(size.width, size.height));
      }
    }
    return sizes;
  }
}

export class TilesBuilder {
  constructor(private tiles: any[]) { }

  build(): Tile[] {
    let tiles: Tile[] = [];
    if (this.tiles) {
      for (let i = 0; i < this.tiles.length; i++) {
        const tile = this.tiles[i];
        tiles.push(new Tile({
          width: tile.width,
          scaleFactors: tile.scaleFactors
        }));
      }
    }
    return tiles;
  }
}

export class TileSourceBuilder {
  constructor(private sequences: Sequence[]) { }

  build(): Service[] {
    let tilesources: Service[] = [];
    if (this.sequences && this.sequences.length > 0) {
      const canvases = this.sequences[0].canvases;
      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        if (canvas) {
          tilesources.push(canvas.images[0].resource.service);
        }
      }
    }
    return tilesources;
  }
}

import { Sequence, Service } from '../models/manifest';

export class TileSourceBuilder {
  constructor(private sequences: Sequence[]) {}

  build(): Service[] {
    const tilesources: Service[] = [];
    if (this.sequences && this.sequences.length > 0) {
      const canvases = this.sequences[0].canvases;
      for (let i = 0; canvases && i < canvases.length; i++) {
        const canvas = canvases[i];
        if (canvas) {
          if (canvas.images && canvas.images.length >= 0) {
            const resource = canvas.images[0].resource;
            if (resource && resource.service) {
              tilesources.push(resource.service);
            }
          }
        }
      }
    }
    return tilesources;
  }
}

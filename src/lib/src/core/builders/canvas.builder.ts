import { Canvas } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ImagesBuilder } from './images.builder';

export class CanvasBuilder {
  constructor(private canvases: any[]) {}

  build(): Canvas[] {
    const canvases: Canvas[] = [];
    if (this.canvases) {
      for (let i = 0; i < this.canvases.length; i++) {
        const canvas = this.canvases[i];
        canvases.push(
          new Canvas({
            id: BuilderUtils.extractId(canvas),
            type: BuilderUtils.extracType(canvas),
            label: canvas.label,
            thumbnail: canvas.thumbnail,
            height: canvas.height,
            width: canvas.width,
            images: new ImagesBuilder(canvas.images).build()
          })
        );
      }
    }
    return canvases;
  }
}

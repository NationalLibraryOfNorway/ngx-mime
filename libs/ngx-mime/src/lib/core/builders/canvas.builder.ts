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
        const seeAlso = canvas.seeAlso ? canvas.seeAlso : [];
        if (canvas['@seeAlso']) {
          seeAlso.push(canvas['@seeAlso']);
        }

        canvases.push(
          new Canvas({
            id: BuilderUtils.extractId(canvas),
            type: BuilderUtils.extracType(canvas),
            label: canvas.label,
            thumbnail: canvas.thumbnail,
            height: canvas.height,
            width: canvas.width,
            images: new ImagesBuilder(canvas.images).build(),
            altoUrl: this.extractAltoUrl(seeAlso),
          })
        );
      }
    }
    return canvases;
  }

  private extractAltoUrl(seeAlso: any[]): string | undefined {
    if (!seeAlso) {
      return undefined;
    }

    const altoService = seeAlso.find(
      (s: any) => s.format === 'application/alto+xml'
    );
    return altoService ? BuilderUtils.extractId(altoService) : undefined;
  }
}

import { Canvas } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ImagesBuilder } from './images.builder';

export class CanvasBuilder {
  constructor(private canvases: any[]) {}

  build(): Canvas[] {
    const canvases: Canvas[] = [];
    if (this.canvases) {
      for (let i = 0; i < this.canvases.length; i++) {
        const canvas = this.canvases[i];
        let seeAlso: any[] = [];

        if (canvas.seeAlso) {
          seeAlso = seeAlso.concat(canvas.seeAlso);
        }

        canvases.push(
          new Canvas({
            id: BuilderUtils.extractId(canvas),
            type: BuilderUtils.extracType(canvas),
            label: canvas.label,
            height: canvas.height,
            width: canvas.width,
            images: new ImagesBuilder(canvas.items).build(),
            altoUrl: this.extractAltoUrl(seeAlso),
          }),
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
      (s) => s?.format === 'application/alto+xml',
    );
    return altoService ? BuilderUtils.extractId(altoService) : undefined;
  }
}

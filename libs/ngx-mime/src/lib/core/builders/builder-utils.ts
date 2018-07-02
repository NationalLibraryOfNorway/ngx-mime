import { Canvas, Sequence } from '../models/manifest';
import { ViewingDirection } from '../models/viewing-direction';

export class BuilderUtils {
  static extractId(value: any): any {
    return value['@id'];
  }

  static extracType(value: any): any {
    return value['@type'];
  }

  static extractContext(value: any): any {
    return value['@context'];
  }

  static extractViewingDirection(value: any): ViewingDirection {
    if (value['viewingDirection'] === 'left-to-right') {
      return ViewingDirection.LTR;
    } else if (value['viewingDirection'] === 'right-to-left') {
      return ViewingDirection.RTL;
    }
  }

  static findCanvasIndex(canvases: string[], sequences: Sequence[]): number {
    let index = -1;
    if (sequences[0] && sequences[0].canvases && canvases[0]) {
      index = sequences[0].canvases.findIndex(
        (canvas: Canvas) => canvas.id === canvases[0]
      );
    }
    return index;
  }
}

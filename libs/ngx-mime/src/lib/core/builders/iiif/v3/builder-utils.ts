import { Canvas } from '../../../models/manifest';
import { ViewingDirection } from '../../../models/viewing-direction';

export class BuilderUtils {
  static extractId(value: any): any {
    return value['id'];
  }

  static extracType(value: any): any {
    return value['type'];
  }

  static extractContext(value: any): any {
    return value['@context'];
  }

  static extractViewingDirection(value: any): ViewingDirection {
    if (value['viewingDirection'] === 'right-to-left') {
      return ViewingDirection.RTL;
    } else {
      return ViewingDirection.LTR;
    }
  }

  static extractViewingHint(value: any): string | undefined {
    if (Array.isArray(value)) {
      return value[0];
    }
    return undefined;
  }

  static findCanvasIndex(canvases: any[], sequences: any[]): number {
    let index = -1;
    if (canvases[0]) {
      index = sequences.findIndex(
        (canvas: Canvas) => canvas.id === canvases[0].id
      );
    }
    return index;
  }

  static extractLogo(provider: any[] | undefined): string | undefined {
    let logo;
    if (Array.isArray(provider)) {
      logo = this.extractId(provider[0].logo[0]);
    }
    return logo;
  }

  static extractLanguageValue(
    data: Record<string, string[]>,
    preferredLanguage?: string
  ): string {
    if (!data) {
      return '';
    }
    const key =
      preferredLanguage && data[preferredLanguage]
        ? preferredLanguage
        : this.extractDefaultLanguage(data);
    return data[key][0];
  }

  static extractDefaultLanguage(data: Record<string, string[]>): string {
    return Object.keys(data)[0];
  }
}

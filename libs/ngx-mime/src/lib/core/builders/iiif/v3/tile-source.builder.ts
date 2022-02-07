import { Resource, Sequence } from '../../../models/manifest';

export class TileSourceBuilder {
  constructor(private items: any[]) {}

  build(): Resource[] {
    const tilesources: Resource[] = [];
    if (this.items && this.items.length > 0) {
      this.items.forEach((canvas) => {
        if (canvas.type === 'Canvas') {
          canvas.items.forEach((annotationPage: any) => {
            if (annotationPage.type === 'AnnotationPage') {
              annotationPage.items.forEach((annotation: any) => {
                if (annotation.type === 'Annotation') {
                  const body = annotation.body;
                  if (body) {
                    tilesources.push(body);
                  }
                }
              });
            }
          });
        }
      });
    }
    return tilesources;
  }
}

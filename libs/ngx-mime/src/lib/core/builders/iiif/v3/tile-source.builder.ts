import { Resource } from '../../../models/manifest';

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
                  let body = annotation.body;
                  if (body) {
                    body.service = this.flattenService(body.service);
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

  private flattenService(service: any): any {
    if (Array.isArray(service) && service.length === 1) {
      return {
        ...service[0],
        service: this.flattenService(service[0].service),
      };
    }
    return service;
  }
}

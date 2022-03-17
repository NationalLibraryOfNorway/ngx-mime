export class TileSourceBuilder {
    constructor(items) {
        this.items = items;
    }
    build() {
        const tilesources = [];
        if (this.items && this.items.length > 0) {
            this.items.forEach((canvas) => {
                if (canvas.type === 'Canvas') {
                    canvas.items.forEach((annotationPage) => {
                        if (annotationPage.type === 'AnnotationPage') {
                            annotationPage.items.forEach((annotation) => {
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
    flattenService(service) {
        if (Array.isArray(service) && service.length === 1) {
            return {
                ...service[0],
                service: this.flattenService(service[0].service),
            };
        }
        return service;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1zb3VyY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjMvdGlsZS1zb3VyY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW9CLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsTUFBTSxXQUFXLEdBQWUsRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFtQixFQUFFLEVBQUU7d0JBQzNDLElBQUksY0FBYyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsRUFBRTs0QkFDNUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtnQ0FDL0MsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtvQ0FDcEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztvQ0FDM0IsSUFBSSxJQUFJLEVBQUU7d0NBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3Q0FDakQsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQ0FDeEI7aUNBQ0Y7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUFZO1FBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsRCxPQUFPO2dCQUNMLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ2pELENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcblxuZXhwb3J0IGNsYXNzIFRpbGVTb3VyY2VCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogUmVzb3VyY2VbXSB7XG4gICAgY29uc3QgdGlsZXNvdXJjZXM6IFJlc291cmNlW10gPSBbXTtcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoY2FudmFzKSA9PiB7XG4gICAgICAgIGlmIChjYW52YXMudHlwZSA9PT0gJ0NhbnZhcycpIHtcbiAgICAgICAgICBjYW52YXMuaXRlbXMuZm9yRWFjaCgoYW5ub3RhdGlvblBhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGFubm90YXRpb25QYWdlLnR5cGUgPT09ICdBbm5vdGF0aW9uUGFnZScpIHtcbiAgICAgICAgICAgICAgYW5ub3RhdGlvblBhZ2UuaXRlbXMuZm9yRWFjaCgoYW5ub3RhdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFubm90YXRpb24udHlwZSA9PT0gJ0Fubm90YXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgYm9keSA9IGFubm90YXRpb24uYm9keTtcbiAgICAgICAgICAgICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuc2VydmljZSA9IHRoaXMuZmxhdHRlblNlcnZpY2UoYm9keS5zZXJ2aWNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZXNvdXJjZXMucHVzaChib2R5KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRpbGVzb3VyY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBmbGF0dGVuU2VydmljZShzZXJ2aWNlOiBhbnkpOiBhbnkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHNlcnZpY2UpICYmIHNlcnZpY2UubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zZXJ2aWNlWzBdLFxuICAgICAgICBzZXJ2aWNlOiB0aGlzLmZsYXR0ZW5TZXJ2aWNlKHNlcnZpY2VbMF0uc2VydmljZSksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc2VydmljZTtcbiAgfVxufVxuIl19
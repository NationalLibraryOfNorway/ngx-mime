import { Canvas } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ImagesBuilder } from './images.builder';
export class CanvasBuilder {
    constructor(canvases) {
        this.canvases = canvases;
    }
    build() {
        const canvases = [];
        if (this.canvases) {
            for (let i = 0; i < this.canvases.length; i++) {
                const canvas = this.canvases[i];
                const seeAlso = canvas.seeAlso ? canvas.seeAlso : [];
                if (canvas['@seeAlso']) {
                    seeAlso.push(canvas['@seeAlso']);
                }
                canvases.push(new Canvas({
                    id: BuilderUtils.extractId(canvas),
                    type: BuilderUtils.extracType(canvas),
                    label: canvas.label,
                    thumbnail: canvas.thumbnail,
                    height: canvas.height,
                    width: canvas.width,
                    images: new ImagesBuilder(canvas.images).build(),
                    altoUrl: this.extractAltoUrl(seeAlso),
                }));
            }
        }
        return canvases;
    }
    extractAltoUrl(seeAlso) {
        if (!seeAlso) {
            return undefined;
        }
        const altoService = seeAlso.find((s) => s.format === 'application/alto+xml');
        return altoService ? BuilderUtils.extractId(altoService) : undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9jYW52YXMuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUFvQixRQUFlO1FBQWYsYUFBUSxHQUFSLFFBQVEsQ0FBTztJQUFHLENBQUM7SUFFdkMsS0FBSztRQUNILE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxRQUFRLENBQUMsSUFBSSxDQUNYLElBQUksTUFBTSxDQUFDO29CQUNULEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDbEMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO29CQUNyQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7b0JBQ25CLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDM0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7b0JBQ25CLE1BQU0sRUFBRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNoRCxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7aUJBQ3RDLENBQUMsQ0FDSCxDQUFDO2FBQ0g7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxjQUFjLENBQUMsT0FBYztRQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUM5QixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxzQkFBc0IsQ0FDaEQsQ0FBQztRQUNGLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5pbXBvcnQgeyBJbWFnZXNCdWlsZGVyIH0gZnJvbSAnLi9pbWFnZXMuYnVpbGRlcic7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYW52YXNlczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogQ2FudmFzW10ge1xuICAgIGNvbnN0IGNhbnZhc2VzOiBDYW52YXNbXSA9IFtdO1xuICAgIGlmICh0aGlzLmNhbnZhc2VzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FudmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXNlc1tpXTtcbiAgICAgICAgY29uc3Qgc2VlQWxzbyA9IGNhbnZhcy5zZWVBbHNvID8gY2FudmFzLnNlZUFsc28gOiBbXTtcbiAgICAgICAgaWYgKGNhbnZhc1snQHNlZUFsc28nXSkge1xuICAgICAgICAgIHNlZUFsc28ucHVzaChjYW52YXNbJ0BzZWVBbHNvJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FudmFzZXMucHVzaChcbiAgICAgICAgICBuZXcgQ2FudmFzKHtcbiAgICAgICAgICAgIGlkOiBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKGNhbnZhcyksXG4gICAgICAgICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZShjYW52YXMpLFxuICAgICAgICAgICAgbGFiZWw6IGNhbnZhcy5sYWJlbCxcbiAgICAgICAgICAgIHRodW1ibmFpbDogY2FudmFzLnRodW1ibmFpbCxcbiAgICAgICAgICAgIGhlaWdodDogY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsXG4gICAgICAgICAgICBpbWFnZXM6IG5ldyBJbWFnZXNCdWlsZGVyKGNhbnZhcy5pbWFnZXMpLmJ1aWxkKCksXG4gICAgICAgICAgICBhbHRvVXJsOiB0aGlzLmV4dHJhY3RBbHRvVXJsKHNlZUFsc28pLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYW52YXNlcztcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEFsdG9Vcmwoc2VlQWxzbzogYW55W10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICghc2VlQWxzbykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBhbHRvU2VydmljZSA9IHNlZUFsc28uZmluZChcbiAgICAgIChzOiBhbnkpID0+IHMuZm9ybWF0ID09PSAnYXBwbGljYXRpb24vYWx0byt4bWwnXG4gICAgKTtcbiAgICByZXR1cm4gYWx0b1NlcnZpY2UgPyBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKGFsdG9TZXJ2aWNlKSA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19
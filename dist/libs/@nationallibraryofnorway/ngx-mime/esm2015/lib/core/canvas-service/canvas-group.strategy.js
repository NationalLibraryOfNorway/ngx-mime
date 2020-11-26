import { Rect } from './../models/rect';
import { CanvasGroups } from './../models/canvas-groups';
export class OneCanvasPerCanvasGroupStrategy {
    constructor() {
        this.addAll = (canvasRects) => {
            const canvasGroups = new CanvasGroups();
            canvasGroups.addRange(canvasRects);
            canvasGroups.canvasRects = canvasRects;
            for (let i = 0; i < canvasRects.length; i++) {
                canvasGroups.canvasesPerCanvasGroup.push([i]);
            }
            return canvasGroups;
        };
    }
}
export class TwoCanvasPerCanvasGroupStrategy {
    constructor() {
        this.addAll = (canvasRects) => {
            const canvasGroups = new CanvasGroups();
            // Single first page
            canvasGroups.add(canvasRects[0]);
            canvasGroups.canvasRects = canvasRects;
            canvasGroups.canvasesPerCanvasGroup.push([0]);
            for (let i = 1; i < canvasRects.length; i = i + 2) {
                if (i + 1 < canvasRects.length) {
                    // Paired pages
                    const thisRect = canvasRects[i];
                    const nextRect = canvasRects[i + 1];
                    const groupedRect = new Rect({
                        x: Math.min(thisRect.x, nextRect.x),
                        y: Math.min(thisRect.y, nextRect.y),
                        height: Math.max(thisRect.height, nextRect.height),
                        width: thisRect.width + nextRect.width
                    });
                    canvasGroups.add(groupedRect);
                    canvasGroups.canvasesPerCanvasGroup.push([i, i + 1]);
                }
                else {
                    // Single last page, if applicable
                    canvasGroups.add(canvasRects[i]);
                    canvasGroups.canvasesPerCanvasGroup.push([i]);
                }
            }
            return canvasGroups;
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLWdyb3VwLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFNekQsTUFBTSxPQUFPLCtCQUErQjtJQUE1QztRQUVFLFdBQU0sR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRTtZQUMvQixNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkMsWUFBWSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUFBO0FBRUQsTUFBTSxPQUFPLCtCQUErQjtJQUE1QztRQUVFLFdBQU0sR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRTtZQUMvQixNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3hDLG9CQUFvQjtZQUNwQixZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFlBQVksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDOUIsZUFBZTtvQkFDZixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDO3dCQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO3dCQUNsRCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSztxQkFDdkMsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzlCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3REO3FCQUFNO29CQUNMLGtDQUFrQztvQkFDbEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO2FBQ0Y7WUFDRCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDLENBQUM7SUFDSixDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cHMgfSBmcm9tICcuLy4uL21vZGVscy9jYW52YXMtZ3JvdXBzJztcblxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENhbnZhc0dyb3VwU3RyYXRlZ3kge1xuICBhZGRBbGwoY2FudmFzUmVjdHM6IFJlY3RbXSk6IENhbnZhc0dyb3Vwcztcbn1cblxuZXhwb3J0IGNsYXNzIE9uZUNhbnZhc1BlckNhbnZhc0dyb3VwU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBBYnN0cmFjdENhbnZhc0dyb3VwU3RyYXRlZ3kge1xuICBhZGRBbGwgPSAoY2FudmFzUmVjdHM6IFJlY3RbXSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwcyA9IG5ldyBDYW52YXNHcm91cHMoKTtcbiAgICBjYW52YXNHcm91cHMuYWRkUmFuZ2UoY2FudmFzUmVjdHMpO1xuICAgIGNhbnZhc0dyb3Vwcy5jYW52YXNSZWN0cyA9IGNhbnZhc1JlY3RzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FudmFzUmVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLnB1c2goW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhc0dyb3VwcztcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFR3b0NhbnZhc1BlckNhbnZhc0dyb3VwU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBBYnN0cmFjdENhbnZhc0dyb3VwU3RyYXRlZ3kge1xuICBhZGRBbGwgPSAoY2FudmFzUmVjdHM6IFJlY3RbXSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwcyA9IG5ldyBDYW52YXNHcm91cHMoKTtcbiAgICAvLyBTaW5nbGUgZmlyc3QgcGFnZVxuICAgIGNhbnZhc0dyb3Vwcy5hZGQoY2FudmFzUmVjdHNbMF0pO1xuICAgIGNhbnZhc0dyb3Vwcy5jYW52YXNSZWN0cyA9IGNhbnZhc1JlY3RzO1xuICAgIGNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLnB1c2goWzBdKTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2FudmFzUmVjdHMubGVuZ3RoOyBpID0gaSArIDIpIHtcbiAgICAgIGlmIChpICsgMSA8IGNhbnZhc1JlY3RzLmxlbmd0aCkge1xuICAgICAgICAvLyBQYWlyZWQgcGFnZXNcbiAgICAgICAgY29uc3QgdGhpc1JlY3QgPSBjYW52YXNSZWN0c1tpXTtcbiAgICAgICAgY29uc3QgbmV4dFJlY3QgPSBjYW52YXNSZWN0c1tpICsgMV07XG4gICAgICAgIGNvbnN0IGdyb3VwZWRSZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICAgIHg6IE1hdGgubWluKHRoaXNSZWN0LngsIG5leHRSZWN0LngpLFxuICAgICAgICAgIHk6IE1hdGgubWluKHRoaXNSZWN0LnksIG5leHRSZWN0LnkpLFxuICAgICAgICAgIGhlaWdodDogTWF0aC5tYXgodGhpc1JlY3QuaGVpZ2h0LCBuZXh0UmVjdC5oZWlnaHQpLFxuICAgICAgICAgIHdpZHRoOiB0aGlzUmVjdC53aWR0aCArIG5leHRSZWN0LndpZHRoXG4gICAgICAgIH0pO1xuICAgICAgICBjYW52YXNHcm91cHMuYWRkKGdyb3VwZWRSZWN0KTtcbiAgICAgICAgY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAucHVzaChbaSwgaSArIDFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNpbmdsZSBsYXN0IHBhZ2UsIGlmIGFwcGxpY2FibGVcbiAgICAgICAgY2FudmFzR3JvdXBzLmFkZChjYW52YXNSZWN0c1tpXSk7XG4gICAgICAgIGNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLnB1c2goW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhc0dyb3VwcztcbiAgfTtcbn1cbiJdfQ==
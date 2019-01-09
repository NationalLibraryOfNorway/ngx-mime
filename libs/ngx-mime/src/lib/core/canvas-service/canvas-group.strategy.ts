import { Rect } from './../models/rect';
import { CanvasGroups } from './../models/canvas-groups';

export interface AbstractCanvasGroupStrategy {
  addAll(canvasRects: Rect[]): CanvasGroups;
}

export class OneCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy {
  addAll = (canvasRects: Rect[]) => {
    const canvasGroups = new CanvasGroups();
    canvasGroups.addRange(canvasRects);
    canvasGroups.canvasRects = canvasRects;
    for (let i = 0; i < canvasRects.length; i++) {
      canvasGroups.canvasesPerCanvasGroup.push([i]);
    }
    return canvasGroups;
  };
}

export class TwoCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy {
  addAll = (canvasRects: Rect[]) => {
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
      } else {
        // Single last page, if applicable
        canvasGroups.add(canvasRects[i]);
        canvasGroups.canvasesPerCanvasGroup.push([i]);
      }
    }
    return canvasGroups;
  };
}

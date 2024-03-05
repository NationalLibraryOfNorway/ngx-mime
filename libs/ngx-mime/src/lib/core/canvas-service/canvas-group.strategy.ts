import { TwoPageCalculateCanvasGroupPositionStrategy } from '../canvas-group-position/two-page-calculate-page-position-strategy';
import { CanvasGroups } from './../models/canvas-groups';
import { Rect } from './../models/rect';
import { CanvasGroup, TileSourceAndRect } from './tile-source-and-rect.model';

export interface AbstractCanvasGroupStrategy {
  addAll(canvasRects: CanvasGroup[]): CanvasGroups;
}

export class OneCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy
{
  addAll = (canvasRects: ReadonlyArray<CanvasGroup>) => {
    const canvasGroups = new CanvasGroups();
    canvasGroups.addRange(canvasRects);
    canvasGroups.canvasRects = canvasRects.map((canvasRect) => {
      return {
        tileSource: canvasRect.canvases[0].tileSource,
        rect: canvasRect.canvases[0].rect,
      };
    });

    for (let i = 0; i < canvasRects.length; i++) {
      canvasGroups.canvasesPerCanvasGroup.push([i]);
    }
    return canvasGroups;
  };
}

export class TwoCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy
{
  constructor(
    private config: any,
    private viewingDirection: any,
    private rotation: any,
  ) {}

  addAll = (tileSources: ReadonlyArray<any>) => {
    const canvasGroups = new CanvasGroups();

    // Single first page
    const positionStrategy = new TwoPageCalculateCanvasGroupPositionStrategy(
      this.config,
    );
    const position = positionStrategy.calculateCanvasGroupPosition(
      {
        canvasGroupIndex: 0,
        canvasSource: tileSources[0],
        previousCanvasGroupPosition: new Rect(),
        viewingDirection: this.viewingDirection,
      },
      this.rotation,
    );

    const first: TileSourceAndRect = {
      tileSource: tileSources[0],
      rect: position,
    };
    const gr: CanvasGroup = {
      canvases: [first],
      rect: position,
    };

    canvasGroups.add(gr);
    canvasGroups.canvasesPerCanvasGroup.push([0]);

    for (let i = 1; i < tileSources.length; i = i + 2) {
      if (i + 1 < tileSources.length) {
        // Paired pages

        const prev =
          canvasGroups.canvasGroupRects[
            canvasGroups.canvasGroupRects.length - 1
          ];

        const thisRect: TileSourceAndRect = {
          tileSource: tileSources[i],
          rect: positionStrategy.calculateCanvasGroupPosition(
            {
              canvasGroupIndex: i,
              canvasSource: tileSources[i],
              previousCanvasGroupPosition: prev.rect,
              viewingDirection: this.viewingDirection,
            },
            this.rotation,
          ),
        };

        const nextRect: TileSourceAndRect = {
          tileSource: tileSources[i + 1],
          rect: positionStrategy.calculateCanvasGroupPosition(
            {
              canvasGroupIndex: i + 1,
              canvasSource: tileSources[i + 1],
              previousCanvasGroupPosition: thisRect.rect,
              viewingDirection: this.viewingDirection,
            },
            this.rotation,
          ),
        };

        const groupedRect: CanvasGroup = {
          canvases: [thisRect, nextRect],
          rect: new Rect({
            x: Math.min(thisRect.rect.x, nextRect.rect.x),
            y: Math.min(thisRect.rect.y, nextRect.rect.y),
            height: Math.max(thisRect.rect.height, nextRect.rect.height),
            width: thisRect.rect.width + nextRect.rect.width,
          }),
        };

        canvasGroups.add(groupedRect);
        canvasGroups.canvasesPerCanvasGroup.push([i, i + 1]);
      } else {
        // Single last page, if applicable
        const prev =
          canvasGroups.canvasGroupRects[
            canvasGroups.canvasGroupRects.length - 1
          ];

        const position = positionStrategy.calculateCanvasGroupPosition(
          {
            canvasGroupIndex: i,
            canvasSource: tileSources[i],
            previousCanvasGroupPosition: prev.rect,
            viewingDirection: this.viewingDirection,
          },
          this.rotation,
        );

        const last: TileSourceAndRect = {
          tileSource: tileSources[i],
          rect: position,
        };

        const gr: CanvasGroup = {
          canvases: [last],
          rect: position,
        };

        canvasGroups.add(gr);
        canvasGroups.canvasesPerCanvasGroup.push([i]);
      }
    }
    return canvasGroups;
  };
}

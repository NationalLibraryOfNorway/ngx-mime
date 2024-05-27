import { OnePageCalculatePagePositionStrategy } from '../canvas-group-position/one-page-calculate-page-position-strategy';
import { TwoPageCalculateCanvasGroupPositionStrategy } from '../canvas-group-position/two-page-calculate-page-position-strategy';
import { CanvasGroups } from './../models/canvas-groups';
import { Rect } from './../models/rect';
import { CanvasGroup, TileSourceAndRect } from './tile-source-and-rect.model';

export interface AbstractCanvasGroupStrategy {
  addAll(tileSources: ReadonlyArray<any>): CanvasGroups;
}

export class OneCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy
{
  constructor(
    private config: any,
    private viewingDirection: any,
    private rotation: any,
  ) {}

  addAll = (tileSources: ReadonlyArray<any>) => {
    const canvasGroups = new CanvasGroups();

    const positionStrategy = new OnePageCalculatePagePositionStrategy(
      this.config,
    );

    tileSources.forEach((tileSource, i) => {
      const prev =
        i === 0
          ? undefined
          : canvasGroups.canvasGroupRects[
              canvasGroups.canvasGroupRects.length - 1
            ];

      const position = positionStrategy.calculateCanvasGroupPosition(
        {
          canvasGroupIndex: i,
          canvasSource: tileSource,
          previousCanvasGroupPosition: prev ? prev.rect : new Rect(),
          viewingDirection: this.viewingDirection,
        },
        this.rotation,
      );

      const thisRect: TileSourceAndRect = {
        tileSource: tileSource,
        rect: position,
      };

      const canvasGroup: CanvasGroup = {
        canvases: [thisRect],
        rect: position,
      };
      canvasGroups.add(canvasGroup);
      canvasGroups.canvasesPerCanvasGroup.push([i]);
    });

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
    const canvasGroup: CanvasGroup = {
      canvases: [first],
      rect: position,
    };

    canvasGroups.add(canvasGroup);
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

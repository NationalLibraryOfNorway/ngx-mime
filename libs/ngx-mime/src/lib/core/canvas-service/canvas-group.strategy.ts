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
      const previousTileSourceAndRect =
        i === 0
          ? undefined
          : canvasGroups.canvasGroups[
              canvasGroups.canvasGroups.length - 1
            ];

      const position = positionStrategy.calculateCanvasGroupPosition(
        {
          canvasGroupIndex: i,
          canvasSource: tileSource,
          previousCanvasGroupPosition: previousTileSourceAndRect ? previousTileSourceAndRect.rect : new Rect(),
          viewingDirection: this.viewingDirection,
        },
        this.rotation,
      );

      const currentTleSourceAndRect: TileSourceAndRect = {
        tileSource: tileSource,
        rect: position,
      };

      const newCanvasGroup: CanvasGroup = {
        tileSourceAndRects: [currentTleSourceAndRect],
        rect: position,
      };
      canvasGroups.add(newCanvasGroup);
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

    const firstTileSourceAndRect: TileSourceAndRect = {
      tileSource: tileSources[0],
      rect: position,
    };
    const newCanvasGroup: CanvasGroup = {
      tileSourceAndRects: [firstTileSourceAndRect],
      rect: position,
    };

    canvasGroups.add(newCanvasGroup);
    canvasGroups.canvasesPerCanvasGroup.push([0]);

    for (let i = 1; i < tileSources.length; i = i + 2) {
      if (i + 1 < tileSources.length) {
        // Paired pages
        const previousCanvasGroup =
          canvasGroups.canvasGroups[
            canvasGroups.canvasGroups.length - 1
          ];

        const currentTileSourceAndRect: TileSourceAndRect = {
          tileSource: tileSources[i],
          rect: positionStrategy.calculateCanvasGroupPosition(
            {
              canvasGroupIndex: i,
              canvasSource: tileSources[i],
              previousCanvasGroupPosition: previousCanvasGroup.rect,
              viewingDirection: this.viewingDirection,
            },
            this.rotation,
          ),
        };

        const nextTileSourceAndRect: TileSourceAndRect = {
          tileSource: tileSources[i + 1],
          rect: positionStrategy.calculateCanvasGroupPosition(
            {
              canvasGroupIndex: i + 1,
              canvasSource: tileSources[i + 1],
              previousCanvasGroupPosition: currentTileSourceAndRect.rect,
              viewingDirection: this.viewingDirection,
            },
            this.rotation,
          ),
        };

        const newCanvasGroup: CanvasGroup = {
          tileSourceAndRects: [currentTileSourceAndRect, nextTileSourceAndRect],
          rect: new Rect({
            x: Math.min(currentTileSourceAndRect.rect.x, nextTileSourceAndRect.rect.x),
            y: Math.min(currentTileSourceAndRect.rect.y, nextTileSourceAndRect.rect.y),
            height: Math.max(currentTileSourceAndRect.rect.height, nextTileSourceAndRect.rect.height),
            width: currentTileSourceAndRect.rect.width + nextTileSourceAndRect.rect.width,
          }),
        };

        canvasGroups.add(newCanvasGroup);
        canvasGroups.canvasesPerCanvasGroup.push([i, i + 1]);
      } else {
        // Single last page, if applicable
        const previousCanvasGroup =
          canvasGroups.canvasGroups[
            canvasGroups.canvasGroups.length - 1
          ];

        const position = positionStrategy.calculateCanvasGroupPosition(
          {
            canvasGroupIndex: i,
            canvasSource: tileSources[i],
            previousCanvasGroupPosition: previousCanvasGroup.rect,
            viewingDirection: this.viewingDirection,
          },
          this.rotation,
        );

        const lastTileSourceAndRect: TileSourceAndRect = {
          tileSource: tileSources[i],
          rect: position,
        };

        const newCanvasGroup: CanvasGroup = {
          tileSourceAndRects: [lastTileSourceAndRect],
          rect: position,
        };

        canvasGroups.add(newCanvasGroup);
        canvasGroups.canvasesPerCanvasGroup.push([i]);
      }
    }
    return canvasGroups;
  };
}

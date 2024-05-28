import { OnePageCalculatePagePositionStrategy } from '../canvas-group-position/one-page-calculate-page-position-strategy';
import { CanvasGroups } from './../models/canvas-groups';
import { Rect } from './../models/rect';
import { AbstractCanvasGroupStrategy } from './canvas-group.strategy';
import { CanvasGroup, TileSourceAndRect } from './tile-source-and-rect.model';

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
          : canvasGroups.canvasGroups[canvasGroups.canvasGroups.length - 1];

      const position = positionStrategy.calculateCanvasGroupPosition(
        {
          canvasGroupIndex: i,
          canvasSource: tileSource,
          previousCanvasGroupPosition: previousTileSourceAndRect
            ? previousTileSourceAndRect.rect
            : new Rect(),
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

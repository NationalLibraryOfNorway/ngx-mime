import { TwoPageCalculateCanvasGroupPositionStrategy } from '../canvas-group-position/two-page-calculate-page-position-strategy';
import { MimeViewerConfig } from '../mime-viewer-config';
import { CanvasGroups } from '../models/canvas-groups';
import { Rect } from '../models/rect';
import { ViewingDirection } from '../models/viewing-direction';
import { AbstractCanvasGroupStrategy } from './canvas-group.strategy';
import { CanvasGroup, TileSourceAndRect } from './tile-source-and-rect.model';

export class TwoCanvasPerCanvasGroupStrategy
  implements AbstractCanvasGroupStrategy
{
  private positionStrategy: TwoPageCalculateCanvasGroupPositionStrategy;

  constructor(
    private config: MimeViewerConfig,
    private viewingDirection: ViewingDirection,
    private rotation: number,
  ) {
    this.positionStrategy = new TwoPageCalculateCanvasGroupPositionStrategy(
      this.config,
    );
  }

  addAll(tileSources: ReadonlyArray<any>): CanvasGroups {
    const canvasGroups = new CanvasGroups();

    // Add first single page
    this.addSinglePage(canvasGroups, tileSources[0], 0, new Rect());

    for (let i = 1; i < tileSources.length; i += 2) {
      if (this.hasNextPage(tileSources, i)) {
        this.addPairedPages(canvasGroups, tileSources, i);
      } else {
        this.addSinglePage(
          canvasGroups,
          tileSources[i],
          i,
          this.getLastRect(canvasGroups),
        );
      }
    }

    return canvasGroups;
  }

  private addSinglePage(
    canvasGroups: CanvasGroups,
    tileSource: any,
    index: number,
    previousRect: Rect,
  ): void {
    const position = this.calculatePosition(tileSource, index, previousRect);
    const tileSourceAndRect: TileSourceAndRect = { tileSource, rect: position };
    const newCanvasGroup: CanvasGroup = {
      tileSourceAndRects: [tileSourceAndRect],
      rect: position,
    };

    canvasGroups.add(newCanvasGroup);
    canvasGroups.canvasesPerCanvasGroup.push([index]);
  }

  private addPairedPages(
    canvasGroups: CanvasGroups,
    tileSources: ReadonlyArray<any>,
    index: number,
  ): void {
    const previousCanvasGroup = this.getLastCanvasGroup(canvasGroups);
    const firstTileSourceAndRect = this.createTileSourceAndRect(
      tileSources[index],
      index,
      previousCanvasGroup.rect,
    );
    const secondTileSourceAndRect = this.createTileSourceAndRect(
      tileSources[index + 1],
      index + 1,
      firstTileSourceAndRect.rect,
    );

    const newCanvasGroup: CanvasGroup = {
      tileSourceAndRects: [firstTileSourceAndRect, secondTileSourceAndRect],
      rect: this.combineRects(
        firstTileSourceAndRect.rect,
        secondTileSourceAndRect.rect,
      ),
    };

    canvasGroups.add(newCanvasGroup);
    canvasGroups.canvasesPerCanvasGroup.push([index, index + 1]);
  }

  private hasNextPage(tileSources: ReadonlyArray<any>, index: number): boolean {
    return index + 1 < tileSources.length;
  }

  private createTileSourceAndRect(
    tileSource: any,
    index: number,
    previousRect: Rect,
  ): TileSourceAndRect {
    return {
      tileSource,
      rect: this.calculatePosition(tileSource, index, previousRect),
    };
  }

  private calculatePosition(
    tileSource: any,
    index: number,
    previousRect: Rect,
  ): Rect {
    return this.positionStrategy.calculateCanvasGroupPosition(
      {
        canvasGroupIndex: index,
        canvasSource: tileSource,
        previousCanvasGroupPosition: previousRect,
        viewingDirection: this.viewingDirection,
      },
      this.rotation,
    );
  }

  private getLastCanvasGroup(canvasGroups: CanvasGroups): CanvasGroup {
    return canvasGroups.canvasGroups[canvasGroups.canvasGroups.length - 1];
  }

  private getLastRect(canvasGroups: CanvasGroups): Rect {
    const lastCanvasGroup = this.getLastCanvasGroup(canvasGroups);
    return lastCanvasGroup.rect;
  }

  private combineRects(rect1: Rect, rect2: Rect): Rect {
    return new Rect({
      x: Math.min(rect1.x, rect2.x),
      y: Math.min(rect1.y, rect2.y),
      height: Math.max(rect1.height, rect2.height),
      width: rect1.width + rect2.width,
    });
  }
}

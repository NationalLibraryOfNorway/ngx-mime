import { Point } from './point';
import { Rect } from './rect';
import { ViewerLayout } from './viewer-layout';

export class PageRects {
  private pageRects: Rect[] = [];
  private tileIndicesPerPage: number[][] = [];

  constructor(tileRects: Rect[], viewerLayout: ViewerLayout, paged: boolean) {
    if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
      this.initialiseWithOneTilePerPage(tileRects);
    } else {
      this.initialiseWithTwoTilesPerPage(tileRects);
    }
  }

  public get(index: number): Rect {
    return { ...this.pageRects[index] };
  }

  public findClosestIndex(point: Point): number {
    let i = 0;
    let lastDelta: any;

    if (point === null) {
      return -1;
    }
    this.pageRects.some(function (rect: Rect, index: number) {
      const delta = Math.abs(point.x - rect.centerX);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      lastDelta = delta;
    });
    return i;
  }

  public findPageByTileIndex(tileIndex: number): number {
    return this.tileIndicesPerPage.findIndex( function(tileIndicesForPage: any) {
      return tileIndicesForPage.includes(tileIndex);
    });
  }

  public getMaxHeight(): number {
    return Math.max.apply(Math, this.pageRects.map(function (rect) { return rect.height; }));
  }

  public getMaxWidth(): number {
    return Math.max.apply(Math, this.pageRects.map(function (rect) { return rect.width; }));
  }

  public length(): number {
    return this.pageRects.length;
  }

  private initialiseWithOneTilePerPage(tileRects: Rect[]) {
    this.pageRects = tileRects;
    for (let i = 0; i < tileRects.length; i++) {
      this.tileIndicesPerPage.push([i]);
    }
  }

  private initialiseWithTwoTilesPerPage(tileRects: Rect[]) {

    // Single first page
    this.pageRects.push(tileRects[0]);
    this.tileIndicesPerPage.push([0]);

    for (let i = 1; i < tileRects.length; i = i + 2) {

      if ( i + 1 < tileRects.length ) {

        // Paired pages
        const thisRect = tileRects[i];
        const nextRect = tileRects[i + 1];
        const groupedRect = new Rect({
          x: thisRect.x,
          y: Math.min(thisRect.y, nextRect.y),
          height: Math.max(thisRect.height, nextRect.height),
          width: thisRect.width + nextRect.width
        });
        this.pageRects.push(groupedRect);
        this.tileIndicesPerPage.push([i, i + 1]);

      } else {

        // Single last page, if applicable
        this.pageRects.push(tileRects[i]);
        this.tileIndicesPerPage.push([i]);
      }
    }
  }
}

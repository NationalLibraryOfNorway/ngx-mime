import { CanvasService } from '../canvas-service/canvas-service';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeService } from '../mode-service/mode.service';
import { Direction } from '../models/direction';
import { Options } from '../models/options';
import { Point } from '../models/point';
import { Rect } from '../models/rect';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { Strategy } from './zoom-strategy';

export interface CanvasGroup {
  canvasGroupIndex: number;
  direction?: Direction;
  immediately?: boolean;
}

export interface GoToCanvasGroupStrategy {
  goToCanvasGroup(canvasGroup: CanvasGroup): void;
  goToPreviousCanvasGroup(currentCanvasIndex: number): void;
  goToNextCanvasGroup(currentCanvasIndex: number): void;
  centerCurrentCanvas(): void;
}

export class DefaultGoToCanvasGroupStrategy implements GoToCanvasGroupStrategy {
  constructor(
    private viewer: any,
    private zoomStrategy: Strategy,
    private canvasService: CanvasService,
    private modeService: ModeService,
    private config: MimeViewerConfig,
    private viewingDirection: ViewingDirection
  ) {}

  goToCanvasGroup(canvasGroup: CanvasGroup) {
    const oldCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
    const canvasGroupIndex = this.canvasService.constrainToRange(
      canvasGroup.canvasGroupIndex
    );
    this.canvasService.currentCanvasGroupIndex = canvasGroupIndex;
    const newCanvasGroup = this.canvasService.getCanvasGroupRect(
      canvasGroupIndex
    );
    if (
      this.modeService.mode === ViewerMode.PAGE_ZOOMED &&
      this.config.preserveZoomOnCanvasGroupChange
    ) {
      let x: number;

      if (oldCanvasGroupIndex > canvasGroup.canvasGroupIndex) {
        if (this.config.startOnTopOnCanvasGroupChange) {
          const canvasGroupIndexes = this.canvasService.getCanvasesPerCanvasGroup(
            canvasGroup.canvasGroupIndex
          );
          const previousCanvasIndex =
            canvasGroupIndexes[canvasGroupIndexes.length - 1];
          const previousCanvasRect = this.canvasService.getCanvasRect(
            previousCanvasIndex
          );
          x =
            this.viewingDirection === ViewingDirection.LTR
              ? this.leftX(previousCanvasRect)
              : this.rightX(newCanvasGroup);
        } else {
          x =
            this.viewingDirection === ViewingDirection.LTR
              ? this.rightX(newCanvasGroup)
              : this.leftX(newCanvasGroup);
        }
      } else {
        x =
          this.viewingDirection === ViewingDirection.LTR
            ? this.leftX(newCanvasGroup)
            : this.rightX(newCanvasGroup);
      }

      const y = this.config.startOnTopOnCanvasGroupChange
        ? newCanvasGroup.y +
          this.getViewportBounds().height / 2 -
          new Options().collectionTileMargin
        : this.getViewportCenter().y;

      this.panTo(x, y, canvasGroup.immediately);
    } else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const oldCanvasGroupCenter = this.canvasService.getCanvasGroupRect(
        oldCanvasGroupIndex
      );
      this.panToCenter(oldCanvasGroupCenter, canvasGroup.immediately);
      this.zoomStrategy.goToHomeZoom();
      setTimeout(() => {
        this.panToCenter(newCanvasGroup, canvasGroup.immediately);
        this.modeService.mode = ViewerMode.PAGE;
      }, ViewerOptions.transitions.OSDAnimationTime);
    } else {
      this.panToCenter(newCanvasGroup, canvasGroup.immediately);
    }
  }

  public goToPreviousCanvasGroup(currentCanvasIndex: number): void {
    if (this.canvasService.currentCanvasGroupIndex > 0) {
      const viewportCenter = this.getViewportCenter();
      const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(
        viewportCenter
      );

      const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(
        null
      );
      const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup(
        {
          direction: Direction.PREVIOUS,
          currentCanvasGroupIndex: currentCanvasGroupIndex,
          currentCanvasGroupCenter: currentCanvasIndex,
          viewingDirection: this.viewingDirection
        }
      );
      this.goToCanvasGroup({
        canvasGroupIndex: newCanvasGroupIndex,
        immediately: false
      });
    }
  }

  public goToNextCanvasGroup(currentCanvasIndex: number): void {
    if (
      this.canvasService.currentCanvasGroupIndex <
      this.canvasService.numberOfCanvasGroups
    ) {
      const viewportCenter = this.getViewportCenter();
      const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(
        viewportCenter
      );

      const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(
        null
      );
      const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup(
        {
          direction: Direction.NEXT,
          currentCanvasGroupIndex: currentCanvasGroupIndex,
          currentCanvasGroupCenter: currentCanvasIndex,
          viewingDirection: this.viewingDirection
        }
      );
      this.goToCanvasGroup({
        canvasGroupIndex: newCanvasGroupIndex,
        immediately: false
      });
    }
  }

  public centerCurrentCanvas(): void {
    const currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
    const currentCanvasGroupCenter = this.canvasService.getCanvasGroupRect(
      currentCanvasGroupIndex
    );
    this.panToCenter(currentCanvasGroupCenter, false);
  }

  private leftX(canvas: Rect): number {
    return canvas.x + this.getViewportBounds().width / 2;
  }

  private rightX(canvas: Rect): number {
    return canvas.x + canvas.width - this.getViewportBounds().width / 2;
  }

  private panToCenter(canvasGroup: Rect, immediately: boolean): void {
    this.panTo(canvasGroup.centerX, canvasGroup.centerY, immediately);
  }

  private panTo(x: number, y: number, immediately: boolean): void {
    this.viewer.viewport.panTo(
      {
        x: x,
        y: y
      },
      immediately
    );
  }

  private getViewportCenter(): Point {
    return this.viewer.viewport.getCenter(true);
  }

  private getViewportBounds(): Rect {
    return this.viewer.viewport.getBounds(true);
  }
}

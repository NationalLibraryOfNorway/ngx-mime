import * as d3 from 'd3';

import { Direction } from '../models/direction';
import { ModeService } from '../mode-service/mode.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';
import { Dimensions } from '../models/dimensions';
import { Utils } from '../utils';
import { Strategy } from './zoom-strategy';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { Rect } from '../models/rect';
import { SwipeUtils } from './swipe-utils';
import { Side } from '../models/side';
import { MimeViewerConfig } from '../mime-viewer-config';

export interface CanvasGroup {
  canvasGroupIndex: number;
  canvasGroupEndHitCountReached?: boolean;
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
    private config: MimeViewerConfig
  ) {}

  goToCanvasGroup(canvasGroup: CanvasGroup) {
    const oldCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
    const canvasGroupIndex = this.canvasService.constrainToRange(canvasGroup.canvasGroupIndex);
    this.canvasService.currentCanvasGroupIndex = canvasGroupIndex;
    const newCanvasGroupCenter = this.canvasService.getCanvasGroupRect(canvasGroupIndex);
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED && this.config.preserveZoomOnPageChange) {
      if (oldCanvasGroupIndex > canvasGroup.canvasGroupIndex) {
        this.panTo(
          newCanvasGroupCenter.x + newCanvasGroupCenter.width - this.getViewportBounds().width / 2,
          this.getViewportCenter().y,
          canvasGroup.immediately
        );
      } else {
        this.panTo(newCanvasGroupCenter.x + this.getViewportBounds().width / 2, this.getViewportCenter().y, canvasGroup.immediately);
      }
    } else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const oldCanvasGroupCenter = this.canvasService.getCanvasGroupRect(oldCanvasGroupIndex);
      this.panTo(oldCanvasGroupCenter.centerX, oldCanvasGroupCenter.centerY, canvasGroup.immediately);
      this.zoomStrategy.goToHomeZoom();
      setTimeout(() => {
        this.panTo(newCanvasGroupCenter.centerX, newCanvasGroupCenter.centerY, canvasGroup.immediately);
        this.modeService.mode = ViewerMode.PAGE;
      }, ViewerOptions.transitions.OSDAnimationTime);
    } else {
      this.panTo(newCanvasGroupCenter.centerX, newCanvasGroupCenter.centerY, canvasGroup.immediately);
    }
  }

  public goToPreviousCanvasGroup(currentCanvasIndex: number): void {
    const viewportCenter = this.getViewportCenter();
    const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);

    const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
    const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
      direction: Direction.PREVIOUS,
      currentCanvasGroupIndex: currentCanvasGroupIndex,
      currentCanvasGroupCenter: currentCanvasIndex
    });
    this.goToCanvasGroup({
      canvasGroupIndex: newCanvasGroupIndex,
      immediately: false
    });
  }

  public goToNextCanvasGroup(currentCanvasIndex: number): void {
    const viewportCenter = this.getViewportCenter();
    const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);

    const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
    const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
      direction: Direction.NEXT,
      currentCanvasGroupIndex: currentCanvasGroupIndex,
      currentCanvasGroupCenter: currentCanvasIndex
    });
    this.goToCanvasGroup({
      canvasGroupIndex: newCanvasGroupIndex,
      immediately: false
    });
  }

  public centerCurrentCanvas(): void {
    const currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
    const currentCanvasGroupCenter = this.canvasService.getCanvasGroupRect(currentCanvasGroupIndex);
    this.panTo(currentCanvasGroupCenter.centerX, currentCanvasGroupCenter.centerY, false);
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

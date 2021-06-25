import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CanvasGroups } from './../models/canvas-groups';
import { ViewerLayout } from '../models/viewer-layout';
import { Point } from './../models/point';
import { Rect } from './../models/rect';
import { CanvasGroupStrategyFactory } from './canvas-groups-strategy.factory';

@Injectable()
export class CanvasService {
  protected _currentNumberOfCanvasGroups: BehaviorSubject<
    number
  > = new BehaviorSubject(0);
  protected _currentCanvasGroupIndex: BehaviorSubject<
    number
  > = new BehaviorSubject(0);

  protected canvasGroups: CanvasGroups = new CanvasGroups();
  protected _numberOfCanvases = 0;

  constructor() {}

  addAll(canvasRects: Rect[], layout: ViewerLayout) {
    this.numberOfCanvases = canvasRects.length;
    const canvasGroupStrategy = CanvasGroupStrategyFactory.create(layout);
    this.canvasGroups = canvasGroupStrategy.addAll(canvasRects);
    this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
  }

  reset() {
    this.numberOfCanvases = 0;
    this._currentCanvasGroupIndex.next(0);
    this.canvasGroups = new CanvasGroups();
  }

  get onCanvasGroupIndexChange(): Observable<number> {
    return this._currentCanvasGroupIndex
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  get onNumberOfCanvasGroupsChange(): Observable<number> {
    return this._currentNumberOfCanvasGroups
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  set currentCanvasGroupIndex(currentCanvasGroupIndex: number) {
    if (!this.isWithinBounds(currentCanvasGroupIndex)) {
      return;
    }
    this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
  }

  get currentCanvasGroupIndex(): number {
    return this._currentCanvasGroupIndex.value;
  }

  get numberOfCanvases(): number {
    return this._numberOfCanvases;
  }

  set numberOfCanvases(numberOfCanvases: number) {
    this._numberOfCanvases = numberOfCanvases;
  }

  get numberOfCanvasGroups(): number {
    return this.canvasGroups.length();
  }

  get currentCanvasIndex(): number {
    const canvases = this.canvasGroups.canvasesPerCanvasGroup[
      this.currentCanvasGroupIndex
    ]
    return canvases && canvases.length >= 1 ? canvases[0] : 0;
  }

  isWithinBounds(canvasGroupIndex: number): boolean {
    return (
      canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1
    );
  }

  isCurrentCanvasGroupValid(): boolean {
    return this.isWithinBounds(this.currentCanvasGroupIndex);
  }

  // Returns -1 if next canvas index is out of bounds
  getNextCanvasGroupIndex(): number {
    if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
      return -1;
    }
    this.currentCanvasGroupIndex++;
    return this.currentCanvasGroupIndex;
  }

  // Returns -1 if previous canvas index is out of bounds
  getPrevCanvasGroupIndex(): number {
    if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
      return -1;
    }
    this.currentCanvasGroupIndex--;
    return this.currentCanvasGroupIndex;
  }

  constrainToRange(canvasGroupsIndex: number): number {
    if (canvasGroupsIndex < 0) {
      return 0;
    } else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
      return this.numberOfCanvasGroups - 1;
    } else {
      return canvasGroupsIndex;
    }
  }

  findClosestCanvasGroupIndex(point: Point): number {
    return this.canvasGroups.findClosestIndex(point);
  }

  findCanvasGroupByCanvasIndex(canvasIndex: number): number {
    return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function(
      canvasForCanvasGroup: number[]
    ) {
      return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
    });
  }

  findCanvasByCanvasIndex(canvasIndex: number): number {
    return this.canvasGroups.canvasesPerCanvasGroup.length === 0
      ? -1
      : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
  }

  getCanvasGroupLabel(canvasGroupIndex: number): string {
    if (
      !this.canvasGroups.canvasGroupRects ||
      this.canvasGroups.canvasesPerCanvasGroup.length === 0
    ) {
      return '1';
    }

    const canvasGroup = this.canvasGroups.canvasesPerCanvasGroup[
      canvasGroupIndex
    ];
    let canvasGroupLabel = '' + (canvasGroup[0] + 1);

    if (canvasGroup.length > 1) {
      canvasGroupLabel =
        canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
    }

    return canvasGroupLabel;
  }

  getCanvasesPerCanvasGroup(canvasIndex: number): number[] {
    return !this.canvasGroups.canvasGroupRects
      ? [0]
      : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
  }

  getCanvasRect(canvasIndex: number): Rect {
    return this.canvasGroups.canvasRects[canvasIndex];
  }

  getCurrentCanvasGroupRect(): Rect {
    return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
  }

  getCanvasGroupRect(canvasGroupIndex: number): Rect {
    return this.canvasGroups.get(canvasGroupIndex);
  }

  getMaxHeight(): number {
    return this.canvasGroups.getMaxHeight();
  }

  getMaxWidth(): number {
    return this.canvasGroups.getMaxWidth();
  }
}

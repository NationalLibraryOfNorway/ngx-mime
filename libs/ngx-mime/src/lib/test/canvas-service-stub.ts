/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanvasService } from '../core/canvas-service/canvas-service';

@Injectable({ providedIn: 'root' })
export class CanvasServiceStub extends CanvasService {
  override _currentNumberOfCanvasGroups: BehaviorSubject<number> =
    new BehaviorSubject(10);
  override _currentCanvasGroupIndex: BehaviorSubject<number> =
    new BehaviorSubject(0);
  public _numberOfCanvasGroup = 0;

  override get onCanvasGroupIndexChange(): Observable<number> {
    return this._currentCanvasGroupIndex
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  override get onNumberOfCanvasGroupsChange(): Observable<number> {
    return this._currentNumberOfCanvasGroups
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  override get numberOfCanvases(): number {
    return this._currentNumberOfCanvasGroups.value;
  }

  override set numberOfCanvases(numberOfCanvases: number) {
    this._numberOfCanvases = numberOfCanvases;
  }

  override getCanvasGroupLabel(index: number): string {
    return '' + index;
  }

  override set numberOfCanvasGroups(numberOfCanvasGroups: number) {
    this._numberOfCanvasGroup = numberOfCanvasGroups;
  }

  override get numberOfCanvasGroups(): number {
    return this._numberOfCanvasGroup;
  }

  public getZoom(): number {
    return 0;
  }

  setCanvasGroupIndexChange(index: number) {
    this._currentCanvasGroupIndex.next(index);
  }
}

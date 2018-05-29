import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CanvasService } from '../core/canvas-service/canvas-service';

export class CanvasServiceStub extends CanvasService {
  _currentNumberOfCanvasGroups: BehaviorSubject<number> = new BehaviorSubject(10);
  _currentCanvasGroupIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  public _numberOfCanvasGroup: number;

  get onCanvasGroupIndexChange(): Observable<number> {
    return this._currentCanvasGroupIndex.asObservable().pipe(distinctUntilChanged());
  }

  get onNumberOfCanvasGroupsChange(): Observable<number> {
    return this._currentNumberOfCanvasGroups.asObservable().pipe(distinctUntilChanged());
  }

  get numberOfCanvases(): number {
    return this._currentNumberOfCanvasGroups.value;
  }

  set numberOfCanvases(numberOfCanvases: number) {
    this._numberOfCanvases = numberOfCanvases;
  }

  getCanvasGroupLabel(index: number): string {
    return '' + index;
  }

  set numberOfCanvasGroups(numberOfCanvasGroups: number) {
    this._numberOfCanvasGroup = numberOfCanvasGroups;
  }

  get numberOfCanvasGroups(): number {
    return this._numberOfCanvasGroup;
  }

  public getZoom(): number {
    return 0;
  }

  setCanvasGroupIndexChange(index: number) {
    this._currentCanvasGroupIndex.next(index);
  }
}

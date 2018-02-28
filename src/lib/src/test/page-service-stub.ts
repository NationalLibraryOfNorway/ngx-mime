import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';

import { CanvasService } from '../core/canvas-service/canvas-service';

export class PageServiceStub extends CanvasService {
  _currentNumberOfCanvasGroups: BehaviorSubject<number> = new BehaviorSubject(10);
  _currentCanvasIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  public _numberOfPages: number;

  get onCanvasGroupIndexChange(): Observable<number> {
    return this._currentCanvasIndex.asObservable().pipe(distinctUntilChanged());
  }

  get onNumberOfCanvasGroupsChange(): Observable<number> {
    return this._currentNumberOfCanvasGroups.asObservable().pipe(distinctUntilChanged());
  }

  get numberOfCanvases(): number {
    return this._currentNumberOfCanvasGroups.value;
  }

  getCanvasGroupLabel(index: number): string {
    return '' + index;
  }

  set numberOfCanvasGroups(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }

  get numberOfCanvasGroups(): number {
    return this._numberOfPages;
  }

  public getZoom(): number {
    return 0;
  }

  setPageChange(index: number) {
    this._currentCanvasIndex.next(index);
  }
}

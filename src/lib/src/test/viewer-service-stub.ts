import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Hit } from '../core/models/hit';

export class ViewerServiceStub {
  canvasGroupChanged = new Subject<number>();
  get onCanvasGroupIndexChange(): Observable<number> {
    return this.canvasGroupChanged.asObservable();
  }

  setCanvasGroupIndexChange(canvasIndex: number) {
    this.canvasGroupChanged.next(canvasIndex);
  }

  public goToPreviousCanvasGroup(): void {}

  public goToNextCanvasGroup(): void {}

  public goToCanvas(index: number): void {}

  public setCurrentHit(hit: Hit): void {}
}

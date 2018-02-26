import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Hit } from '../core/models/hit';

export class ViewerServiceStub {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  setPageChange(canvasIndex: number) {
    this.pageChanged.next(canvasIndex);
  }

  public goToPreviousPage(): void {}

  public goToNextPage(): void {}

  public goToTile(index: number): void {}

  public setCurrentHit(hit: Hit): void {}
}

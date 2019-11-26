import { MediaChange } from '@angular/flex-layout';
import { Subject, Subscription, Observable } from 'rxjs';

export class MediaObserverStub {
  _onChange = new Subject<MediaChange[]>();

  isActive(m: string) {
    return false;
  }

  asObservable(): Observable<MediaChange[]> {
    return this._onChange.asObservable();
  }

  subscribe(
    next?: (value: MediaChange[]) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return this._onChange.subscribe(next, error, complete);
  }
}

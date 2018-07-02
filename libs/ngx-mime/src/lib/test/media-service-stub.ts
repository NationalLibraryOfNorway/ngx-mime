import { MediaChange } from '@angular/flex-layout';
import { Subject, Subscription } from 'rxjs';

export class MediaServiceStub {
  _onChange = new Subject<MediaChange>();

  isActive(m: string) {
    return false;
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return this._onChange.subscribe(next, error, complete);
  }
}

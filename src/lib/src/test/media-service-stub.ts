import { MediaChange } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export class MediaServiceStub {
  _onChange = new Subject<MediaChange>();

  isActive(m: string) {
    return false;
  }

  subscribe(next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void): Subscription {
    return this._onChange.subscribe(next, error, complete);
  }
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class FullscreenServiceStub {
  public isEnabled(): boolean {
    return true;
  }

  get onChange(): Observable<boolean> {
    return Observable.of(true);
  }

  public isFullscreen(): boolean {
    return false;
  }
}

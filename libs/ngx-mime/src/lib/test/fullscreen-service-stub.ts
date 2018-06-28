import { Observable, of } from 'rxjs';

export class FullscreenServiceStub {
  public isEnabled(): boolean {
    return true;
  }

  get onChange(): Observable<boolean> {
    return of(true);
  }

  public isFullscreen(): boolean {
    return false;
  }
}

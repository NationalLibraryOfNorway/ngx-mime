import { Observable, of } from 'rxjs';

export class FullscreenServiceStub {
  get onChange(): Observable<boolean> {
    return of(true);
  }

  public isEnabled(): boolean {
    return true;
  }

  public isFullscreen(): boolean {
    return false;
  }
}

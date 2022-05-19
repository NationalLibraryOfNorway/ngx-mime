import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  private changeSubject: ReplaySubject<boolean> = new ReplaySubject();

  constructor() {
    this.onchange();
  }

  get onChange(): Observable<boolean> {
    return this.changeSubject.asObservable();
  }

  public isEnabled(): boolean {
    const d: any = document;
    return (
      d.fullscreenEnabled ||
      d.webkitFullscreenEnabled ||
      d.mozFullScreenEnabled ||
      d.msFullscreenEnabled
    );
  }

  public isFullscreen(): boolean {
    const d: any = document;
    return (
      d.fullscreenElement ||
      d.webkitFullscreenElement ||
      d.mozFullScreenElement ||
      d.msFullscreenElement
    );
  }

  public toggle(el: HTMLElement) {
    this.isFullscreen() ? this.closeFullscreen(el) : this.openFullscreen(el);
  }

  public onchange() {
    const d: any = document;

    const func = () => {
      this.changeSubject.next(true);
    };

    if (d.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', func);
    } else if (d.webkitFullscreenEnabled) {
      document.addEventListener('webkitfullscreenchange', func);
    } else if (d.mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenchange', func);
    } else if (d.msFullscreenEnabled) {
      document.addEventListener('msfullscreenchange', func);
    }
  }

  private openFullscreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  private closeFullscreen(elem: any) {
    const d = <any>document;
    if (d.exitFullscreen) {
      d.exitFullscreen();
    } else if (d.mozCancelFullScreen) {
      d.mozCancelFullScreen();
    } else if (d.webkitExitFullscreen) {
      d.webkitExitFullscreen();
    } else if (d.msExitFullscreen) {
      d.msExitFullscreen();
    }
  }
}

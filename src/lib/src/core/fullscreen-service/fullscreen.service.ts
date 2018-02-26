import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

@Injectable()
export class FullscreenService {
  private keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;
  private changeSubject: ReplaySubject<boolean> = new ReplaySubject();

  constructor() {
    this.onchange();
  }

  get onChange(): Observable<boolean> {
    return this.changeSubject.asObservable();
  }

  public isEnabled(): boolean {
    return Boolean(document[this.fn().fullscreenEnabled]);
  }

  public isFullscreen(): boolean {
    return Boolean(document[this.fn().fullscreenElement]);
  }

  public toggle(el: HTMLElement) {
    if (this.isFullscreen()) {
      this.exit();
    } else {
      this.request(el);
    }
  }

  public exit(): void {
    document[this.fn().exitFullscreen]();
  }

  public request(el: HTMLElement): void {
    const request = this.fn().requestFullscreen;

    el = el || document.documentElement;

    // Work around Safari 5.1 bug: reports support for
    // keyboard in fullscreen even though it doesn't.
    // Browser sniffing, since the alternative with
    // setTimeout is even worse.
    if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) {
      el[request]();
    } else {
      el[request](this.keyboardAllowed && (<any>Element).ALLOW_KEYBOARD_INPUT);
    }
  }

  public onchange() {
    const func = () => {
      this.changeSubject.next(true);
    };
    document.addEventListener(this.fn().fullscreenchange, func, false);
  }

  private fn(): any {
    const fnMap = [
      ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
      // New WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
      ],
      // Old WebKit (Safari 5.1)
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
      ],
      ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']
    ];

    let i = 0;
    const l = fnMap.length;
    const ret = {};

    for (; i < l; i++) {
      const val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  }
}

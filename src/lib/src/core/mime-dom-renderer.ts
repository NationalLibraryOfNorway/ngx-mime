import { Dimensions } from './models/dimensions';
import { ElementRef } from '@angular/core';

import * as screenfull from 'screenfull';

export class MimeDomHelper {

  public getBoundingClientRect(el: ElementRef): Dimensions {
    try {
      const dimensions = el.nativeElement.getBoundingClientRect();
      if (this.isDocumentInFullScreenMode() && el.nativeElement.nodeName === 'MIME-VIEWER') {
        const width = this.getFullscreenWidth();
        const height = this.getFullscreenHeight();
        return new Dimensions({
          ...dimensions,
          top: 0,
          bottom: height,
          width: width,
          height: height,
          left: 0,
          right: width
        });
      } else {
        return new Dimensions({
          top: dimensions.top,
          bottom: dimensions.bottom,
          width: dimensions.width,
          height: dimensions.height,
          left: dimensions.left,
          right: dimensions.right
        });
      }
    } catch (e) {
      return new Dimensions();
    }
  }

  public isDocumentInFullScreenMode(): boolean {
    return screenfull.isFullscreen;
  }

  public toggleFullscreen(): void {
    const el = <any>document.getElementById('mimeViewer');
    if (screenfull.enabled) {
      screenfull.toggle(el);
    }
  }

  private getFullscreenWidth(): number {
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  private getFullscreenHeight(): number {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }
}

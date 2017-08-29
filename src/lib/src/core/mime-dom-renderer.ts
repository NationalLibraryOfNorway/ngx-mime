import { Dimensions } from './models/dimensions';
import { ElementRef } from '@angular/core';

export class MimeDomHelper {

  public getBoundingClientRect(el: ElementRef): Dimensions {
    try {
      const dimensions = el.nativeElement.getBoundingClientRect();
      return new Dimensions({
        bottom: dimensions.bottom,
        height: dimensions.height,
        left: dimensions.left,
        right: dimensions.right,
        top: dimensions.top,
        width: dimensions.width
      });
    } catch (e) {
      return new Dimensions();
    }
  }

  public isDocumentInFullScreenMode(): boolean {
    return !(!(<any>document).fullscreenElement
      && !(<any>document).mozFullScreenElement
      && !(<any>document).msFullScreenElement
      && !(<any>document).webkitFullscreenElement);
  }

  public toggleFullscreen(): void {
    const elem = <any>document.getElementById('mimeViewer');
    if (!this.isDocumentInFullScreenMode()) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullScreen) {
        elem.msRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if ((<any>document).cancelFullScreen) {
        (<any>document).cancelFullScreen();
      } else if ((<any>document).mozCancelFullScreen) {
        (<any>document).mozCancelFullScreen();
      } else if ((<any>document).msCancelFullScreen) {
        (<any>document).msCancelFullScreen();
      } else if ((<any>document).webkitCancelFullScreen) {
        (<any>document).webkitCancelFullScreen();
      }
    }

  }

}

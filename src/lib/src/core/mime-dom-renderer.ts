import { Dimensions } from './models/dimensions';
import { ElementRef } from '@angular/core';

export class MimeDomHelper {

  public getBoundingClientRect(el: ElementRef): Dimensions {
    try  {
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
}

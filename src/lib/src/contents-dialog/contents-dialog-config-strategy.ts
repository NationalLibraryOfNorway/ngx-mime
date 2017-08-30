import { MimeDomHelper } from './../core/mime-dom-renderer';
import { ElementRef } from '@angular/core';
import { MdDialogConfig } from '@angular/material';

import { Dimensions } from './../core/models/dimensions';

export interface ContentsDialogConfigStrategy {
  getConfig(elementRef?: ElementRef): MdDialogConfig;
}

export class MobileContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {

  public getConfig(elementRef: ElementRef): MdDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '100%',
      height: '100%'
    };
  }
}

export class DesktopContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;

  public getConfig(el: ElementRef): MdDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: true,
      width: `${DesktopContentsDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      }
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = new MimeDomHelper().getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left: dimensions.right - DesktopContentsDialogConfigStrategy.dialogWidth - DesktopContentsDialogConfigStrategy.paddingRight
    });
  }

}

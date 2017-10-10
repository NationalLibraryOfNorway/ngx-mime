import { MimeDomHelper } from './../core/mime-dom-helper';
import { ElementRef, Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material';

import { Dimensions } from './../core/models/dimensions';

export interface ContentsDialogConfigStrategy {
  getConfig(elementRef?: ElementRef): MatDialogConfig;
}

export class MobileContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {

  public getConfig(elementRef: ElementRef): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: false,
      width: '100%',
      height: '100%',
      panelClass: 'contents-panel'
    };
  }
}

export class DesktopContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;
  private mimeDomHelper: MimeDomHelper;

  constructor(mimeDomHelper: MimeDomHelper) {
    this.mimeDomHelper = mimeDomHelper;
  }

  public getConfig(el: ElementRef): MatDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: false,
      width: `${DesktopContentsDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      panelClass: 'contents-panel'
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left: dimensions.right - DesktopContentsDialogConfigStrategy.dialogWidth - DesktopContentsDialogConfigStrategy.paddingRight
    });
  }

}

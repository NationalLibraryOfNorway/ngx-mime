import { MimeDomHelper } from './../core/mime-dom-helper';
import { ElementRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material';

import { Dimensions } from './../core/models/dimensions';

export interface ContentSearchDialogConfigStrategy {
  getConfig(elementRef?: ElementRef): MatDialogConfig;
}

export class MobileContentSearchDialogConfigStrategy
  implements ContentSearchDialogConfigStrategy {
  public getConfig(elementRef: ElementRef): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: false,
      autoFocus: false,
      width: '100%',
      height: '100%',
      panelClass: 'content-search-panel'
    };
  }
}

export class DesktopContentSearchDialogConfigStrategy
  implements ContentSearchDialogConfigStrategy {
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
      autoFocus: false,
      width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px'
      },
      panelClass: 'content-search-panel'
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left:
        dimensions.right -
        DesktopContentSearchDialogConfigStrategy.dialogWidth -
        DesktopContentSearchDialogConfigStrategy.paddingRight
    });
  }
}

import { MimeDomHelper } from '../core/mime-dom-helper';
import { ElementRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Dimensions } from '../core/models/dimensions';

export interface ViewDialogConfigStrategy {
  getConfig(elementRef?: ElementRef | null): MatDialogConfig;
}

export class MobileViewDialogConfigStrategy
  implements ViewDialogConfigStrategy
{
  public getConfig(elementRef: ElementRef): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: false,
      autoFocus: false,
      width: '100%',
      height: '100%',
      panelClass: 'view-panel',
    };
  }
}

export class DesktopViewDialogConfigStrategy
  implements ViewDialogConfigStrategy
{
  public static readonly dialogWidth = 250;
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
      autoFocus: true,
      width: `${DesktopViewDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      panelClass: 'view-panel',
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left:
        dimensions.right -
        DesktopViewDialogConfigStrategy.dialogWidth -
        DesktopViewDialogConfigStrategy.paddingRight,
    });
  }
}

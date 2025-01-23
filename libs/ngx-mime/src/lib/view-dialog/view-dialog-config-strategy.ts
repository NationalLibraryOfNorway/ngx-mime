import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';

export interface ViewDialogConfigStrategy {
  getConfig(
    elementRef: ElementRef | null,
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig;
}

export class MobileViewDialogConfigStrategy
  implements ViewDialogConfigStrategy
{
  public getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig {
    return {
      hasBackdrop: false,
      autoFocus: false,
      width: '100%',
      height: '100%',
      maxWidth: '100% !important',
      panelClass: ['mime-mobile-dialog', 'mime-dialog', 'view-panel'],
      viewContainerRef: viewContainerRef,
    };
  }
}

export class DesktopViewDialogConfigStrategy
  implements ViewDialogConfigStrategy
{
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;
  private mimeDomHelper: MimeDomHelper;

  constructor(mimeDomHelper: MimeDomHelper) {
    this.mimeDomHelper = mimeDomHelper;
  }

  public getConfig(
    el: ElementRef,
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      autoFocus: true,
      width: `${DesktopViewDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      panelClass: ['mime-dialog', 'view-panel'],
      maxWidth: '100% !important',
      viewContainerRef: viewContainerRef,
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 84,
      left:
        dimensions.right -
        DesktopViewDialogConfigStrategy.dialogWidth -
        DesktopViewDialogConfigStrategy.paddingRight,
    });
  }
}

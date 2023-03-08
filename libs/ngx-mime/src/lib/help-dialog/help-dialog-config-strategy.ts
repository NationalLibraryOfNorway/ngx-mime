import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';

export interface HelpDialogConfigStrategy {
  getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig;
}

export class MobileHelpDialogConfigStrategy
  implements HelpDialogConfigStrategy
{
  public getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: false,
      width: '100%',
      height: '100%',
      maxWidth: '100% !important',
      panelClass: 'help-panel',
      viewContainerRef: viewContainerRef,
    };
  }
}

export class DesktopHelpDialogConfigStrategy
  implements HelpDialogConfigStrategy
{
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;
  private mimeDomHelper: MimeDomHelper;

  constructor(mimeDomHelper: MimeDomHelper) {
    this.mimeDomHelper = mimeDomHelper;
  }

  public getConfig(
    el: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: false,
      width: `${DesktopHelpDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      panelClass: 'help-panel',
      maxWidth: '100% !important',
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left:
        dimensions.right -
        DesktopHelpDialogConfigStrategy.dialogWidth -
        DesktopHelpDialogConfigStrategy.paddingRight,
    });
  }
}

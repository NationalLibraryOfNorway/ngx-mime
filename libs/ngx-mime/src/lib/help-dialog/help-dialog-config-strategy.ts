import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';

export interface HelpDialogConfigStrategy {
  getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig;
}

export class MobileHelpDialogConfigStrategy
  implements HelpDialogConfigStrategy
{
  public getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig {
    return {
      hasBackdrop: false,
      width: '100%',
      height: '100%',
      maxWidth: '100% !important',
      panelClass: ['mime-dialog', 'help-panel'],
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
    viewContainerRef: ViewContainerRef,
  ): MatDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      width: `${DesktopHelpDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      panelClass: ['mime-dialog', 'help-panel'],
      maxWidth: '100% !important',
      viewContainerRef: viewContainerRef,
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 72,
      left:
        dimensions.right -
        DesktopHelpDialogConfigStrategy.dialogWidth -
        DesktopHelpDialogConfigStrategy.paddingRight,
    });
  }
}

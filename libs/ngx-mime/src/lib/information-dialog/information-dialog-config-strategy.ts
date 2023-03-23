import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Dimensions } from './../core/models/dimensions';

export interface InformationDialogConfigStrategy {
  getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig;
}

export class MobileInformationDialogConfigStrategy
  implements InformationDialogConfigStrategy
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
      panelClass: 'information-panel',
    };
  }
}

export class DesktopInformationDialogConfigStrategy
  implements InformationDialogConfigStrategy
{
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;

  public getConfig(
    el: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: false,
      width: `${DesktopInformationDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      maxWidth: '100% !important',
      panelClass: 'information-panel',
      viewContainerRef: viewContainerRef,
    };
  }
  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.getPosition(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left:
        dimensions.right -
        DesktopInformationDialogConfigStrategy.dialogWidth -
        DesktopInformationDialogConfigStrategy.paddingRight,
    });
  }
}

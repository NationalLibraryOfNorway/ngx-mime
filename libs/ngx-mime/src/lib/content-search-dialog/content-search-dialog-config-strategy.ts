import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';

export interface ContentSearchDialogConfigStrategy {
  getConfig(
    elementRef: ElementRef | null,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig;
}

export class MobileContentSearchDialogConfigStrategy
  implements ContentSearchDialogConfigStrategy
{
  public getConfig(
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef
  ): MatDialogConfig {
    return {
      hasBackdrop: false,
      autoFocus: false,
      width: '100%',
      height: '100%',
      maxWidth: '100% !important',
      panelClass: 'content-search-panel',
      viewContainerRef: viewContainerRef,
    };
  }
}

export class DesktopContentSearchDialogConfigStrategy
  implements ContentSearchDialogConfigStrategy
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
      autoFocus: false,
      width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      maxWidth: '100% !important',
      panelClass: 'content-search-panel',
      viewContainerRef: viewContainerRef,
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left:
        dimensions.right -
        DesktopContentSearchDialogConfigStrategy.dialogWidth -
        DesktopContentSearchDialogConfigStrategy.paddingRight,
    });
  }
}

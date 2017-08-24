import { ElementRef } from '@angular/core';
import { MdDialogConfig } from '@angular/material';

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

  public getConfig(elementRef: ElementRef): MdDialogConfig {
    const rect = this.getPosition(elementRef);
    return {
      hasBackdrop: false,
      disableClose: true,
      width: `${DesktopContentsDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: rect.top + 'px',
        left: rect.left + 'px',
      }
    };
  }

  private getPosition(elementRef: ElementRef) {
    if (!elementRef) {
      return {
        top: 0,
        left: 0
      };
    }
    const rect = elementRef.nativeElement.getBoundingClientRect();
    return {
      top: rect.top + 64,
      left: rect.right - DesktopContentsDialogConfigStrategy.dialogWidth - DesktopContentsDialogConfigStrategy.paddingRight
    };
  }

}

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Input, Renderer2, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, DialogPosition } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../viewer-intl';
import { Manifest } from './../../core/models/manifest';
import { ContentsComponent } from './../contents/contents.component';

@Component({
  selector: 'mime-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  @Input() manifest: Manifest;
  private subscriptions: Array<Subscription> = [];
  public isContentsDialogOpen = false;

  constructor(
    public dialog: MdDialog,
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private media: ObservableMedia) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public openContents() {
    let config: MdDialogConfig;
    if (!this.isContentsDialogOpen) {
      if (this.media.isActive('xs')) {
        config = this.getMobileContensConfig();
      } else {
        config = this.getDesktopContensConfig();
      }

      const dialogRef = this.dialog.open(ContentsComponent, config);
      this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
        this.isContentsDialogOpen = false;
      }));
      this.isContentsDialogOpen = true;
    }
  }

  private getMobileContensConfig(): MdDialogConfig {
    return {
      width: '100%',
      height: '100%',
      data: this.manifest
    };
  }

  private getDesktopContensConfig(): MdDialogConfig {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let left = rect.right - 370;
    let top = rect.top + 64;
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '350px',
      height: '600px',
      position: {
        top: top + 'px',
        left: left + 'px',
      },
      data: this.manifest
    };
  }

}

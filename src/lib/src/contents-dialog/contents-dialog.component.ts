import { Component, OnInit, Optional, Inject, HostListener, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { Manifest } from './../core/models/manifest';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.scss']
})
export class ContentsDialogComponent implements OnInit {
  public static readonly maxHeight = 460;
  public tabStyleDesktop = {};

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private el: ElementRef) {
    }

  ngOnInit() {
    this.resizeTabHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  private resizeTabHeight(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let height = document.body.scrollHeight - rect.top - 170;
    height = height > ContentsDialogComponent.maxHeight ? ContentsDialogComponent.maxHeight : height;
    this.tabStyleDesktop = {
      'maxHeight': height + 'px'
    };
  }
}

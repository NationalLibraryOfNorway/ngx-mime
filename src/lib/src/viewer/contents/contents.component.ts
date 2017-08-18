import { Component, OnInit, Optional, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../viewer-intl';
import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsComponent implements OnInit {
  public manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    @Optional() @Inject(MD_DIALOG_DATA) public data: Manifest) {
    if (this.data) {
      this.manifest = data;
    }
  }

  ngOnInit() {
  }

}

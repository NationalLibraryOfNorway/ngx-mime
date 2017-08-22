import { Component, OnInit, Optional, Inject, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia) { }

  ngOnInit() {
  }

}

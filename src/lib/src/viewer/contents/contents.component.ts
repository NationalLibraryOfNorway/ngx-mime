import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  public manifest: Manifest;

  constructor( @Optional() @Inject(MD_DIALOG_DATA) public data: Manifest) {
    if (this.data) {
      this.manifest = data;
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataComponent implements OnInit {
  @Input() public manifest: Manifest;

  constructor() { }

  ngOnInit() {
  }

}

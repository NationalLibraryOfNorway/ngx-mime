import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Canvas, Manifest, Structure } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-toc',
  templateUrl: './tableOfContents.component.html',
  styleUrls: ['./tableOfContents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TOCComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService) { }

  ngOnInit() {
    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getCanvasIndex(structure: Structure): number {
    let index = -1;
    if (this.manifest && this.manifest.sequences[0] && this.manifest.sequences[0].canvases && structure && structure.canvases[0]) {
      index = this.manifest.sequences[0].canvases.findIndex((canvas: Canvas) => canvas.id === structure.canvases[0]);
    }
    return index;
  }

  goToPage(page: number): void {
    this.viewerService.goToPage(page, false);
  }

}

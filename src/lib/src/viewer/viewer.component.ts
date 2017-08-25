import {
  Component, ChangeDetectionStrategy, Input, OnChanges, OnDestroy, OnInit, SimpleChange, ElementRef,
  SimpleChanges
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { Manifest } from '../core/models/manifest';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private viewerService: ViewerService,
    private dialog: MdDialog) {
    contentsDialogService.elementRef = el; }

  ngOnInit(): void {
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.cleanUp();
        this.viewerService.setUpViewer(manifest);
      })
    );
    this.loadManifest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        this.manifestUri = manifestUriChanges.currentValue;
        this.cleanUp();
        this.loadManifest();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private cleanUp() {
    this.closeAllDialogs();
    this.viewerService.destroy();
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }
}

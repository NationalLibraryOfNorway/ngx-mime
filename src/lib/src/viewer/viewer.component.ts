import {
  Component, ChangeDetectionStrategy, Input, OnChanges, OnDestroy, OnInit, SimpleChange, ElementRef, NgZone,
  SimpleChanges
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';

declare const OpenSeadragon: any;
@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  public viewer: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private dialog: MdDialog) {
    contentsDialogService.elementRef = el; }

  ngOnInit(): void {
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.cleanUp();
        this.setUpViewer(manifest);
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
    if (this.viewer != null && this.viewer.isOpen()) {
      this.viewer.destroy();
    }
  }

  private setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
      });
      window.openSeadragonViewer = this.viewer;
      this.addEvents();
    }
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

  addEvents(): void {
    this.addPinchEvents();
  }

  addPinchEvents(): void {
    let previousDistance = 0;
    this.viewer.addHandler('canvas-pinch', (data: any) => {
      if (data.lastDistance > previousDistance) {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() + 0.02));
      } else {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() - 0.02));
      }
      previousDistance = data.lastDistance;
    });

    this.viewer.addHandler('canvas-release', (data: any) => {
      previousDistance = 0;
    });
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TocComponent implements OnInit, OnDestroy {
  @Output()
  canvasChanged: EventEmitter<number> = new EventEmitter();
  public manifest: Manifest | null = null;
  public currentCanvasGroupIndex = 0;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService,
    private canvasService: CanvasService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.currentCanvasGroupIndex =
            this.canvasService.currentCanvasGroupIndex;
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.viewerService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex: number) => {
          this.currentCanvasGroupIndex = canvasGroupIndex;
          this.changeDetectorRef.detectChanges();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToCanvas(event: Event, canvasIndex: number | undefined): void {
    if (canvasIndex) {
      event.preventDefault();
      this.viewerService.goToCanvas(canvasIndex, false);
      this.canvasChanged.emit(canvasIndex);
    }
  }
}

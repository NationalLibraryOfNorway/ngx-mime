import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
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
  intl = inject(MimeViewerIntl);
  manifest: Manifest | null = null;
  currentCanvasGroupIndex = 0;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.currentCanvasGroupIndex =
            this.canvasService.currentCanvasGroupIndex;
          this.changeDetectorRef.detectChanges();
        },
      ),
    );

    this.subscriptions.add(
      this.viewerService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex: number) => {
          this.currentCanvasGroupIndex = canvasGroupIndex;
          this.changeDetectorRef.detectChanges();
        },
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToCanvas(event: Event, canvasIndex: number | undefined): void {
    if (canvasIndex !== undefined) {
      event.preventDefault();
      this.viewerService.goToCanvas(canvasIndex, false);
      this.canvasChanged.emit(canvasIndex);
    }
  }
}

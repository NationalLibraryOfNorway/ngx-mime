import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TocComponent implements OnInit, OnDestroy {
  @Output()
  canvasChanged: EventEmitter<number> = new EventEmitter();
  public manifest: Manifest;
  public currentCanvasGroupIndex: number;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService,
    private canvasService: CanvasService
  ) {}

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
      .subscribe((manifest: Manifest) => {
        console.log('tester', manifest.structures);
        this.manifest = manifest;
        this.currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        this.changeDetectorRef.detectChanges();
      });

    this.viewerService.onCanvasGroupIndexChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((canvasGroupIndex: number) => {
        this.currentCanvasGroupIndex = canvasGroupIndex;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  goToCanvas(canvasIndex: number): void {
    this.viewerService.goToCanvas(canvasIndex, false);
    this.canvasChanged.emit(canvasIndex);
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../../core/intl';
import { Hit } from '../../core/models/hit';
import { Manifest } from '../../core/models/manifest';

@Component({
  selector: 'mime-recognized-text-content',
  templateUrl: './recognized-text-content.component.html',
  styleUrls: ['./recognized-text-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecognizedTextContentComponent implements OnInit, OnDestroy {
  @ViewChild('recognizedTextContentContainer', { read: ElementRef })
  recognizedTextContentContainer!: ElementRef;
  intl = inject(MimeViewerIntl);
  firstCanvasRecognizedTextContent: SafeHtml | undefined;
  secondCanvasRecognizedTextContent: SafeHtml | undefined;
  isLoading = false;
  error: string | undefined = undefined;
  hasRecognizedTextContent: boolean | undefined;
  updatedCanvasGroupLabel: string | undefined;
  updatedCanvasGroupPageCount = 0;
  selectedHit: number | undefined;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly canvasService = inject(CanvasService);
  private readonly altoService = inject(AltoService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly highlightService = inject(HighlightService);
  private readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.cdr.markForCheck()),
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.hasRecognizedTextContent = manifest
            ? ManifestUtils.hasRecognizedTextContent(manifest)
            : undefined;
          this.updatedCanvasGroupLabel = undefined;
          this.updatedCanvasGroupPageCount = 0;
          this.clearRecognizedText();
          this.cdr.detectChanges();
        },
      ),
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onSelected.subscribe((hit: Hit | null) => {
        if (hit) {
          this.selectedHit = hit.id;
          this.highlightService.highlightSelectedHit(this.selectedHit);
        }
      }),
    );

    this.subscriptions.add(
      this.altoService.onTextContentReady$.subscribe(() => {
        this.clearRecognizedText();
        this.scrollToTop();
        this.updatedCanvasGroupPageCount = this.updateRecognizedText();
        if (this.updatedCanvasGroupPageCount > 0) {
          this.updatedCanvasGroupLabel = this.canvasService
            .getCanvasGroupLabel(this.canvasService.currentCanvasGroupIndex)
            ?.replace('-', '–');
        }
        this.cdr.detectChanges();
      }),
    );
    this.subscriptions.add(
      this.altoService.isLoading$.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();
      }),
    );
    this.subscriptions.add(
      this.altoService.hasErrors$.subscribe((error: string | undefined) => {
        this.error = error;
        this.cdr.detectChanges();
      }),
    );

    this.updateRecognizedText();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private clearRecognizedText() {
    this.firstCanvasRecognizedTextContent = '';
    this.secondCanvasRecognizedTextContent = '';
  }

  private scrollToTop() {
    this.recognizedTextContentContainer.nativeElement.scrollTop = 0;
  }

  private updateRecognizedText(): number {
    const canvases = this.canvasService.getCanvasesPerCanvasGroup(
      this.canvasService.currentCanvasGroupIndex,
    );
    if (!canvases?.length) {
      return 0;
    }
    this.updateCanvases(canvases);
    if (this.selectedHit !== undefined) {
      this.highlightService.highlightSelectedHit(this.selectedHit);
    }
    return canvases.length;
  }

  private updateCanvases(canvases: number[]) {
    this.firstCanvasRecognizedTextContent = this.altoService.getHtml(
      canvases[0],
    );

    if (canvases.length === 2) {
      this.secondCanvasRecognizedTextContent = this.altoService.getHtml(
        canvases[1],
      );
    }
  }
}

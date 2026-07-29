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
  currentCanvasGroupHasTextSource: boolean | undefined;
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
        this.selectedHit = hit?.id;
        if (this.selectedHit !== undefined) {
          this.highlightService.highlightSelectedHit(this.selectedHit);
        }
      }),
    );

    this.subscriptions.add(
      this.altoService.onTextContentReady$.subscribe(() => {
        this.clearRecognizedText();
        this.scrollToTop();
        this.refreshRecognizedText(true);
      }),
    );
    this.subscriptions.add(
      this.altoService.onTextHighlightsChange$.subscribe(() => {
        this.refreshRecognizedText();
      }),
    );
    this.subscriptions.add(
      this.altoService.isLoading$.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
        if (isLoading) {
          this.clearRecognizedText();
          this.updatedCanvasGroupLabel = undefined;
          this.updatedCanvasGroupPageCount = 0;
        }
        this.cdr.detectChanges();
      }),
    );
    this.subscriptions.add(
      this.altoService.hasErrors$.subscribe((error: string | undefined) => {
        this.error = error;
        this.cdr.detectChanges();
      }),
    );
    this.subscriptions.add(
      this.altoService.currentCanvasGroupHasTextSource$.subscribe(
        (hasTextSource: boolean | undefined) => {
          this.currentCanvasGroupHasTextSource = hasTextSource;
          this.cdr.detectChanges();
        },
      ),
    );

    this.refreshRecognizedText();
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

  private refreshRecognizedText(announceUpdate = false): void {
    const updatedCanvases = this.updateRecognizedText();

    if (announceUpdate) {
      this.updatedCanvasGroupPageCount = updatedCanvases.length;
      this.updatedCanvasGroupLabel = this.getCanvasGroupLabel(updatedCanvases);
    }

    this.cdr.detectChanges();
    this.highlightSelectedHit();
  }

  private updateRecognizedText(): number[] {
    const canvases = this.canvasService.getCanvasesPerCanvasGroup(
      this.canvasService.currentCanvasGroupIndex,
    );
    if (!canvases?.length) {
      return [];
    }

    return this.updateCanvases(canvases);
  }

  private updateCanvases(canvases: number[]): number[] {
    const updatedCanvases: number[] = [];
    this.firstCanvasRecognizedTextContent = this.altoService.getHtml(
      canvases[0],
    );
    if (this.firstCanvasRecognizedTextContent !== undefined) {
      updatedCanvases.push(canvases[0]);
    }

    if (canvases.length === 2) {
      this.secondCanvasRecognizedTextContent = this.altoService.getHtml(
        canvases[1],
      );
      if (this.secondCanvasRecognizedTextContent !== undefined) {
        updatedCanvases.push(canvases[1]);
      }
    }
    return updatedCanvases;
  }

  private highlightSelectedHit(): void {
    if (this.selectedHit !== undefined) {
      this.highlightService.highlightSelectedHit(this.selectedHit);
    }
  }

  private getCanvasGroupLabel(canvases: number[]): string | undefined {
    if (canvases.length === 0) {
      return undefined;
    }
    const firstPage = canvases[0] + 1;
    const lastPage = canvases[canvases.length - 1] + 1;
    return firstPage === lastPage ? `${firstPage}` : `${firstPage}–${lastPage}`;
  }
}

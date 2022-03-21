import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { Hit } from '../../core/models/hit';
import { MimeViewerIntl } from '../../core/intl';
import { SearchResult } from '../../core/models/search-result';

@Component({
  selector: 'mime-recognized-text-content',
  templateUrl: './recognized-text-content.component.html',
  styleUrls: ['./recognized-text-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecognizedTextContentComponent implements OnInit, OnDestroy {
  @ViewChild('recognizedTextContentContainer', { read: ElementRef })
  recognizedTextContentContainer!: ElementRef;
  firstCanvasRecognizedTextContent: SafeHtml | undefined;
  secondCanvasRecognizedTextContent: SafeHtml | undefined;
  isLoading = false;
  error: string | undefined = undefined;
  selectedHit: number | undefined;

  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private cdr: ChangeDetectorRef,
    private canvasService: CanvasService,
    private altoService: AltoService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.altoService.initialize(sr.hits);
      })
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(() => {
        this.clearRecognizedText();
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onSelected.subscribe((hit: Hit | null) => {
        if (hit) {
          this.selectedHit = hit.id;
          this.highlightService.highlightSelectedHit(this.selectedHit);
        }
      })
    );

    this.subscriptions.add(
      this.altoService.onTextContentReady$.subscribe(async () => {
        this.clearRecognizedText();
        this.scrollToTop();
        await this.updateRecognizedText();
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.altoService.isLoading$.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.altoService.hasErrors$.subscribe((error: string | undefined) => {
        this.error = error;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.altoService.destroy();
  }

  private clearRecognizedText() {
    this.firstCanvasRecognizedTextContent = '';
    this.secondCanvasRecognizedTextContent = '';
  }

  private scrollToTop() {
    this.recognizedTextContentContainer.nativeElement.scrollTop = 0;
  }

  private async updateRecognizedText() {
    const canvases = this.canvasService.getCanvasesPerCanvasGroup(
      this.canvasService.currentCanvasGroupIndex
    );
    await this.updateCanvases(canvases);
    if (this.selectedHit !== undefined) {
      this.highlightService.highlightSelectedHit(this.selectedHit);
    }
  }

  async updateCanvases(canvases: number[]) {
    this.firstCanvasRecognizedTextContent = this.altoService.getHtml(
      canvases[0]
    );

    if (canvases.length === 2) {
      this.secondCanvasRecognizedTextContent = this.altoService.getHtml(
        canvases[1]
      );
    }
  }
}

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
import { MimeViewerIntl } from '../../core/intl/viewer-intl';

@Component({
  selector: 'mime-text',
  templateUrl: './recognized-text.component.html',
  styleUrls: ['./recognized-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecognizedTextComponent implements OnInit, OnDestroy {
  @ViewChild('recognizedTextContainer', { read: ElementRef })
  recognizedTextContainer!: ElementRef;
  firstCanvasRecognizedText: SafeHtml | undefined;
  secondCanvasRecognizedText: SafeHtml | undefined;
  isLoading = false;
  error: string | undefined = undefined;

  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private cdr: ChangeDetectorRef,
    private canvasService: CanvasService,
    private altoService: AltoService,
    private iiifManifestService: IiifManifestService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(() => {
        this.clearRecognizedText();
        this.altoService.initialize();
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.altoService.onTextReady$.subscribe(() => {
        this.clearRecognizedText();
        this.scrollToTop();
        this.updateRecognizedText();
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
      this.altoService.hasErrors$.subscribe((error: string) => {
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
    this.firstCanvasRecognizedText = '';
    this.secondCanvasRecognizedText = '';
  }

  private scrollToTop() {
    this.recognizedTextContainer.nativeElement.scrollTop = 0;
  }

  private updateRecognizedText() {
    const canvases = this.canvasService.getCanvasesPerCanvasGroup(
      this.canvasService.currentCanvasGroupIndex
    );
    this.firstCanvasRecognizedText = this.altoService.getHtml(canvases[0]);

    if (canvases.length === 2) {
      this.secondCanvasRecognizedText = this.altoService.getHtml(canvases[1]);
    }
  }
}

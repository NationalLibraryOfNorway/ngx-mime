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

@Component({
  selector: 'mime-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, OnDestroy {
  @ViewChild('textContainer', { read: ElementRef })
  textContainer!: ElementRef;
  text1: SafeHtml | undefined;
  text2: SafeHtml | undefined;
  isLoading = false;
  error: string | undefined= undefined

  private subscriptions = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    private canvasService: CanvasService,
    private textService: AltoService
  ) {}

  ngOnInit(): void {
    this.textService.initialize();

    this.subscriptions.add(
      this.textService.onTextReady.subscribe(() => {
        this.text1 = '';
        this.text2 = '';

        this.textContainer.nativeElement.scrollTop = 0;
        const canvases = this.canvasService.getCanvasesPerCanvasGroup(
          this.canvasService.currentCanvasGroupIndex
        );
        this.text1 = this.textService.getHtml(canvases[0]);
        if (canvases.length === 2) {
          this.text2 = this.textService.getHtml(canvases[1]);
        }
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.textService.isLoading.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.textService.hasErrors.subscribe((error: string) => {
        this.error = error;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.textService.destroy();
    this.subscriptions.unsubscribe();
  }
}

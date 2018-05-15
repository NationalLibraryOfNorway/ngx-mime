import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Renderer2,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Dimensions } from './../../core/models/dimensions';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { ViewerOptions } from '../../core/models/viewer-options';
import { StyleService } from '../../core/style-service/style.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('osdToolbarState', [
      state(
        'hide',
        style({
          display: 'none',
          transform: 'translate(-100%,0)'
        })
      ),
      state(
        'show',
        style({
          display: 'block'
        })
      ),
      transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
      transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in'))
    ])
  ]
})
export class OsdToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') container: ElementRef;
  @HostBinding('@osdToolbarState')
  get osdToolbarState() {
    return this.state;
  }
  public osdToolbarStyle = {};
  public numberOfCanvasGroups: number;
  public isFirstCanvasGroup: boolean;
  public isLastCanvasGroup: boolean;
  public state = 'show';
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private mimeService: MimeResizeService,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private styleService: StyleService
  ) {}

  ngOnInit() {
    this.mimeService.onResize.pipe(takeUntil(this.destroyed)).subscribe((dimensions: Dimensions) => {
      this.osdToolbarStyle = {
        top: dimensions.top + 110 + 'px'
      };
      this.changeDetectorRef.detectChanges();
    });

    this.viewerService.onCanvasGroupIndexChange.pipe(takeUntil(this.destroyed)).subscribe((currentCanvasGroupIndex: number) => {
      this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
      this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
      this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
      this.changeDetectorRef.detectChanges();
    });

    this.intl.changes.pipe(takeUntil(this.destroyed)).subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngAfterViewInit() {
    this.styleService.onChange.pipe(takeUntil(this.destroyed)).subscribe(c => {
      const backgroundRgbaColor = this.styleService.convertToRgba(c, 0.3);
      console.log(backgroundRgbaColor);
      this.renderer.setStyle(this.container.nativeElement, 'background-color', backgroundRgbaColor);
    });
  }

  zoomIn(): void {
    this.viewerService.zoomIn();
  }

  zoomOut(): void {
    this.viewerService.zoomOut();
  }

  home(): void {
    this.viewerService.home();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  public goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }

  private isOnFirstCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === 0;
  }

  private isOnLastCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
  }
}

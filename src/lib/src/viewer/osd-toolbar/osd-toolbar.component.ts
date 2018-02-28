import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { Dimensions } from './../../core/models/dimensions';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { ViewerOptions } from '../../core/models/viewer-options';

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
          opacity: 0,
          display: 'none',
          transform: 'translate(-100%,0)'
        })
      ),
      state(
        'show',
        style({
          opacity: 1,
          display: 'block'
        })
      ),
      transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
      transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in'))
    ])
  ]
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  @HostBinding('@osdToolbarState')
  get osdToolbarState() {
    return this.state;
  }
  public osdToolbarStyle = {};
  public numberOfPages: number;
  public isFirstCanvasGroup: boolean;
  public isLastCanvasGroup: boolean;
  public state = 'show';
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private mimeService: MimeResizeService,
    private viewerService: ViewerService,
    private canvasService: CanvasService
  ) {}

  ngOnInit() {
    this.mimeService.onResize.pipe(takeUntil(this.destroyed)).subscribe((dimensions: Dimensions) => {
      this.osdToolbarStyle = {
        top: dimensions.top + 110 + 'px'
      };
      this.changeDetectorRef.detectChanges();
    });

    this.viewerService.onCanvasGroupIndexChange.pipe(takeUntil(this.destroyed)).subscribe((currentPage: number) => {
      this.numberOfPages = this.canvasService.numberOfCanvasGroups;
      this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentPage);
      this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentPage);
      this.changeDetectorRef.detectChanges();
    });

    this.intl.changes.pipe(takeUntil(this.destroyed)).subscribe(() => this.changeDetectorRef.markForCheck());
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

  private isOnFirstCanvasGroup(currentPage: number): boolean {
    return currentPage === 0;
  }

  private isOnLastCanvasGroup(currentPage: number): boolean {
    return currentPage === this.numberOfPages - 1;
  }
}

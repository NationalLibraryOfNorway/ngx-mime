import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSliderChange } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { SearchResult } from './../../../core/models/search-result';
import { PageDialogService } from '../../../page-dialog/page-dialog.service';

@Component({
  selector: 'mime-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit, OnDestroy {
  @Input() public searchResult: SearchResult;
  public numberOfCanvases: number;
  public canvasGrouplabel: string;
  public numberOfCanvasGroups: number;
  public currentCanvasGroupIndex: number;
  public isFirstCanvasGroup: boolean;
  public isLastCanvasGroup: boolean;
  private currentSliderPage = -1;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private pageDialogService: PageDialogService
  ) {}

  ngOnInit() {
    this.canvasService.onCanvasGroupIndexChange.pipe(takeUntil(this.destroyed)).subscribe((currentCanvasGroupIndex: number) => {
      if (this.currentSliderPage !== -1 && this.currentSliderPage === currentCanvasGroupIndex) {
        this.currentSliderPage = -1;
      } else if (this.currentSliderPage === -1) {
        this.currentCanvasGroupIndex = currentCanvasGroupIndex;
        this.canvasGrouplabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
      }
      this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
      this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
      this.changeDetectorRef.detectChanges();
    });

    this.canvasService.onNumberOfCanvasGroupsChange.pipe(takeUntil(this.destroyed)).subscribe((numberOfCanvasGroups: number) => {
      this.numberOfCanvasGroups = numberOfCanvasGroups;
      this.numberOfCanvases = this.canvasService.numberOfCanvases;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }

  onSliderChange(change: MatSliderChange): void {
    this.currentSliderPage = change.value;
    this.currentCanvasGroupIndex = change.value;
    this.canvasGrouplabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
    this.viewerService.goToCanvasGroup(change.value, false);
    this.changeDetectorRef.detectChanges();
  }

  openPageDialog(): void {
    this.pageDialogService.toggle();
  }

  private isOnFirstCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === 0;
  }

  private isOnLastCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
  }
}

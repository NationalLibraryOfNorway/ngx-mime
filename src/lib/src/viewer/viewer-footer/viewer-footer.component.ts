import { OptionsTransitions } from '../../core/models/options-transitions';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSliderChange } from '@angular/material';
import { MimeViewerIntl } from './../../core/viewer-intl';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { PageService } from './../../core/page-service/page-service';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  animations: [
    trigger('footerState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
        transform: 'translate(0, 100%)'
      })),
      state('show', style({
        opacity: 1,
        display: 'block',
        transform: 'translate(0, 0)'
      })),
      transition('hide => show', animate(OptionsTransitions.TIME_IN_MILLIS + 'ms ease-in')),
      transition('show => hide', animate(OptionsTransitions.TIME_IN_MILLIS + 'ms ease-out'))
    ])
  ],
  host: {
    '[@footerState]': 'state'
  }
})
export class ViewerFooterComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public state = 'show';
  public currentPage: number;
  public numberOfPages: number;
  private currentSliderPage = -1;

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private pageService: PageService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    this.subscriptions.push(this.viewerService.onPageChange.subscribe((currentPage) => {
      if (this.currentSliderPage !== -1 &&  this.currentSliderPage === currentPage) {
        this.currentSliderPage = -1;
      } else if (this.currentSliderPage === -1) {
        this.currentPage = currentPage;
      }
      this.numberOfPages = this.pageService.numberOfPages;
      this.changeDetectorRef.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public goToPreviousPage(): void {
    this.viewerService.goToPreviousPage();
  }

  public goToNextPage(): void {
    this.viewerService.goToNextPage();
  }

  public onSliderChange(change: MdSliderChange): void {
    this.currentSliderPage = change.value;
    this.viewerService.goToPage(change.value);
  }
}

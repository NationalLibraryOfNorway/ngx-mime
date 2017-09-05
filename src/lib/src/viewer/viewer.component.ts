import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { PageService } from '../core/page-service/page-service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  private subscriptions: Array<Subscription> = [];

  ViewerMode: typeof ViewerMode = ViewerMode;

  // Viewchilds
  @ViewChild('header') header: ViewerHeaderComponent;
  @ViewChild('footer') footer: ViewerFooterComponent;

  constructor(
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private attributionDialogService: AttributionDialogService,
    private viewerService: ViewerService,
    private mimeService: MimeResizeService,
    private dialog: MdDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private pageService: PageService,
    private modeService: ModeService) {
    contentsDialogService.el = el;
    attributionDialogService.el = el;
    mimeService.el = el;
  }

  ngOnInit(): void {
    this.modeService.mode = ViewerMode.DASHBOARD;
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
        .subscribe((manifest: Manifest) => {
          this.cleanUp();
          this.viewerService.setUpViewer(manifest);
          this.pageService.numberOfPages = this.viewerService.getPageCount();

          if (this.config.attributionDialogEnabled && manifest.attribution) {
            this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
          }
        })
    );

    this.loadManifest();
    this.modeService.onChange.subscribe((mode: ViewerMode) => {
      this.toggleToolbarsState(mode);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        // Always set to dashboard-mode when manifest changes
        this.modeService.mode = ViewerMode.DASHBOARD;
        this.manifestUri = manifestUriChanges.currentValue;
        this.cleanUp();
        this.loadManifest();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  get mode(): ViewerMode {
    return this.modeService.mode;
  }

  toggleToolbarsState(mode: ViewerMode): void {
    if (mode === ViewerMode.DASHBOARD) {
      this.header.state = this.footer.state = 'show';
    } else if (mode === ViewerMode.PAGE) {
      this.header.state = this.footer.state = 'hide';
    }
    this.changeDetectorRef.markForCheck();
  }

  nextPage(): void {
    let nextPage = this.pageService.getNextPage();
    this.viewerService.fitBoundsToPage(nextPage);
  }

  prevPage(): void {
    let prevPage = this.pageService.getPrevPage();
    this.viewerService.fitBoundsToPage(prevPage);
  }

  goToPageFromUserInput(event: any) {
    let page = event.target.value;

    if (!this.isInt(page) || !this.pageService.isWithinBounds(page)) {
      return;
    }
    this.pageService.currentPage = page;
    this.viewerService.fitBoundsToPage(+page);
  }

  private isInt(value: any): boolean {
    return !isNaN(value) &&
      parseInt(value, 10) == value &&
      !isNaN(parseInt(value, 10));
  }

  ngAfterViewChecked() {
    this.mimeService.markForCheck();
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private cleanUp() {
    this.closeAllDialogs();
    this.viewerService.destroy();
  }

  private closeAllDialogs() {
    this.dialog.closeAll();
  }

  setClasses() {
    return {
      page: this.mode === ViewerMode.PAGE,
      dashboard: this.mode === ViewerMode.DASHBOARD,
      canvaspressed: this.viewerService.getIsCanvasPressed()
    };
  }
}

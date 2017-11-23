import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  OnInit,
  EventEmitter,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { throttle } from 'rxjs/operators/throttle';
import { interval } from 'rxjs/observable/interval';

import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from '../core/models/manifest';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { PageService } from '../core/page-service/page-service';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../core/models/search-result';
import { ViewerOptions } from '../core/models/viewer-options';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:resize)': '[$event]' }
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  @Input() public q: string;
  @Input() public canvasIndex: number;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  @Output('pageModeChanged') onPageModeChange: EventEmitter<ViewerMode> = new EventEmitter();
  @Output('pageChanged') onPageChange: EventEmitter<number> = new EventEmitter();
  @Output('qChanged') onQChange: EventEmitter<string> = new EventEmitter();
  @Output('manifestChanged') onManifestChange: EventEmitter<Manifest> = new EventEmitter();

  private subscriptions = new Subscription;
  private isCanvasPressed = false;
  private currentManifest: Manifest;
  private viewerLayout: ViewerLayout;

  public errorMessage: string = null;

  // Viewchilds
  @ViewChild('mimeHeader')
  private header: ViewerHeaderComponent;
  @ViewChild('mimeFooter')
  private footer: ViewerFooterComponent;
  @ViewChild('mimeOsdToolbar')
  private osdToolbar: OsdToolbarComponent;

  constructor(
    public intl: MimeViewerIntl,
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private attributionDialogService: AttributionDialogService,
    private contentSearchDialogService: ContentSearchDialogService,
    private viewerService: ViewerService,
    private mimeService: MimeResizeService,
    private changeDetectorRef: ChangeDetectorRef,
    private modeService: ModeService,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService,
    private viewerLayoutService: ViewerLayoutService
  ) {
    contentsDialogService.el = el;
    attributionDialogService.el = el;
    contentSearchDialogService.el = el;
    mimeService.el = el;
  }

  get mimeHeaderBeforeRef(): ViewContainerRef {
    return this.header.mimeHeaderBefore;
  }

  get mimeHeaderAfterRef(): ViewContainerRef {
    return this.header.mimeHeaderAfter;
  }

  get mimeFooterBeforeRef(): ViewContainerRef {
    return this.footer.mimeFooterBefore;
  }

  get mimeFooterAfterRef(): ViewContainerRef {
    return this.footer.mimeFooterAfter;
  }

  ngOnInit(): void {
    this.modeService.initialMode = this.config.initViewerMode;
    this.subscriptions.add(
      this.iiifManifestService.currentManifest
        .subscribe((manifest: Manifest) => {
          if (manifest) {
            this.onManifestChange.next(manifest);
            this.cleanup();
            this.initialize();
            this.currentManifest = manifest;
            this.viewerLayoutService.init(ManifestUtils.isManifestPaged(manifest));
            this.changeDetectorRef.detectChanges();
            this.viewerService.setUpViewer(manifest, this.config);
            if (this.config.attributionDialogEnabled && manifest.attribution) {
              this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
            }

            if (this.q) {
              this.iiifContentSearchService.search(manifest, this.q);
            }
          }
        })
    );

    this.subscriptions.add(
      this.viewerService.onOsdReadyChange.subscribe((state: boolean) => {
        // Don't reset current page when switching layout
        if (state && this.canvasIndex && !this.pageService.currentPage) {
          this.viewerService.goToTile(this.canvasIndex, false);
        }
      })
    );

    this.subscriptions.add(
      this.iiifManifestService.errorMessage.subscribe((error: string) => {
        this.resetCurrentManifest();
        this.errorMessage = error;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onQChange.subscribe((q: string) => {
        this.onQChange.emit(q);
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.viewerService.highlight(sr);
      })
    );

    this.subscriptions.add(
      this.viewerService.isCanvasPressed.subscribe((value: boolean) => {
        this.isCanvasPressed = value;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.toggleToolbarsState(mode);
        this.onPageModeChange.emit(mode);
      })
    );

    this.subscriptions.add(
      this.pageService.onPageChange.subscribe((pageNumber: number) => {
        const tileIndex = this.pageService.findTileByPageNumber(pageNumber);
        if (tileIndex !== -1) {
          this.onPageChange.emit(tileIndex);
        }
      })
    );

    this.subscriptions.add(
      this.mimeService.onResize
        .pipe(
          throttle(val => interval(ViewerOptions.transitions.OSDAnimationTime))
        ).subscribe(() => {
          setTimeout(() => {
            this.viewerService.home();
          }, ViewerOptions.transitions.OSDAnimationTime);
        })
    );

    this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout: ViewerLayout) => {
      this.viewerLayout = viewerLayout;
    }));

    this.loadManifest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let manifestUriIsChanged = false;
    let qIsChanged = false;
    let canvasIndexChanged = false;
    if (changes['q']) {
      const qChanges: SimpleChange = changes['q'];
      if (!qChanges.isFirstChange() && qChanges.currentValue !== qChanges.firstChange) {
        this.q = qChanges.currentValue;
        qIsChanged = true;
      }
    }
    if (changes['canvasIndex']) {
      const canvasIndexChanges: SimpleChange = changes['canvasIndex'];
      if (!canvasIndexChanges.isFirstChange() && canvasIndexChanges.currentValue !== canvasIndexChanges.firstChange) {
        this.canvasIndex = canvasIndexChanges.currentValue;
        canvasIndexChanged = true;
      }
    }
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.previousValue) {
        this.modeService.mode = this.config.initViewerMode;
        this.manifestUri = manifestUriChanges.currentValue;
        manifestUriIsChanged = true;
      }
    }

    if (manifestUriIsChanged) {
      this.cleanup();
      this.loadManifest();
    } else {
      if (qIsChanged) {
        this.iiifContentSearchService.search(this.currentManifest, this.q);
      }
      if (canvasIndexChanged) {
        this.viewerService.goToTile(this.canvasIndex, true);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.cleanup();
    this.iiifManifestService.destroy();
    this.iiifContentSearchService.destroy();
  }

  // ChangeDetection fix
  onModeChange() {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.contentsDialogService.close();
      this.contentSearchDialogService.close();
    }
  }

  toggleToolbarsState(mode: ViewerMode): void {
    if (this.header && this.footer) {
      switch (mode) {
        case ViewerMode.DASHBOARD:
          this.header.state = this.footer.state = 'show';
          if (this.config.navigationControlEnabled && this.osdToolbar) {
            this.osdToolbar.state = 'hide';
          }
          break;
        case ViewerMode.PAGE:
          this.header.state = this.footer.state = 'hide';
          if (this.config.navigationControlEnabled && this.osdToolbar) {
            this.osdToolbar.state = 'show';
          }
          break;
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  ngAfterViewChecked() {
    this.mimeService.markForCheck();
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private initialize() {
    this.attributionDialogService.initialize();
    this.contentsDialogService.initialize();
    this.contentSearchDialogService.initialize();
  }

  private cleanup() {
    this.attributionDialogService.destroy();
    this.contentsDialogService.destroy();
    this.contentSearchDialogService.destroy();
    this.viewerService.destroy();
    this.resetErrorMessage();
  }

  private resetCurrentManifest(): void {
    this.currentManifest = null;
  }

  private resetErrorMessage(): void {
    this.errorMessage = null;
  }

  setClasses() {
    return {
      'mode-page': this.modeService.mode === ViewerMode.PAGE,
      'mode-page-zoomed': this.modeService.mode === ViewerMode.PAGE_ZOOMED,
      'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
      'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
      'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
      'canvas-pressed': this.isCanvasPressed
    };
  }
}

import { Platform } from '@angular/cdk/platform';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { CanvasGroupDialogService } from '../canvas-group-dialog/canvas-group-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import {
  ModeChanges,
  RecognizedTextMode,
  RecognizedTextModeChanges,
  ViewerMode,
} from '../core/models';
import { Manifest } from '../core/models/manifest';
import { SearchResult } from '../core/models/search-result';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { InformationDialogService } from '../information-dialog/information-dialog.service';
import { slideInLeft } from '../shared/animations';
import { ViewDialogService } from '../view-dialog/view-dialog.service';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { RecognizedTextContentComponent } from './recognized-text-content/recognized-text-content.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerSpinnerComponent } from './viewer-spinner/viewer-spinner.component';
import { VIEWER_PROVIDERS } from './viewer.providers';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  animations: [slideInLeft],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: VIEWER_PROVIDERS,
  imports: [
    NgClass,
    ViewerSpinnerComponent,
    ViewerHeaderComponent,
    OsdToolbarComponent,
    MatDrawerContainer,
    MatDrawer,
    RecognizedTextContentComponent,
    MatDrawerContent,
    ViewerFooterComponent,
  ],
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string | null = null;
  @Input() public q!: string;
  @Input() public canvasIndex = 0;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  @Input() public tabIndex = 0;
  @Output() viewerModeChanged: EventEmitter<ViewerMode> = new EventEmitter();
  @Output() canvasChanged: EventEmitter<number> = new EventEmitter();
  @Output() qChanged: EventEmitter<string> = new EventEmitter();
  @Output() manifestChanged: EventEmitter<Manifest> = new EventEmitter();
  @Output()
  recognizedTextContentModeChanged: EventEmitter<RecognizedTextMode> =
    new EventEmitter();
  snackBar = inject(MatSnackBar);
  intl = inject(MimeViewerIntl);
  recognizedTextMode = RecognizedTextMode;
  id = 'ngx-mime-mimeViewer';
  openseadragonId = 'openseadragon';

  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly viewDialogService = inject(ViewDialogService);
  private readonly informationDialogService = inject(InformationDialogService);
  private readonly attributionDialogService = inject(AttributionDialogService);
  private readonly contentSearchDialogService = inject(
    ContentSearchDialogService,
  );
  private readonly helpDialogService = inject(HelpDialogService);
  private readonly viewerService = inject(ViewerService);
  private readonly resizeService = inject(MimeResizeService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly modeService = inject(ModeService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly accessKeysHandlerService = inject(AccessKeysService);
  private readonly canvasService = inject(CanvasService);
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly styleService = inject(StyleService);
  private readonly altoService = inject(AltoService);
  private readonly canvasGroupDialogService = inject(CanvasGroupDialogService);
  private readonly el = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly zone = inject(NgZone);
  private readonly platform = inject(Platform);
  private readonly subscriptions = new Subscription();
  private isCanvasPressed = false;
  private currentManifest!: Manifest | null;
  private viewerLayout: ViewerLayout | null = null;
  private viewerState = new ViewerState();

  recognizedTextContentMode: RecognizedTextMode = RecognizedTextMode.NONE;
  showHeaderAndFooterState = 'hide';
  osdToolbarState = 'hide';
  public errorMessage: string | null = null;

  // Viewchilds
  @ViewChild('mimeHeader', { static: true })
  private header!: ViewerHeaderComponent;
  @ViewChild('mimeFooter', { static: true })
  private footer!: ViewerFooterComponent;

  constructor() {
    this.id = this.viewerService.id;
    this.openseadragonId = this.viewerService.openseadragonId;
    this.informationDialogService.el = this.el;
    this.informationDialogService.viewContainerRef = this.viewContainerRef;
    this.attributionDialogService.el = this.el;
    this.attributionDialogService.viewContainerRef = this.viewContainerRef;
    this.viewDialogService.el = this.el;
    this.viewDialogService.viewContainerRef = this.viewContainerRef;
    this.contentSearchDialogService.el = this.el;
    this.contentSearchDialogService.viewContainerRef = this.viewContainerRef;
    this.helpDialogService.el = this.el;
    this.helpDialogService.viewContainerRef = this.viewContainerRef;
    this.canvasGroupDialogService.viewContainerRef = this.viewContainerRef;
    this.resizeService.el = this.el;
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
    this.styleService.initialize();

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.initialize();
            this.currentManifest = manifest;
            this.manifestChanged.next(manifest);
            this.viewerLayoutService.init(
              ManifestUtils.isManifestPaged(manifest),
            );
            this.recognizedTextContentMode =
              this.altoService.recognizedTextContentMode;
            this.changeDetectorRef.detectChanges();
            this.viewerService.setUpViewer(manifest, this.config);
            if (this.config.attributionDialogEnabled && manifest.attribution) {
              this.attributionDialogService.open(
                this.config.attributionDialogHideTimeout,
              );
            }

            if (this.q) {
              this.iiifContentSearchService.search(manifest, this.q);
            }
          }
        },
      ),
    );

    this.subscriptions.add(
      this.viewerService.onOsdReadyChange.subscribe((state: boolean) => {
        // Don't reset current page when switching layout
        if (
          state &&
          this.canvasIndex &&
          !this.canvasService.currentCanvasGroupIndex
        ) {
          this.viewerService.goToCanvas(this.canvasIndex, false);
        }
      }),
    );

    this.subscriptions.add(
      this.iiifManifestService.errorMessage.subscribe(
        (error: string | null) => {
          this.resetCurrentManifest();
          this.errorMessage = error;
          this.changeDetectorRef.detectChanges();
        },
      ),
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onQChange.subscribe((q: string) => {
        this.qChanged.emit(q);
      }),
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.viewerService.highlight(sr);
      }),
    );

    this.subscriptions.add(
      this.viewerService.isCanvasPressed.subscribe((value: boolean) => {
        this.isCanvasPressed = value;
        this.changeDetectorRef.detectChanges();
      }),
    );

    this.subscriptions.add(
      this.modeService.onChange.subscribe((mode: ModeChanges) => {
        if (mode.currentValue !== undefined) {
          this.toggleToolbarsState(mode.currentValue);
        }
        if (
          mode.previousValue === ViewerMode.DASHBOARD &&
          mode.currentValue === ViewerMode.PAGE
        ) {
          this.viewerState.viewDialogState.isOpen =
            this.viewDialogService.isOpen();
          this.viewerState.contentDialogState.isOpen =
            this.informationDialogService.isOpen();
          this.viewerState.contentDialogState.selectedIndex =
            this.informationDialogService.getSelectedIndex();
          this.viewerState.contentsSearchDialogState.isOpen =
            this.contentSearchDialogService.isOpen();
          this.viewerState.helpDialogState.isOpen =
            this.helpDialogService.isOpen();
          this.zone.run(() => {
            this.viewDialogService.close();
            this.informationDialogService.close();
            this.contentSearchDialogService.close();
            this.helpDialogService.close();
          });
        }
        if (mode.currentValue === ViewerMode.DASHBOARD) {
          this.zone.run(() => {
            if (this.viewerState.viewDialogState.isOpen) {
              this.viewDialogService.open();
            }
            if (this.viewerState.contentDialogState.isOpen) {
              this.informationDialogService.open(
                this.viewerState.contentDialogState.selectedIndex,
              );
            }
            if (this.viewerState.contentsSearchDialogState.isOpen) {
              this.contentSearchDialogService.open();
            }
            if (this.viewerState.helpDialogState.isOpen) {
              this.helpDialogService.open();
            }
          });
        }
        this.zone.run(() => {
          this.viewerModeChanged.emit(mode.currentValue);
        });
      }),
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex: number) => {
          const canvasIndex =
            this.canvasService.findCanvasByCanvasIndex(canvasGroupIndex);
          if (canvasIndex !== -1) {
            this.canvasChanged.emit(canvasIndex);
          }
        },
      ),
    );

    this.subscriptions.add(
      this.resizeService.onResize
        .pipe(
          throttle((val) =>
            interval(ViewerOptions.transitions.OSDAnimationTime),
          ),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.viewerService.home();
            this.changeDetectorRef.markForCheck();
          }, ViewerOptions.transitions.OSDAnimationTime);
        }),
    );

    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe(
        (viewerLayout: ViewerLayout) => {
          this.viewerLayout = viewerLayout;
        },
      ),
    );

    this.subscriptions.add(
      this.altoService.onRecognizedTextContentModeChange$.subscribe(
        (recognizedTextModeChanges: RecognizedTextModeChanges) => {
          this.recognizedTextContentMode =
            recognizedTextModeChanges.currentValue;
          this.recognizedTextContentModeChanged.emit(
            this.recognizedTextContentMode,
          );
          this.changeDetectorRef.markForCheck();
        },
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.viewerService.setConfig(this.config);
      this.viewerLayoutService.setConfig(this.config);
      this.iiifContentSearchService.setConfig(this.config);
      this.altoService.setConfig(this.config);
      this.modeService.setConfig(this.config);
      this.modeService.initialize();
    }

    if (changes['manifestUri']) {
      this.cleanup();
      this.modeService.mode = this.config.initViewerMode;
      this.manifestUri = changes['manifestUri'].currentValue;
      this.loadManifest();
    }

    if (changes['q']) {
      this.q = changes['q'].currentValue;
      if (this.currentManifest) {
        this.iiifContentSearchService.search(this.currentManifest, this.q);
      }
    }

    if (changes['canvasIndex']) {
      this.canvasIndex = changes['canvasIndex'].currentValue;
      if (this.currentManifest) {
        this.viewerService.goToCanvas(this.canvasIndex, true);
      }
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeys(event: KeyboardEvent) {
    this.accessKeysHandlerService.handleKeyEvents(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.config.isDropEnabled) {
      const url = event.dataTransfer.getData('URL');
      const params = new URL(url).searchParams;
      const manifestUri = params.get('manifest');
      const startCanvasId = params.get('canvas');
      if (manifestUri) {
        this.manifestUri = manifestUri.startsWith('//')
          ? `${location.protocol}${manifestUri}`
          : manifestUri;
        this.cleanup();
        this.loadManifest();
        if (startCanvasId) {
          this.manifestChanged.pipe(take(1)).subscribe((manifest) => {
            const canvasIndex = manifest.sequences
              ? manifest.sequences[0]?.canvases?.findIndex(
                  (c) => c.id === startCanvasId,
                )
              : -1;
            if (canvasIndex && canvasIndex !== -1) {
              setTimeout(() => {
                this.viewerService.goToCanvas(canvasIndex, true);
              }, 0);
            }
          });
        }
      }
    } else {
      this.snackBar.open(this.intl.dropDisabled, undefined, {
        duration: 3000,
      });
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.cleanup();
    this.iiifManifestService.destroy();
    this.iiifContentSearchService.destroy();
    this.styleService.destroy();
  }

  toggleToolbarsState(mode: ViewerMode): void {
    if (this.header && this.footer) {
      switch (mode) {
        case ViewerMode.DASHBOARD:
          this.showHeaderAndFooterState =
            this.header.state =
            this.footer.state =
              'show';
          if (this.config.navigationControlEnabled && this.osdToolbarState) {
            this.osdToolbarState = 'hide';
          }
          break;
        case ViewerMode.PAGE:
          this.showHeaderAndFooterState =
            this.header.state =
            this.footer.state =
              'hide';
          if (this.config.navigationControlEnabled && this.osdToolbarState) {
            this.osdToolbarState = 'show';
          }
          break;
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  private loadManifest(): void {
    this.iiifManifestService.load(this.manifestUri).pipe(take(1)).subscribe();
  }

  private initialize() {
    this.accessKeysHandlerService.initialize();
    this.attributionDialogService.initialize();
    this.viewDialogService.initialize();
    this.informationDialogService.initialize();
    this.contentSearchDialogService.initialize();
    this.helpDialogService.initialize();
    this.viewerService.initialize();
    this.resizeService.initialize();
  }

  private cleanup() {
    this.viewerState = new ViewerState();
    this.accessKeysHandlerService.destroy();
    this.attributionDialogService.destroy();
    this.viewDialogService.destroy();
    this.informationDialogService.destroy();
    this.contentSearchDialogService.destroy();
    this.helpDialogService.destroy();
    this.viewerService.destroy();
    this.resizeService.destroy();
    this.resetErrorMessage();
  }

  private resetCurrentManifest(): void {
    this.currentManifest = null;
  }

  private resetErrorMessage(): void {
    this.errorMessage = null;
  }

  private hasMixBlendModeSupport(): boolean {
    return !(this.platform.FIREFOX || this.platform.SAFARI);
  }

  goToHomeZoom(): void {
    if (this.recognizedTextContentMode !== this.recognizedTextMode.ONLY) {
      this.viewerService.home();
    }
  }

  setClasses() {
    return {
      'mode-page': this.modeService.mode === ViewerMode.PAGE,
      'mode-page-zoomed': this.modeService.isPageZoomed(),
      'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
      'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
      'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
      'canvas-pressed': this.isCanvasPressed,
      'broken-mix-blend-mode': !this.hasMixBlendModeSupport(),
    };
  }
}

import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { Manifest } from '../core/models/manifest';
import { ModeChanges } from '../core/models/modeChanges';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../core/models/search-result';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerComponent
  implements OnInit, AfterViewChecked, OnDestroy, OnChanges {
  @Input() public manifestUri!: string;
  @Input() public q!: string;
  @Input() public canvasIndex = 0;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  @Input() public tabIndex = 0;
  @Output() viewerModeChanged: EventEmitter<ViewerMode> = new EventEmitter();
  @Output() canvasChanged: EventEmitter<number> = new EventEmitter();
  @Output() qChanged: EventEmitter<string> = new EventEmitter();
  @Output() manifestChanged: EventEmitter<Manifest> = new EventEmitter();
  @Output()
  recognizedTextContentToggleChanged: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();
  private isCanvasPressed = false;
  private currentManifest!: Manifest | null;
  private viewerLayout: ViewerLayout | null = null;
  private viewerState = new ViewerState();

  isRecognizedTextContentToggled = false;
  showHeaderAndFooterState = 'hide';
  public errorMessage: string | null = null;

  // Viewchilds
  @ViewChild('mimeHeader', { static: true })
  private header!: ViewerHeaderComponent;
  @ViewChild('mimeFooter', { static: true })
  private footer!: ViewerFooterComponent;
  @ViewChild('mimeOsdToolbar')
  private osdToolbar!: OsdToolbarComponent;

  constructor(
    public snackBar: MatSnackBar,
    public intl: MimeViewerIntl,
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private attributionDialogService: AttributionDialogService,
    private contentSearchDialogService: ContentSearchDialogService,
    private helpDialogService: HelpDialogService,
    private viewerService: ViewerService,
    private resizeService: MimeResizeService,
    private changeDetectorRef: ChangeDetectorRef,
    private modeService: ModeService,
    private iiifContentSearchService: IiifContentSearchService,
    private accessKeysHandlerService: AccessKeysService,
    private canvasService: CanvasService,
    private viewerLayoutService: ViewerLayoutService,
    private styleService: StyleService,
    private altoService: AltoService,
    public zone: NgZone
  ) {
    contentsDialogService.el = el;
    attributionDialogService.el = el;
    contentSearchDialogService.el = el;
    helpDialogService.el = el;
    resizeService.el = el;
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
    this.modeService.initialMode = this.config.initViewerMode;
    this.altoService.onRecognizedTextContentToggle = this.config.initRecognizedTextContentToggle;

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.initialize();
            this.currentManifest = manifest;
            this.manifestChanged.next(manifest);
            this.viewerLayoutService.init(
              ManifestUtils.isManifestPaged(manifest)
            );
            this.isRecognizedTextContentToggled =
              this.altoService.onRecognizedTextContentToggle && manifest
                ? ManifestUtils.hasRecognizedTextContent(manifest)
                : false;
            this.changeDetectorRef.detectChanges();
            this.viewerService.setUpViewer(manifest, this.config);
            if (this.config.attributionDialogEnabled && manifest.attribution) {
              this.attributionDialogService.open(
                this.config.attributionDialogHideTimeout
              );
            }

            if (this.q) {
              this.iiifContentSearchService.search(manifest, this.q);
            }
          }
        }
      )
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
      })
    );

    this.subscriptions.add(
      this.iiifManifestService.errorMessage.subscribe(
        (error: string | null) => {
          this.resetCurrentManifest();
          this.errorMessage = error;
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onQChange.subscribe((q: string) => {
        this.qChanged.emit(q);
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
      this.modeService.onChange.subscribe((mode: ModeChanges) => {
        if (mode.currentValue !== undefined) {
          this.toggleToolbarsState(mode.currentValue);
        }
        if (
          mode.previousValue === ViewerMode.DASHBOARD &&
          mode.currentValue === ViewerMode.PAGE
        ) {
          this.viewerState.contentDialogState.isOpen = this.contentsDialogService.isOpen();
          this.viewerState.contentDialogState.selectedIndex = this.contentsDialogService.getSelectedIndex();
          this.viewerState.contentsSearchDialogState.isOpen = this.contentSearchDialogService.isOpen();
          this.viewerState.helpDialogState.isOpen = this.helpDialogService.isOpen();
          this.zone.run(() => {
            this.contentsDialogService.close();
            this.contentSearchDialogService.close();
            this.helpDialogService.close();
          });
        }
        if (mode.currentValue === ViewerMode.DASHBOARD) {
          this.zone.run(() => {
            if (this.viewerState.contentDialogState.isOpen) {
              this.contentsDialogService.open(
                this.viewerState.contentDialogState.selectedIndex
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
        this.viewerModeChanged.emit(mode.currentValue);
      })
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex: number) => {
          const canvasIndex = this.canvasService.findCanvasByCanvasIndex(
            canvasGroupIndex
          );
          if (canvasIndex !== -1) {
            this.canvasChanged.emit(canvasIndex);
          }
        }
      )
    );

    this.subscriptions.add(
      this.resizeService.onResize
        .pipe(
          throttle((val) =>
            interval(ViewerOptions.transitions.OSDAnimationTime)
          )
        )
        .subscribe(() => {
          setTimeout(() => {
            this.viewerService.home();
          }, ViewerOptions.transitions.OSDAnimationTime);
        })
    );

    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe(
        (viewerLayout: ViewerLayout) => {
          this.viewerLayout = viewerLayout;
        }
      )
    );

    this.subscriptions.add(
      this.altoService.onRecognizedTextContentToggleChange$.subscribe(
        (isRecognizedTextContentToggled: boolean) => {
          this.isRecognizedTextContentToggled = isRecognizedTextContentToggled;
          this.recognizedTextContentToggleChanged.emit(
            isRecognizedTextContentToggled
          );
          this.changeDetectorRef.markForCheck();
        }
      )
    );

    this.loadManifest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let manifestUriIsChanged = false;
    let qIsChanged = false;
    let canvasIndexChanged = false;
    if (changes['q']) {
      const qChanges: SimpleChange = changes['q'];
      if (
        !qChanges.isFirstChange() &&
        qChanges.currentValue !== qChanges.firstChange
      ) {
        this.q = qChanges.currentValue;
        qIsChanged = true;
      }
    }
    if (changes['canvasIndex']) {
      const canvasIndexChanges: SimpleChange = changes['canvasIndex'];
      if (
        !canvasIndexChanges.isFirstChange() &&
        canvasIndexChanges.currentValue !== canvasIndexChanges.firstChange
      ) {
        this.canvasIndex = canvasIndexChanges.currentValue;
        canvasIndexChanged = true;
      }
    }
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange()) {
        this.cleanup();
      }
      if (
        !manifestUriChanges.isFirstChange() &&
        manifestUriChanges.currentValue !== manifestUriChanges.previousValue
      ) {
        this.modeService.mode = this.config.initViewerMode;
        this.manifestUri = manifestUriChanges.currentValue;
        manifestUriIsChanged = true;
      }
    }

    if (manifestUriIsChanged) {
      this.loadManifest();
    } else {
      if (qIsChanged && this.currentManifest) {
        this.iiifContentSearchService.search(this.currentManifest, this.q);
      }
      if (canvasIndexChanged) {
        this.viewerService.goToCanvas(this.canvasIndex, true);
      }
    }
  }

  @HostListener('keyup', ['$event'])
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
                  (c) => c.id === startCanvasId
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
          this.showHeaderAndFooterState = this.header.state = this.footer.state =
            'show';
          if (this.config.navigationControlEnabled && this.osdToolbar) {
            this.osdToolbar.state = 'hide';
          }
          break;
        case ViewerMode.PAGE:
          this.showHeaderAndFooterState = this.header.state = this.footer.state =
            'hide';
          if (this.config.navigationControlEnabled && this.osdToolbar) {
            this.osdToolbar.state = 'show';
          }
          break;
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  ngAfterViewChecked() {
    this.resizeService.markForCheck();
  }

  private loadManifest(): void {
    this.iiifManifestService.load(this.manifestUri).pipe(take(1)).subscribe();
  }

  private initialize() {
    this.accessKeysHandlerService.initialize();
    this.attributionDialogService.initialize();
    this.contentsDialogService.initialize();
    this.contentSearchDialogService.initialize();
    this.helpDialogService.initialize();
    this.viewerService.initialize();
  }

  private cleanup() {
    this.viewerState = new ViewerState();
    this.accessKeysHandlerService.destroy();
    this.attributionDialogService.destroy();
    this.contentsDialogService.destroy();
    this.contentSearchDialogService.destroy();
    this.helpDialogService.destroy();
    this.viewerService.destroy();
    this.resetErrorMessage();
  }

  private resetCurrentManifest(): void {
    this.currentManifest = null;
  }

  private resetErrorMessage(): void {
    this.errorMessage = null;
  }

  goToHomeZoom(): void {
    this.viewerService.goToHomeZoom();
  }

  setClasses() {
    return {
      'mode-page': this.modeService.mode === ViewerMode.PAGE,
      'mode-page-zoomed': this.modeService.isPageZoomed(),
      'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
      'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
      'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
      'canvas-pressed': this.isCanvasPressed,
    };
  }
}

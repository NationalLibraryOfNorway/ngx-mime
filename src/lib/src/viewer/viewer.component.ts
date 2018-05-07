import {
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
  AfterViewChecked
} from '@angular/core';
import { Subject, interval } from 'rxjs';
import { throttle, takeUntil, take } from 'rxjs/operators';

import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from '../core/models/manifest';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../core/models/search-result';
import { ViewerOptions } from '../core/models/viewer-options';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { ViewerState } from '../core/models/viewerState';
import { ModeChanges } from '../core/models/modeChanges';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, AfterViewChecked, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  @Input() public q: string;
  @Input() public canvasIndex: number;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  @Output() viewerModeChanged: EventEmitter<ViewerMode> = new EventEmitter();
  @Output() canvasChanged: EventEmitter<number> = new EventEmitter();
  @Output() qChanged: EventEmitter<string> = new EventEmitter();
  @Output() manifestChanged: EventEmitter<Manifest> = new EventEmitter();

  private destroyed: Subject<void> = new Subject();
  private isCanvasPressed = false;
  private currentManifest: Manifest;
  private viewerLayout: ViewerLayout;
  private viewerState = new ViewerState();

  public errorMessage: string = null;

  // Viewchilds
  @ViewChild('mimeHeader') private header: ViewerHeaderComponent;
  @ViewChild('mimeFooter') private footer: ViewerFooterComponent;
  @ViewChild('mimeOsdToolbar') private osdToolbar: OsdToolbarComponent;

  @HostListener('keyup', ['$event'])
  handleKeys(event: KeyboardEvent) {
    this.accessKeysHandlerService.handleKeyEvents(event);
  }

  @HostListener('window:drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const url = event.dataTransfer.getData('URL');
    const params = new URL(url).searchParams;
    const manifestUri = params.get('manifest');
    const startOnCanvas = params.get('canvas');
    if (manifestUri) {
      this.modeService.mode = this.config.initViewerMode;
      this.manifestUri = manifestUri;
      this.cleanup();
      this.loadManifest();
      if (startOnCanvas) {
        this.manifestChanged.pipe(take(1)).subscribe(manifest => {
          manifest.sequences[0].canvases.forEach((c, index) => {
            if (c.id === startOnCanvas) {
              setTimeout(() => {
                console.log('go to canvasId', index);
                this.viewerService.goToCanvas(index, false);
              }, 0);
            }
          });
        });
      }
    }
  }

  @HostListener('window:dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('window:dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
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
    private iiifContentSearchService: IiifContentSearchService,
    private accessKeysHandlerService: AccessKeysService,
    private canvasService: CanvasService,
    private viewerLayoutService: ViewerLayoutService,
    public zone: NgZone
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
    this.iiifManifestService.currentManifest.pipe(takeUntil(this.destroyed)).subscribe((manifest: Manifest) => {
      if (manifest) {
        this.cleanup();
        this.initialize();
        this.currentManifest = manifest;
        this.manifestChanged.next(manifest);
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
    });

    this.viewerService.onOsdReadyChange.pipe(takeUntil(this.destroyed)).subscribe((state: boolean) => {
      // Don't reset current page when switching layout
      if (state && this.canvasIndex && !this.canvasService.currentCanvasGroupIndex) {
        this.viewerService.goToCanvas(this.canvasIndex, false);
      }
    });

    this.iiifManifestService.errorMessage.pipe(takeUntil(this.destroyed)).subscribe((error: string) => {
      this.resetCurrentManifest();
      this.errorMessage = error;
      this.changeDetectorRef.detectChanges();
    });

    this.iiifContentSearchService.onQChange.pipe(takeUntil(this.destroyed)).subscribe((q: string) => {
      this.qChanged.emit(q);
    });

    this.iiifContentSearchService.onChange.pipe(takeUntil(this.destroyed)).subscribe((sr: SearchResult) => {
      this.viewerService.highlight(sr);
    });

    this.viewerService.isCanvasPressed.pipe(takeUntil(this.destroyed)).subscribe((value: boolean) => {
      this.isCanvasPressed = value;
      this.changeDetectorRef.detectChanges();
    });

    this.modeService.onChange.pipe(takeUntil(this.destroyed)).subscribe((mode: ModeChanges) => {
      this.toggleToolbarsState(mode.currentValue);
      if (mode.previousValue === ViewerMode.DASHBOARD && mode.currentValue === ViewerMode.PAGE) {
        this.viewerState.contentDialogState.isOpen = this.contentsDialogService.isOpen();
        this.viewerState.contentDialogState.selectedIndex = this.contentsDialogService.getSelectedIndex();
        this.viewerState.contentsSearchDialogState.isOpen = this.contentSearchDialogService.isOpen();
        this.zone.run(() => {
          this.contentsDialogService.close();
          this.contentSearchDialogService.close();
        });
      }
      if (mode.currentValue === ViewerMode.DASHBOARD) {
        this.zone.run(() => {
          if (this.viewerState.contentDialogState.isOpen) {
            this.contentsDialogService.open(this.viewerState.contentDialogState.selectedIndex);
          }
          if (this.viewerState.contentsSearchDialogState.isOpen) {
            this.contentSearchDialogService.open();
          }
        });
      }
      this.viewerModeChanged.emit(mode.currentValue);
    });

    this.canvasService.onCanvasGroupIndexChange.pipe(takeUntil(this.destroyed)).subscribe((canvasGroupIndex: number) => {
      const canvasIndex = this.canvasService.findCanvasByCanvasIndex(canvasGroupIndex);
      if (canvasIndex !== -1) {
        this.canvasChanged.emit(canvasIndex);
      }
    });

    this.mimeService.onResize
      .pipe(takeUntil(this.destroyed), throttle(val => interval(ViewerOptions.transitions.OSDAnimationTime)))
      .subscribe(() => {
        setTimeout(() => {
          this.viewerService.home();
        }, ViewerOptions.transitions.OSDAnimationTime);
      });

    this.viewerLayoutService.onChange.pipe(takeUntil(this.destroyed)).subscribe((viewerLayout: ViewerLayout) => {
      this.viewerLayout = viewerLayout;
    });

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
        this.viewerService.goToCanvas(this.canvasIndex, true);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.cleanup();
    this.iiifManifestService.destroy();
    this.iiifContentSearchService.destroy();
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
    this.viewerState = new ViewerState();
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

  private getParameterByName(name: string) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
}

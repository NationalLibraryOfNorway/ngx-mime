import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from '../core/models/manifest';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../core/models/search-result';
import { MimeViewerIntl } from '../core/viewer-intl';
import { ViewerOptions } from '../core/models/viewer-options';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  @Input() public q: string;
  @Input() public canvasIndex: number;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  private subscriptions: Array<Subscription> = [];
  private isCanvasPressed = false;
  public currentManifest: Manifest;
  public errorMessage: string = null;

  ViewerMode: typeof ViewerMode = ViewerMode;

  // Viewchilds
  @ViewChild('mimeHeader') header: ViewerHeaderComponent;
  @ViewChild('mimeFooter') footer: ViewerFooterComponent;
  @ViewChild('mimeOsdToolbar') osdToolbar: OsdToolbarComponent;

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
    private iiifContentSearchService: IiifContentSearchService) {
    contentsDialogService.el = el;
    attributionDialogService.el = el;
    contentSearchDialogService.el = el;
    mimeService.el = el;
  }

  ngOnInit(): void {
    this.modeService.initialMode = this.config.initViewerMode;

    this.subscriptions.push(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest) => {
          if (manifest) {
            this.resetErrorMessage();
            this.currentManifest = manifest;
            this.cleanUp();
            this.changeDetectorRef.detectChanges();
            this.viewerService.setUpViewer(manifest);
            if (this.config.attributionDialogEnabled && manifest.attribution) {
              this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
            }

            if (this.q) {
              this.iiifContentSearchService.search(manifest, this.q);
            }
          }
        }
      )
    );

    this.subscriptions.push(
      this.iiifManifestService.errorMessage.subscribe(
        (error: string) => {
          this.resetCurrentManifest();
          this.errorMessage = error;
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.subscriptions.push(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.viewerService.highlight(sr);
      })
    );

    this.subscriptions.push(
      this.viewerService.isCanvasPressed.subscribe((value: boolean) => {
        this.isCanvasPressed = value;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.push(
      this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.toggleToolbarsState(mode);
      })
    );

    this.subscriptions.push(
      this.viewerService.onOsdReadyChange.subscribe((state: boolean) => {
        if (state && this.canvasIndex) {
          this.viewerService.goToPage(this.canvasIndex);
        }
      })
    );

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
      this.cleanUp();
      this.loadManifest();
    } else {
      if (qIsChanged) {
        this.iiifContentSearchService.search(this.currentManifest, this.q);
      }
      if (canvasIndexChanged) {
        this.viewerService.goToPage(this.canvasIndex);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.iiifManifestService.destroy();
    this.iiifContentSearchService.destroy();
  }

  // ChangeDetection fix
  onModeChange() {
    if (this.mode === ViewerMode.DASHBOARD) {
      this.contentsDialogService.destroy();
      this.contentSearchDialogService.destroy();
    }
  }

  get mode(): ViewerMode {
    return this.modeService.mode;
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

  public cleanUp() {
    this.viewerService.destroy();
    this.attributionDialogService.destroy();
    this.contentsDialogService.destroy();
    this.contentSearchDialogService.destroy();
    this.iiifContentSearchService.destroy();
  }

  private resetCurrentManifest() {
    this.iiifManifestService.resetCurrentManifest();
    this.currentManifest = null;
  }

  private resetErrorMessage() {
    this.iiifManifestService.resetErrorMessage();
    this.errorMessage = null;
  }

  setClasses() {
    return {
      'page': this.mode === ViewerMode.PAGE,
      'dashboard': this.mode === ViewerMode.DASHBOARD,
      'canvas-pressed': this.isCanvasPressed
    };
  }
}

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerLayout } from '../../core/models/viewer-layout';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('headerState', [
      state(
        'hide',
        style({
          transform: 'translate(0, -100%)',
        })
      ),
      state(
        'show',
        style({
          transform: 'translate(0px, 0px)',
        })
      ),
      transition(
        'hide => show',
        animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')
      ),
      transition(
        'show => hide',
        animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')
      ),
    ]),
  ],
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('mimeHeaderBefore', { read: ViewContainerRef, static: true })
  mimeHeaderBefore!: ViewContainerRef;
  @ViewChild('mimeHeaderAfter', { read: ViewContainerRef, static: true })
  mimeHeaderAfter!: ViewContainerRef;
  public manifest: Manifest | null = null;
  public state = 'hide';
  showText = false;
  isContentSearchEnabled = false;
  isFullscreenEnabled = false;
  isInFullscreen = false;
  fullscreenLabel = this.intl.fullScreenLabel;
  isPagedManifest = false;
  hasAlto = false;
  viewerLayout: ViewerLayout = ViewerLayout.ONE_PAGE;

  ViewerLayout: typeof ViewerLayout = ViewerLayout; // enables parsing of enum in template
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private contentsDialogService: ContentsDialogService,
    private contentSearchDialogService: ContentSearchDialogService,
    private helpDialogService: HelpDialogService,
    private iiifManifestService: IiifManifestService,
    private fullscreenService: FullscreenService,
    private mimeDomHelper: MimeDomHelper,
    private viewerLayoutService: ViewerLayoutService,
    private altoService: AltoService,
    el: ElementRef
  ) {
    contentsDialogService.el = el;
    contentSearchDialogService.el = el;
    helpDialogService.el = el;
  }

  @HostBinding('@headerState')
  get headerState() {
    return this.state;
  }

  ngOnInit() {
    this.isFullscreenEnabled = this.fullscreenService.isEnabled();

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck())
    );

    this.subscriptions.add(
      this.fullscreenService.onChange.subscribe(() => {
        this.isInFullscreen = this.fullscreenService.isFullscreen();
        this.fullscreenLabel = this.isInFullscreen
          ? this.intl.exitFullScreenLabel
          : this.intl.fullScreenLabel;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.isContentSearchEnabled =
            manifest && manifest.service ? true : false;
          this.isPagedManifest = manifest
            ? ManifestUtils.isManifestPaged(manifest)
            : false;
          this.hasAlto = manifest
            ? ManifestUtils.hasAlto(manifest)
            : false;
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe(
        (viewerLayout: ViewerLayout) => {
          this.viewerLayout = viewerLayout;
        }
      )
    );

    this.subscriptions.add(
      this.altoService.onShowTextChange.subscribe(
        (showText: boolean) => {
          this.showText = showText;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleShowText(): void {
    this.altoService.toggle();
  }

  public toggleContents() {
    this.contentSearchDialogService.close();
    this.helpDialogService.close();
    this.contentsDialogService.toggle();
  }

  public toggleSearch() {
    this.contentsDialogService.close();
    this.helpDialogService.close();
    this.contentSearchDialogService.toggle();
  }

  public toggleHelp() {
    this.contentsDialogService.close();
    this.contentSearchDialogService.close();
    this.helpDialogService.toggle();
  }

  public toggleFullscreen(): void {
    return this.mimeDomHelper.toggleFullscreen();
  }

  public isInFullScreen(): boolean {
    return this.fullscreenService.isFullscreen();
  }

  public toggleViewerLayout(): void {
    this.viewerLayoutService.toggle();
  }

  public setLayoutOnePage(): void {
    this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
  }

  public setLayoutTwoPage(): void {
    this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
  }
}

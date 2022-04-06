import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerOptions } from '../../core/models/viewer-options';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { Manifest } from './../../core/models/manifest';
import { ViewMenuComponent } from './view-menu/view-menu.component';

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
  @ViewChild('viewMenu', { read: ElementRef, static: true })
  viewMenu!: ElementRef;
  public manifest: Manifest | null = null;
  public state = 'hide';
  isContentSearchEnabled = false;
  isFullscreenEnabled = false;
  isInFullscreen = false;
  fullscreenLabel = this.intl.fullScreenLabel;
  isPagedManifest = false;

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
    el: ElementRef,
    private overlay: Overlay
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
          this.changeDetectorRef.detectChanges();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openViewMenu() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.viewMenu)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
    });
    const viewMenuPortal = new ComponentPortal(ViewMenuComponent);
    overlayRef.attach(viewMenuPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
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
}

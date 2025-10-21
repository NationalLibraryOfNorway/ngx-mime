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
  inject,
  ViewRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerOptions } from '../../core/models/viewer-options';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { InformationDialogService } from '../../information-dialog/information-dialog.service';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { Manifest } from './../../core/models/manifest';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
        }),
      ),
      state(
        'show',
        style({
          transform: 'translate(0px, 0px)',
        }),
      ),
      transition(
        'hide => show',
        animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in'),
      ),
      transition(
        'show => hide',
        animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'),
      ),
    ]),
  ],
  imports: [MatToolbar, MatTooltip, MatIconButton, MatIcon],
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  intl = inject(MimeViewerIntl);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private informationDialogService = inject(InformationDialogService);
  private contentSearchDialogService = inject(ContentSearchDialogService);
  private viewDialogService = inject(ViewDialogService);
  private helpDialogService = inject(HelpDialogService);
  private iiifManifestService = inject(IiifManifestService);
  private fullscreenService = inject(FullscreenService);
  private mimeDomHelper = inject(MimeDomHelper);

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
  fullscreenLabel = '';
  isPagedManifest = false;
  hasRecognizedTextContent = false;

  private subscriptions = new Subscription();

  @HostBinding('@headerState')
  get headerState() {
    return this.state;
  }

  ngOnInit() {
    this.isFullscreenEnabled = this.fullscreenService.isEnabled();

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()),
    );

    this.subscriptions.add(
      this.fullscreenService.onChange.subscribe(() =>
        this.onFullscreenChange(),
      ),
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
          this.hasRecognizedTextContent = manifest
            ? ManifestUtils.hasRecognizedTextContent(manifest)
            : false;
          this.changeDetectorRef.detectChanges();
        },
      ),
    );

    this.onFullscreenChange();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public toggleView() {
    this.informationDialogService.close();
    this.contentSearchDialogService.close();
    this.helpDialogService.close();
    this.viewDialogService.toggle();
  }

  public toggleInformationDialog() {
    this.viewDialogService.close();
    this.contentSearchDialogService.close();
    this.helpDialogService.close();
    this.informationDialogService.toggle();
  }

  public toggleSearch() {
    this.viewDialogService.close();
    this.informationDialogService.close();
    this.helpDialogService.close();
    this.contentSearchDialogService.toggle();
  }

  public toggleHelp() {
    this.viewDialogService.close();
    this.informationDialogService.close();
    this.contentSearchDialogService.close();
    this.helpDialogService.toggle();
  }

  public toggleFullscreen(): void {
    return this.mimeDomHelper.toggleFullscreen();
  }

  private onFullscreenChange() {
    this.isInFullscreen = this.fullscreenService.isFullscreen();
    this.fullscreenLabel = this.isInFullscreen
      ? this.intl.exitFullScreenLabel
      : this.intl.fullScreenLabel;
    this.changeDetectorRef.detectChanges();
  }
}

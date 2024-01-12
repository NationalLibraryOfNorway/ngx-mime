import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../../core/models/manifest';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { ModeService } from './../../core/mode-service/mode.service';
import {
  easeInWithDelay,
  rotate45,
  slideInLeft,
} from './../../viewer/osd-toolbar/animations';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInLeft, rotate45, easeInWithDelay],
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @HostBinding('@osdComponentState')
  get osdFabState() {
    return this.state;
  }
  public numberOfCanvasGroups = 0;
  public isFirstCanvasGroup = false;
  public isLastCanvasGroup = false;
  public state = 'hide';
  invert = false;
  isWeb = false;
  fabState = 'closed';
  fabIcon = 'menu';
  showControlButtons = false;
  baseAnimationDelay = 20;
  isZoomed = true;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private iiifManifestService: IiifManifestService,
    private modeService: ModeService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.modeService.onChange.subscribe(() => {
        this.isZoomed = this.modeService.isPageZoomed();
        this.changeDetectorRef.markForCheck();
      })
    );

    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Web])
        .subscribe((value: BreakpointState) => (this.isWeb = value.matches))
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.invert = manifest.viewingDirection === ViewingDirection.LTR;
            this.changeDetectorRef.detectChanges();
          }
        }
      )
    );

    this.subscriptions.add(
      this.viewerService.onCanvasGroupIndexChange.subscribe(
        (currentCanvasGroupIndex: number) => {
          this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
          this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(
            currentCanvasGroupIndex
          );
          this.isLastCanvasGroup = this.isOnLastCanvasGroup(
            currentCanvasGroupIndex
          );
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck())
    );
  }

  onFabClick(): void {
    this.showControlButtons = !this.showControlButtons;
    this.fabState = this.fabState === 'closed' ? 'open' : 'closed';
    this.fabIcon = this.fabState === 'closed' ? 'menu' : 'clear';
  }

  zoomIn(): void {
    this.viewerService.zoomIn();
  }

  zoomOut(): void {
    this.viewerService.zoomOut();
  }

  home(): void {
    this.viewerService.home();
  }

  rotate(): void {
    this.viewerService.rotate();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  public goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }

  private isOnFirstCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === 0;
  }

  private isOnLastCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
  }
}

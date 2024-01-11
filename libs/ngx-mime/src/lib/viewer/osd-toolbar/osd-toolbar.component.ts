import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl';
import { ViewerService } from './../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('osdFabState', [
      state(
        'hide',
        style({
          transform: 'translate(-100%, 0)',
          display: 'none',
        })
      ),
      state(
        'show',
        style({
          transform: 'translate(0px, 0px)',
          display: 'block',
        })
      ),
      transition(
        'hide => show',
        animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`)
      ),
      transition(
        'show => hide',
        animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)
      ),
    ]),
    trigger('fabOpenState', [
      transition('closed => open', [
        style({ transform: 'rotate(-45deg)', opacity: 0 }),
        animate('200ms')
      ]),
      transition('open => closed', [
        style({ transform: 'rotate(45deg)', opacity: 0 }),
        animate('200ms')
      ]),
    ]),
    trigger('OsdControlsState', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', animate(`1ms {{delayEnter}}ms ease-out`), {
        params: { delayEnter: 0 },
      }),
      transition(':leave', animate(`1ms {{delayLeave}}ms ease-in`), {
        params: { delayLeave: 0 },
      }),
    ]),
  ],
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @HostBinding('@osdFabState')
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
  showControls = false;
  baseDelay = 20;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private iiifManifestService: IiifManifestService
  ) {}

  ngOnInit() {
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
    this.showControls = !this.showControls;
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

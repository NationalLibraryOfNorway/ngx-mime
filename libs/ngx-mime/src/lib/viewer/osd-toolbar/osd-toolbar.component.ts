import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../../core/models/manifest';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { StyleService } from '../../core/style-service/style.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { Dimensions } from './../../core/models/dimensions';
import { ViewerService } from './../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('osdToolbarState', [
      state(
        'hide',
        style({
          transform: 'translate(-120px, 0)',
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
      transition('hide => show', [
        group([
          style({ display: 'block' }),
          animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
        ]),
      ]),
      transition(
        'show => hide',
        animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)
      ),
    ]),
  ],
})
export class OsdToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @HostBinding('@osdToolbarState')
  get osdToolbarState() {
    return this.state;
  }
  public osdToolbarStyle = {};
  public numberOfCanvasGroups = 0;
  public isFirstCanvasGroup = false;
  public isLastCanvasGroup = false;
  public state = 'hide';
  invert = false;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private mimeService: MimeResizeService,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private styleService: StyleService,
    private iiifManifestService: IiifManifestService
  ) {}

  ngOnInit() {
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
      this.mimeService.onResize.subscribe((dimensions: Dimensions) => {
        this.osdToolbarStyle = {
          top: dimensions.top + 110 + 'px',
        };
        this.changeDetectorRef.detectChanges();
      })
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

  ngAfterViewInit() {
    this.subscriptions.add(
      this.styleService.onChange.subscribe((color: string | undefined) => {
        if (color) {
          const backgroundRgbaColor = this.styleService.convertToRgba(
            color,
            0.3
          );
          this.renderer.setStyle(
            this.container.nativeElement,
            'background-color',
            backgroundRgbaColor
          );
        }
      })
    );
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

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
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest } from '../../core/models/manifest';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFabButton, MatTooltip, MatIcon, MatMiniFabButton],
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  intl = inject(MimeViewerIntl);
  numberOfCanvasGroups = 0;
  isFirstCanvasGroup = false;
  isLastCanvasGroup = false;
  invert = false;
  isWeb = false;
  fabState = 'closed';
  fabIcon = 'menu';
  baseAnimationDelay = 20;
  isZoomed = true;
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly modeService = inject(ModeService);
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.modeService.onChange.subscribe(() => {
        this.isZoomed = this.modeService.isPageZoomed();
        this.changeDetectorRef.detectChanges();
      }),
    );

    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Web])
        .subscribe((value: BreakpointState) => {
          this.isWeb = value.matches;
          this.changeDetectorRef.detectChanges();
        }),
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.invert = manifest.viewingDirection === ViewingDirection.LTR;
            this.changeDetectorRef.detectChanges();
          }
        },
      ),
    );

    this.subscriptions.add(
      this.viewerService.onCanvasGroupIndexChange.subscribe(
        (currentCanvasGroupIndex: number) => {
          this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
          this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(
            currentCanvasGroupIndex,
          );
          this.isLastCanvasGroup = this.isOnLastCanvasGroup(
            currentCanvasGroupIndex,
          );
          this.changeDetectorRef.detectChanges();
        },
      ),
    );

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()),
    );
  }

  toggleFab(): void {
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

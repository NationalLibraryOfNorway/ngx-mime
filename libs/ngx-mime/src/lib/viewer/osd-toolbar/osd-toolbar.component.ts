import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { ModeService } from '../../core/mode-service/mode.service';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFabButton, MatTooltip, MatIcon, MatMiniFabButton],
})
export class OsdToolbarComponent {
  private readonly modeService = inject(ModeService);
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly isZoomed = this.modeService.isPageZoomed;
  readonly isWeb = this.viewerLayoutService.isWeb;
  readonly manifest = this.iiifManifestService.manifest;
  readonly invert = computed(
    () => this.manifest()?.viewingDirection === ViewingDirection.LTR,
  );
  readonly isFirstCanvasGroup = this.canvasService.isFirstCanvasGroup;
  readonly isLastCanvasGroup = this.canvasService.isLastCanvasGroup;
  readonly fabState = signal<'closed' | 'open'>('closed');
  readonly fabIcon = computed(() =>
    this.fabState() === 'closed' ? 'menu' : 'clear',
  );
  readonly baseAnimationDelay = 20;

  toggleFab(): void {
    this.fabState.update((state) => (state === 'closed' ? 'open' : 'closed'));
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

  goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }
}

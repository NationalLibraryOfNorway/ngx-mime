import { Dir, Direction } from '@angular/cdk/bidi';
import { Component, computed, inject, input } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { AccessKeys } from '../../../core/models/AccessKeys';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { SearchResult } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-page-navigator',
  templateUrl: './canvas-group-navigator.component.html',
  styleUrls: ['./canvas-group-navigator.component.scss'],
  imports: [
    MatToolbar,
    Dir,
    MatSlider,
    MatSliderThumb,
    MatButton,
    MatIconButton,
    MatTooltip,
    MatIcon,
  ],
})
export class CanvasGroupNavigatorComponent {
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  private readonly canvasGroupDialogService = inject(CanvasGroupDialogService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly searchResult = input.required<SearchResult>();
  readonly manifest = this.iiifManifestService.manifest;
  readonly currentViewingDirection = computed<Direction>(() =>
    this.getCurrentViewingDirection(),
  );
  readonly canvasGroupCount = this.canvasService.canvasGroupCount;
  readonly canvasCount = this.canvasService.canvasCount;
  readonly currentCanvasGroupIndex = this.canvasService.canvasGroupIndex;
  readonly canvasGroupLabel = computed(() =>
    this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex()),
  );
  readonly isFirstCanvasGroup = this.canvasService.isFirstCanvasGroup;
  readonly isLastCanvasGroup = this.canvasService.isLastCanvasGroup;
  readonly ViewingDirection = ViewingDirection;

  goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }

  onSliderChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.viewerService.goToCanvasGroup(value, false);
  }

  onSliderHotKey(event: KeyboardEvent) {
    const accessKeys = new AccessKeys(event);
    if (accessKeys.isSliderKeys()) {
      event.stopPropagation();
    }
  }

  openCanvasGroupDialog(): void {
    this.canvasGroupDialogService.toggle();
  }

  private getCurrentViewingDirection(): Direction {
    const manifest = this.manifest();

    return !manifest || manifest.viewingDirection === ViewingDirection.LTR
      ? ViewingDirection.LTR
      : ViewingDirection.RTL;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TocComponent {
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly viewerService = inject(ViewerService);

  readonly canvasChanged = output<number>();
  readonly manifest = this.iiifManifestService.manifest;
  readonly currentCanvasGroupIndex = this.viewerService.currentCanvasGroupIndex;

  goToCanvas(event: Event, canvasIndex: number | undefined): void {
    if (canvasIndex !== undefined) {
      event.preventDefault();
      this.viewerService.goToCanvas(canvasIndex, false);
      this.canvasChanged.emit(canvasIndex);
    }
  }
}

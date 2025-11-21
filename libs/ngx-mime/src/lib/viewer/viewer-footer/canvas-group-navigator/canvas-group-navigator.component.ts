import { Dir, Direction } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { AccessKeys } from '../../../core/models/AccessKeys';
import { Manifest } from '../../../core/models/manifest';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl';
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
    FormsModule,
    MatButton,
    MatIconButton,
    MatTooltip,
    MatIcon,
  ],
})
export class CanvasGroupNavigatorComponent implements OnInit, OnDestroy {
  @Input() public searchResult!: SearchResult;
  intl = inject(MimeViewerIntl);
  numberOfCanvases = 0;
  canvasGroupLabel = '';
  numberOfCanvasGroups = 0;
  currentCanvasGroupIndex: number | null = -1;
  isFirstCanvasGroup = false;
  isLastCanvasGroup = false;
  readonly ViewingDirection = ViewingDirection;
  currentViewingDirection: Direction = ViewingDirection.LTR;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  private readonly canvasGroupDialogService = inject(CanvasGroupDialogService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private currentSliderCanvasGroupIndex: number | null = -1;
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.currentViewingDirection =
              manifest.viewingDirection === ViewingDirection.LTR
                ? ViewingDirection.LTR
                : ViewingDirection.RTL;
            this.changeDetectorRef.detectChanges();
          }
        },
      ),
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (currentCanvasGroupIndex: number) => {
          if (
            this.currentSliderCanvasGroupIndex !== -1 &&
            this.currentSliderCanvasGroupIndex === currentCanvasGroupIndex
          ) {
            this.currentSliderCanvasGroupIndex = -1;
          } else if (this.currentSliderCanvasGroupIndex === -1) {
            this.currentCanvasGroupIndex = currentCanvasGroupIndex;
            this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(
              this.currentCanvasGroupIndex,
            );
          }
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
      this.canvasService.onNumberOfCanvasGroupsChange.subscribe(
        (numberOfCanvasGroups: number) => {
          this.numberOfCanvasGroups = numberOfCanvasGroups;
          this.numberOfCanvases = this.canvasService.numberOfCanvases;
          if (this.currentCanvasGroupIndex !== null) {
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(
              this.currentCanvasGroupIndex,
            );
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(
              this.currentCanvasGroupIndex,
            );
          }
          this.changeDetectorRef.detectChanges();
        },
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToPreviousCanvasGroup(): void {
    this.viewerService.goToPreviousCanvasGroup();
  }

  goToNextCanvasGroup(): void {
    this.viewerService.goToNextCanvasGroup();
  }

  onSliderChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.currentSliderCanvasGroupIndex = value;
    this.currentCanvasGroupIndex = value;
    if (this.currentCanvasGroupIndex !== null) {
      this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(
        this.currentCanvasGroupIndex,
      );
      this.viewerService.goToCanvasGroup(this.currentCanvasGroupIndex, false);
    }
    this.changeDetectorRef.detectChanges();
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

  private isOnFirstCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === 0;
  }

  private isOnLastCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
  }
}

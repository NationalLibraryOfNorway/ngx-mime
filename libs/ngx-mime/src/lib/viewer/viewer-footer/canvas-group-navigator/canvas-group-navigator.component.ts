import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { AccessKeys } from '../../../core/models/AccessKeys';
import { Manifest } from '../../../core/models/manifest';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { SearchResult } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-page-navigator',
  templateUrl: './canvas-group-navigator.component.html',
  styleUrls: ['./canvas-group-navigator.component.scss'],
})
export class CanvasGroupNavigatorComponent implements OnInit, OnDestroy {
  @Input() public searchResult!: SearchResult;
  public numberOfCanvases = 0;
  public canvasGroupLabel = '';
  public numberOfCanvasGroups = 0;
  public currentCanvasGroupIndex: number | null = -1;
  public isFirstCanvasGroup = false;
  public isLastCanvasGroup = false;
  invert = false;
  private currentSliderCanvasGroupIndex: number | null = -1;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private pageDialogService: CanvasGroupDialogService,
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
              this.currentCanvasGroupIndex
            );
          }
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
      this.canvasService.onNumberOfCanvasGroupsChange.subscribe(
        (numberOfCanvasGroups: number) => {
          this.numberOfCanvasGroups = numberOfCanvasGroups;
          this.numberOfCanvases = this.canvasService.numberOfCanvases;
          if (this.currentCanvasGroupIndex !== null) {
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(
              this.currentCanvasGroupIndex
            );
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(
              this.currentCanvasGroupIndex
            );
          }
          this.changeDetectorRef.detectChanges();
        }
      )
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

  onSliderChange(change: MatSliderChange): void {
    this.currentSliderCanvasGroupIndex = change.value;
    this.currentCanvasGroupIndex = change.value;
    if (this.currentCanvasGroupIndex) {
      this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(
        this.currentCanvasGroupIndex
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
    this.pageDialogService.toggle();
  }

  private isOnFirstCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === 0;
  }

  private isOnLastCanvasGroup(currentCanvasGroupIndex: number): boolean {
    return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
  }
}

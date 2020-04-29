import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { SearchResult } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { Manifest } from '../../../core/models/manifest';
import { ViewingDirection } from '../../../core/models/viewing-direction';

@Component({
  selector: 'mime-page-navigator',
  templateUrl: './canvas-group-navigator.component.html',
  styleUrls: ['./canvas-group-navigator.component.scss']
})
export class CanvasGroupNavigatorComponent implements OnInit, OnDestroy {
  @Input() public searchResult: SearchResult;
  public numberOfCanvases: number;
  public canvasGroupLabel: string;
  public numberOfCanvasGroups: number;
  public currentCanvasGroupIndex: number;
  public isFirstCanvasGroup: boolean;
  public isLastCanvasGroup: boolean;
  invert = false;
  private currentSliderCanvasGroupIndex = -1;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private pageDialogService: CanvasGroupDialogService,
    private iiifManifestService: IiifManifestService
  ) {}

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
      .subscribe((manifest: Manifest) => {
        this.invert = manifest.viewingDirection === ViewingDirection.LTR;
        this.changeDetectorRef.detectChanges();
      });

    this.canvasService.onCanvasGroupIndexChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((currentCanvasGroupIndex: number) => {
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
      });

    this.canvasService.onNumberOfCanvasGroupsChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((numberOfCanvasGroups: number) => {
        this.numberOfCanvasGroups = numberOfCanvasGroups;
        this.numberOfCanvases = this.canvasService.numberOfCanvases;
        this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(
          this.currentCanvasGroupIndex
        );
        this.isLastCanvasGroup = this.isOnLastCanvasGroup(
          this.currentCanvasGroupIndex
        );
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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
    this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(
      this.currentCanvasGroupIndex
    );
    this.viewerService.goToCanvasGroup(change.value, false);
    this.changeDetectorRef.detectChanges();
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

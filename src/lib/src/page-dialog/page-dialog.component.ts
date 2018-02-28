import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ViewerService } from '../core/viewer-service/viewer.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';

@Component({
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDialogComponent implements OnInit, OnDestroy {
  numberOfTiles: number;
  pageForm: FormGroup;
  pageNumber: FormControl;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<PageDialogComponent>,
    private fb: FormBuilder,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.numberOfTiles = this.canvasService.numberOfCanvases;
    this.createForm();
  }

  createForm() {
    this.pageNumber = new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.numberOfTiles)]);
    this.pageForm = this.fb.group({
      pageNumber: this.pageNumber
    });
  }

  ngOnInit() {
    this.intl.changes.pipe(takeUntil(this.destroyed)).subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSubmit(): void {
    if (this.pageForm.valid) {
      const pageNumber = this.pageForm.get('pageNumber').value - 1;
      this.viewerService.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(pageNumber), false);
      this.dialogRef.close();
    }
  }
}

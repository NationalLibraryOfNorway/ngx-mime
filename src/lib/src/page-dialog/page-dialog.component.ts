import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ViewerService } from '../core/viewer-service/viewer.service';
import { PageService } from '../core/page-service/page-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDialogComponent implements OnInit {
  numberOfTiles: number;
  pageForm: FormGroup;
  pageNumber: FormControl;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<PageDialogComponent>,
    private fb: FormBuilder,
    private viewerService: ViewerService,
    private pageService: PageService,
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef) {
    this.numberOfTiles = this.pageService.numberOfTiles;
    this.createForm();
  }

  createForm() {
    this.pageNumber = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(this.numberOfTiles)
    ]);
    this.pageForm = this.fb.group({
      pageNumber: this.pageNumber,
    });
  }

  ngOnInit() {
    this.intl.changes
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSubmit(): void {
    if (this.pageForm.valid) {
      const pageNumber = this.pageForm.get('pageNumber').value - 1;
      this.viewerService.goToPage(this.pageService.findPageByTileIndex(pageNumber), false);
      this.dialogRef.close();
    }
  }

}

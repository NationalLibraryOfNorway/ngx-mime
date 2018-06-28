import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ViewerService } from '../core/viewer-service/viewer.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';

@Component({
  templateUrl: './canvas-group-dialog.component.html',
  styleUrls: ['./canvas-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasGroupDialogComponent implements OnInit, OnDestroy {
  numberOfCanvases: number;
  canvasGroupForm: FormGroup;
  canvasGroupControl: FormControl;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<CanvasGroupDialogComponent>,
    private fb: FormBuilder,
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.numberOfCanvases = this.canvasService.numberOfCanvases;
    this.createForm();
  }

  createForm() {
    this.canvasGroupControl = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(this.numberOfCanvases)
    ]);
    this.canvasGroupForm = this.fb.group({
      canvasGroupControl: this.canvasGroupControl
    });
  }

  ngOnInit() {
    this.intl.changes
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSubmit(): void {
    if (this.canvasGroupForm.valid) {
      const pageNumber =
        this.canvasGroupForm.get('canvasGroupControl').value - 1;
      this.viewerService.goToCanvasGroup(
        this.canvasService.findCanvasGroupByCanvasIndex(pageNumber),
        false
      );
      this.dialogRef.close();
    }
  }
}

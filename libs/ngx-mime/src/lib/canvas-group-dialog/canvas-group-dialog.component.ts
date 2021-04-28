import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  templateUrl: './canvas-group-dialog.component.html',
  styleUrls: ['./canvas-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasGroupDialogComponent implements OnInit, OnDestroy {
  numberOfCanvases: number;
  canvasGroupForm: FormGroup;
  canvasGroupControl: FormControl;
  private subscriptions = new Subscription();

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
      Validators.max(this.numberOfCanvases),
    ]);
    this.canvasGroupForm = this.fb.group({
      canvasGroupControl: this.canvasGroupControl,
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

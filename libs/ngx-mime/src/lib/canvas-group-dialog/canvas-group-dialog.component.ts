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
import { MimeViewerIntl } from '../core/intl';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  templateUrl: './canvas-group-dialog.component.html',
  styleUrls: ['./canvas-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasGroupDialogComponent implements OnInit, OnDestroy {
  numberOfCanvases: number;
  canvasGroupForm: FormGroup<{
    canvasGroupControl: FormControl<number | null>;
  }>;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<CanvasGroupDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly viewerService: ViewerService,
    private readonly canvasService: CanvasService,
    public readonly intl: MimeViewerIntl,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.numberOfCanvases = this.canvasService.numberOfCanvases;
    this.canvasGroupForm = this.fb.group({
      canvasGroupControl: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.numberOfCanvases),
      ]),
    });
  }

  get canvasGroupControl() {
    return this.canvasGroupForm.get('canvasGroupControl');
  }

  ngOnInit() {
    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if (this.canvasGroupForm.valid) {
      const pageNumber = this.canvasGroupControl?.value;
      if (pageNumber !== null && pageNumber !== undefined)
        this.viewerService.goToCanvasGroup(
          this.canvasService.findCanvasGroupByCanvasIndex(pageNumber - 1),
          false,
        );
      this.dialogRef.close();
    }
  }
}

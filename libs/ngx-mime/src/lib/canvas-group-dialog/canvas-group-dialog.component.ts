import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { Subscription } from 'rxjs';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  templateUrl: './canvas-group-dialog.component.html',
  styleUrls: ['./canvas-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class CanvasGroupDialogComponent implements OnInit, OnDestroy {
  private readonly dialogRef =
    inject<MatDialogRef<CanvasGroupDialogComponent>>(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly intl = inject(MimeViewerIntl);

  numberOfCanvases: number;
  canvasGroupForm: FormGroup<{
    canvasGroupControl: FormControl<number | null>;
  }>;
  private readonly subscriptions = new Subscription();

  constructor() {
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

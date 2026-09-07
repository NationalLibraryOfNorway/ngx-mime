import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  max,
  min,
  required,
} from '@angular/forms/signals';
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
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  templateUrl: './canvas-group-dialog.component.html',
  styleUrls: ['./canvas-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    FormField,
    FormRoot,
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
export class CanvasGroupDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<CanvasGroupDialogComponent>>(MatDialogRef);
  private readonly viewerService = inject(ViewerService);
  private readonly canvasService = inject(CanvasService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly canvasCount = this.canvasService.canvasCount;
  readonly canvasGroupModel = signal(Number.NaN);
  readonly canvasGroupForm = form(
    this.canvasGroupModel,
    (path) => {
      required(path);
      min(path, 1);
      max(path, () => this.canvasCount());
    },
    {
      submission: {
        action: async () => this.goToCanvasGroup(),
      },
    },
  );
  readonly canvasGroupDoesNotExist = computed(() =>
    this.canvasGroupForm()
      .errors()
      .some((error) => error.kind === 'max'),
  );

  private goToCanvasGroup(): void {
    const pageNumber = this.canvasGroupModel();
    this.viewerService.goToCanvasGroup(
      this.canvasService.findCanvasGroupByCanvasIndex(pageNumber - 1),
      false,
    );
    this.dialogRef.close();
  }
}

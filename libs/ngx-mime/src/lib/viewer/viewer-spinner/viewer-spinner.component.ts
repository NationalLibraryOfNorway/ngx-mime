import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { SpinnerService } from '../../core/spinner-service/spinner.service';

@Component({
  selector: 'mime-spinner',
  templateUrl: './viewer-spinner.component.html',
  styleUrls: ['./viewer-spinner.component.scss'],
  imports: [MatProgressSpinner],
})
export class ViewerSpinnerComponent {
  private readonly spinnerService = inject(SpinnerService);

  readonly intl = inject(MimeViewerIntl).value;
  readonly visible = this.spinnerService.visible;
}

import { Component, HostListener, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';

@Component({
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogContent,
  ],
})
export class AttributionDialogComponent {
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly accessKeysHandlerService = inject(AccessKeysService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly manifest = this.iiifManifestService.manifest;

  @HostListener('keydown', ['$event'])
  handleKeys(event: KeyboardEvent) {
    this.accessKeysHandlerService.handleKeyEvents(event);
  }
}

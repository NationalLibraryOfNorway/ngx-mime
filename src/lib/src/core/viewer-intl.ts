import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MimeViewerIntl {
  changes: Subject<void> = new Subject<void>();

  metadataLabel = 'Info';
  close = 'Close';
  attribution = 'Attribution';
  contents = 'Contents';
  metadata = 'Metadata';
  license = 'License';
}

import { Component, input } from '@angular/core';
import {
  MimeModule,
  MimeViewerConfig,
} from '@nationallibraryofnorway/ngx-mime';

@Component({
  selector: 'app-components-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [MimeModule],
})
export class ViewerComponent {
  readonly manifestUri = input.required<string>();
  readonly canvasIndex = input.required<number>();
  protected viewerConfig: MimeViewerConfig = new MimeViewerConfig({
    screenReaderRecognizedTextContentEnabled: true,
  });
}

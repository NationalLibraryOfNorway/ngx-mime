import { Component, Input } from '@angular/core';
import { MimeViewerComponent } from '@nationallibraryofnorway/ngx-mime';

@Component({
  selector: 'app-components-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [MimeViewerComponent],
})
export class ViewerComponent {
  @Input()
  manifestUri!: string;
  @Input()
  canvasIndex!: number;
}

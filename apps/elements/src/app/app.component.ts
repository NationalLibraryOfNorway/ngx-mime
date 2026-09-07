import { Component, computed, input } from '@angular/core';
import {
  MimeModule,
  MimeViewerConfig,
} from '@nationallibraryofnorway/ngx-mime';

@Component({
  selector: 'nationallibraryofnorway-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MimeModule],
})
export class AppComponent {
  readonly manifestUri = input.required<string>();
  readonly config = input<string>();
  readonly mimeConfig = computed(() => this.getMimeConfig());

  private getMimeConfig(): MimeViewerConfig {
    const config = this.config();

    return new MimeViewerConfig(config ? JSON.parse(config) : undefined);
  }
}

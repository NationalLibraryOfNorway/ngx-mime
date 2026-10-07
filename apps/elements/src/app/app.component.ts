import { Component, computed, input, viewChild } from '@angular/core';
import {
  MimeModule,
  MimeViewerConfig,
  MimeViewerComponent,
} from '@nationallibraryofnorway/ngx-mime';

export const SET_AJAX_HEADERS_EVENT = 'ngxMimeSetAjaxHeaders';

@Component({
  selector: 'nationallibraryofnorway-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MimeModule],
  host: {
    '(ngxMimeSetAjaxHeaders)': 'handleSetAjaxHeaders($event)',
  },
})
export class AppComponent {
  private readonly viewer = viewChild.required(MimeViewerComponent);
  readonly manifestUri = input<string | null>(null);
  readonly config = input<string>();
  readonly mimeConfig = computed(() => this.getMimeConfig());

  protected handleSetAjaxHeaders(event: Event): void {
    this.viewer().setAjaxHeaders(
      (event as CustomEvent<Record<string, string> | null>).detail,
    );
  }

  private getMimeConfig(): MimeViewerConfig {
    const config = this.config();

    return new MimeViewerConfig(config ? JSON.parse(config) : undefined);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MimeViewerConfig } from '@nationallibraryofnorway/ngx-mime';

@Component({
  selector: 'nationallibraryofnorway-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  @Input() manifestUri!: string;
  @Input() config?: string;
  mimeConfig = new MimeViewerConfig();

  ngOnInit() {
    if (this.config) {
      this.mimeConfig = Object.assign(this.mimeConfig, JSON.parse(this.config));
    }
  }
}

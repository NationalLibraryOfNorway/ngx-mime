import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  manifestUri = 'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest';

  constructor() { }
}

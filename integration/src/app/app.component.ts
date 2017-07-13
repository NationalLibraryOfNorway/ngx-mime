import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  manifestUri = 'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest';
  options: any = null;

  constructor() { }
}

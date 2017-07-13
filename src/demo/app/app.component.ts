import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  manifestUri = 'https://api.nb.no/catalog/v1/iiif/02810a70549a53e15b317842601ba37c/manifest';
  options: any = null;

  constructor() { }

}

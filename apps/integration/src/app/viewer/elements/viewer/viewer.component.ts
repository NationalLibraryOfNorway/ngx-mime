import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-elements-viewer',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent {
  readonly manifestUri = input.required<string>();
}

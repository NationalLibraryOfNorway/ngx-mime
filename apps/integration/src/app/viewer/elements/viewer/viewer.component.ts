import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-elements-viewer',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent {
  @Input()
  manifestUri!: string;
}

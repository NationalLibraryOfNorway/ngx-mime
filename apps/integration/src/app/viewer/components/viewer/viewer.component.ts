import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-components-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  standalone: false,
})
export class ViewerComponent {
  @Input()
  manifestUri!: string;
  @Input()
  canvasIndex!: number;
}

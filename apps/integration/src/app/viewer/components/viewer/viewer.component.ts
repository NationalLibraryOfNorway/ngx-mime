import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-components-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @Input()
  manifestUri: string;

  constructor() { }

  ngOnInit(): void {
  }

}

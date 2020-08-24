import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-elements-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @Input()
  manifestUri: string;

  constructor() {}

  ngOnInit(): void {}
}

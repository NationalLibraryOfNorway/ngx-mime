import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  watcher: Subscription;
  sidenavMode = 'side';
  sidenavIsOpen = false;

  constructor(private media: ObservableMedia) {}

  ngOnInit(): void {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.layout();
    });

    this.layout();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  private layout() {
    if (this.media.isActive('lt-md')) {
      this.sidenavMode = 'over';
      this.sidenavIsOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavIsOpen = true;
    }
  }
}

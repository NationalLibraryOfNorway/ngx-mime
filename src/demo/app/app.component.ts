import { Component, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  watcher: Subscription;
  sidenavMode = 'side';
  sidenavIsOpen = false;

  constructor(private media: ObservableMedia) { }

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

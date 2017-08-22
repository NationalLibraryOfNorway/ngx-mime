import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ResizeService {

  get onResize(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  private resizeSubject: ReplaySubject<Window>;

  constructor(private eventManager: EventManager) {
    this.resizeSubject = new ReplaySubject();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResizeEvent.bind(this));
  }

  private onResizeEvent(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }
}

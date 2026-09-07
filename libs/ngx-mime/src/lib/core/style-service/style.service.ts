import { Injectable, signal, Signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable()
export class StyleService {
  readonly color: Signal<string | undefined>;
  private readonly colorState = signal<string | undefined>(undefined);
  private subscriptions!: Subscription;

  constructor() {
    this.color = this.colorState.asReadonly();
  }

  initialize() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      interval(1000).subscribe(() =>
        this.colorState.set(this.getComputedBackgroundColor()),
      ),
    );
  }

  destroy() {
    this.subscriptions.unsubscribe();
  }

  private getComputedBackgroundColor(): string | undefined {
    const matAppBackground =
      document.getElementsByClassName('mat-app-background');
    const matSidenavContainer = document.getElementsByTagName(
      'mat-sidenav-container',
    );

    if (matAppBackground.length > 0) {
      return this.getComputedStyle(matAppBackground[0], 'background-color');
    } else if (matSidenavContainer.length > 0) {
      return this.getComputedStyle(matSidenavContainer[0], 'background-color');
    } else {
      return undefined;
    }
  }

  private getComputedStyle(el: any, property: string) {
    return window.getComputedStyle(el, null).getPropertyValue(property);
  }
}

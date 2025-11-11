import { Injectable, NgZone, inject } from '@angular/core';
import { interval, ReplaySubject, Observable, Subscription } from 'rxjs';
import { switchMap, tap, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StyleService {
  private zone = inject(NgZone);
  private currentRgbColor: string | undefined;
  private colorSubject: ReplaySubject<string | undefined> = new ReplaySubject();
  private subscriptions!: Subscription;

  get onChange(): Observable<string | undefined> {
    return this.colorSubject.asObservable().pipe(
      filter((color: string | undefined) => color !== null),
      distinctUntilChanged(),
    );
  }

  initialize() {
    this.subscriptions = new Subscription();
    this.zone.runOutsideAngular(() => {
      this.subscriptions.add(
        interval(1000)
          .pipe(
            tap(() => {
              const previousRgbColor = this.currentRgbColor;
              const currentRgbColor = this.getComputedBackgroundColor(1);
              if (previousRgbColor !== currentRgbColor) {
                this.currentRgbColor = currentRgbColor;
                this.colorSubject.next(currentRgbColor);
              }
            }),
          )
          .subscribe(),
      );
    });
  }

  destroy() {
    this.subscriptions.unsubscribe();
  }

  public convertToRgba(rgbColor: string, opacity: number) {
    return rgbColor.replace(/rgb/i, 'rgba').replace(/\)/i, `,${opacity})`);
  }

  private getComputedBackgroundColor(opacity: number): string | undefined {
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

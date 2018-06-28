import { Injectable, NgZone } from '@angular/core';
import { interval, ReplaySubject, Observable } from 'rxjs';
import { switchMap, tap, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private currentRgbColor: string;
  private colorSubject: ReplaySubject<string> = new ReplaySubject();

  constructor(private zone: NgZone) {}

  get onChange(): Observable<string> {
    return this.colorSubject.asObservable().pipe(
      filter(c => c !== null),
      distinctUntilChanged()
    );
  }

  init() {
    this.zone.runOutsideAngular(() => {
      interval(1000)
        .pipe(
          tap(() => {
            const previousRgbColor = this.currentRgbColor;
            const currentRgbColor = this.getComputedBackgroundColor(1);
            if (previousRgbColor !== currentRgbColor) {
              this.currentRgbColor = currentRgbColor;
              this.colorSubject.next(currentRgbColor);
            }
          })
        )
        .subscribe();
    });
  }

  public convertToRgba(rgbColor: string, opacity: number) {
    return rgbColor.replace(/rgb/i, 'rgba').replace(/\)/i, `,${opacity})`);
  }

  private getComputedBackgroundColor(opacity: number): string {
    const matAppBackground = document.getElementsByClassName(
      'mat-app-background'
    );
    const matSidenavContainer = document.getElementsByTagName(
      'mat-sidenav-container'
    );

    if (matAppBackground.length > 0) {
      return this.getComputedStyle(matAppBackground[0], 'background-color');
    } else if (matSidenavContainer.length > 0) {
      return this.getComputedStyle(matSidenavContainer[0], 'background-color');
    } else {
      return null;
    }
  }

  private getComputedStyle(el: any, property: string) {
    return window.getComputedStyle(el, null).getPropertyValue(property);
  }
}

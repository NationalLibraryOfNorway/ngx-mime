import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MockBreakpointObserver extends BreakpointObserver {
  private breakpoints = new BehaviorSubject<BreakpointState>({
    matches: false,
    breakpoints: {},
  });

  constructor() {
    super(null as any, null as any);
  }

  setMatches(matches: boolean): void {
    this.breakpoints.next({ matches, breakpoints: {} });
  }
  override observe(value: string | readonly string[]): any {
    return this.breakpoints.asObservable();
  }

  override isMatched(query: string): boolean {
    return this.breakpoints.value.matches;
  }
}

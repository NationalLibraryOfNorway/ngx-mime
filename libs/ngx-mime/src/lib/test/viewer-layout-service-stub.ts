import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewerLayout } from '../core/models/viewer-layout';

@Injectable()
export class ViewerLayoutServiceStub {
  readonly viewerLayout = signal(ViewerLayout.ONE_PAGE);
  readonly onChange = new BehaviorSubject<ViewerLayout>(ViewerLayout.ONE_PAGE);
  readonly isHandsetOrTabletInPortrait = signal(false);
  readonly isWeb = signal(true);
  readonly isXSmall = signal(false);

  get layout(): ViewerLayout {
    return this.viewerLayout();
  }

  setLayout(viewerLayout: ViewerLayout): void {
    this.viewerLayout.set(viewerLayout);
    this.onChange.next(viewerLayout);
  }

  useMobileViewport(): void {
    this.isHandsetOrTabletInPortrait.set(true);
    this.isWeb.set(false);
    this.isXSmall.set(true);
  }
}

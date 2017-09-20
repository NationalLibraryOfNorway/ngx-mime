import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

import { OsdToolbarComponent } from './osd-toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from '../../core/viewer-intl';
import { PageService } from '../../core/page-service/page-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { ClickService } from '../../core/click-service/click.service';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';

describe('OsdToolbarComponent', () => {
  let component: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [OsdToolbarComponent],
      providers: [
        MimeResizeService,
        MimeViewerIntl,
        { provide: ViewerService, useClass: ViewerServiceMock },
        { provide: PageService, useClass: PageServiceMock },
        ClickService,
        PageService,
        ModeService,
        MimeDomHelper,
        FullscreenService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should enable both navigation buttons when viewer is on second page',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {

      viewerService.pageChanged.next(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      const nextButton = fixture.debugElement.query(By.css('#navigateNextButton'));
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      expect(nextButton.nativeElement.disabled).toBeFalsy();
    }));

  it('should disable previous button when viewer is on first page',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {

      viewerService.pageChanged.next(0);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      expect(button.nativeElement.disabled).toBeTruthy();
    }));

  it('should disable next button when viewer is on last page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageService) => {
      spyOnProperty(pageService, 'numberOfPages', 'get').and.returnValue(10);

      viewerService.pageChanged.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#navigateNextButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

  it('should display next page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      spy = spyOn(viewerService, 'goToNextPage');

      const button = fixture.debugElement.query(By.css('#navigateNextButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

  it('should display previous page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      spy = spyOn(component, 'goToPreviousPage');

      const button = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

});

class ViewerServiceMock {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  public goToPreviousPage(): void { }

  public goToNextPage(): void { }

}

class PageServiceMock {
  public _numberOfPages: number;

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  public getZoom(): number {
    return 0;
  }
}

import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../shared/shared.module';
import { PageDialogComponent } from './page-dialog.component';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { PageService } from '../core/page-service/page-service';
import { ClickService } from '../core/click-service/click.service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';

describe('PageDialogComponent', () => {
  let component: PageDialogComponent;
  let fixture: ComponentFixture<PageDialogComponent>;
  let intl: MimeViewerIntl;
  let pageService: PageServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [
        PageDialogComponent
      ],
      providers: [
        ViewerService,
        ClickService,
        ModeService,
        ViewerLayoutService,
        MimeViewerIntl,
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: PageService, useClass: PageServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDialogComponent);
    component = fixture.componentInstance;
    intl = TestBed.get(MimeViewerIntl);
    pageService = TestBed.get(PageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', () => {
    const title = fixture.debugElement.query(By.css('.page-dialog-title'));

    intl.goToPageLabel = 'Testlabel';
    intl.changes.next();
    fixture.detectChanges();

    expect(title.nativeElement.innerHTML).toBe('Testlabel');
  });

  describe('error messages', () => {

    it('should show a error message if user enters a page number that does not exists', fakeAsync(() => {
      pageService._currentNumberOfPages.next(10);

      component.pageNumber.setValue(11);

      component.pageNumber.markAsTouched();
      fixture.detectChanges();
      flush();

      const pageDoesNotExistsError = fixture.debugElement.query(By.css('#pageDoesNotExistsError'));
      expect(pageDoesNotExistsError).not.toBeNull();
    }));

  });

});

class MatDialogRefMock {
  public close(): void {}
}

class PageServiceMock {
  _currentNumberOfPages: BehaviorSubject<number> = new BehaviorSubject(10);
  _currentPage: BehaviorSubject<number> = new BehaviorSubject(0);

  get onPageChange(): Observable<number> {
    return this._currentPage.asObservable().distinctUntilChanged();
  }

  get onNumberOfPagesChange(): Observable<number> {
    return this._currentNumberOfPages.asObservable().distinctUntilChanged();
  }

  get numberOfTiles(): number {
    return this._currentNumberOfPages.value;
  }

  getTilesStringFromPageIndex(index: number): string {
    return '' + index;
  }
}

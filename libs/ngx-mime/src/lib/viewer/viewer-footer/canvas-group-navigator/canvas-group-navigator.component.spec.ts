import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CanvasGroupNavigatorComponent } from './canvas-group-navigator.component';
import { SharedModule } from './../../../shared/shared.module';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { Hit } from './../../../core/models/hit';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';
import { CanvasServiceStub } from '../../../test/canvas-service-stub';

describe('CanvasGroupNavigatorComponent', () => {
  let component: CanvasGroupNavigatorComponent;
  let fixture: ComponentFixture<CanvasGroupNavigatorComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [CanvasGroupNavigatorComponent],
      providers: [
        MimeViewerIntl,
        CanvasGroupDialogService,
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: CanvasService, useClass: CanvasServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGroupNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', inject(
    [MimeViewerIntl],
    (intl: MimeViewerIntl) => {
      const text = fixture.debugElement.query(
        By.css('#footerNavigateNextButton')
      );
      expect(text.nativeElement.getAttribute('aria-label')).toContain(
        `Next Page`
      );

      intl.nextPageLabel = 'New test string';
      intl.changes.next();
      fixture.detectChanges();
      expect(text.nativeElement.getAttribute('aria-label')).toContain(
        'New test string'
      );
    }
  ));

  it('should enable both navigation buttons when viewer is on second canvas group', inject(
    [CanvasService],
    (canvasService: CanvasServiceStub) => {
      canvasService._currentCanvasGroupIndex.next(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(
        By.css('#footerNavigateBeforeButton')
      );
      const nextButton = fixture.debugElement.query(
        By.css('#footerNavigateNextButton')
      );
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      expect(nextButton.nativeElement.disabled).toBeFalsy();
    }
  ));

  it('should disable previous button when viewer is on first canvas group', inject(
    [CanvasService],
    (canvasService: CanvasServiceStub) => {
      canvasService._currentCanvasGroupIndex.next(0);
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#footerNavigateBeforeButton')
      );
      expect(button.nativeElement.disabled).toBeTruthy();
    }
  ));

  it('should disable next button when viewer is on last canvas group', inject(
    [CanvasService],
    (canvasService: CanvasServiceStub) => {
      canvasService._currentNumberOfCanvasGroups.next(10);

      canvasService._currentCanvasGroupIndex.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('#footerNavigateNextButton')
        );
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }
  ));

  it('should display next canvas group', inject(
    [ViewerService, CanvasService],
    (viewerService: ViewerServiceStub, canvasService: CanvasServiceStub) => {
      spy = spyOn(viewerService, 'goToNextCanvasGroup');

      const button = fixture.debugElement.query(
        By.css('#footerNavigateNextButton')
      );
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }
  ));

  it('should display previous canvas group', inject(
    [ViewerService, CanvasService],
    (viewerService: ViewerServiceStub, canvasService: CanvasServiceStub) => {
      spy = spyOn(component, 'goToPreviousCanvasGroup');

      canvasService._currentCanvasGroupIndex.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('#footerNavigateBeforeButton')
        );
        button.nativeElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(spy.calls.count()).toEqual(1);
        });
      });
    }
  ));
});

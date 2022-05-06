import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../../../testing/injected-stub';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { Rect } from '../../../core/models/rect';
import { ViewerLayout } from '../../../core/models/viewer-layout';
import { CanvasServiceStub } from '../../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { SharedModule } from './../../../shared/shared.module';
import { CanvasGroupNavigatorComponent } from './canvas-group-navigator.component';

describe('CanvasGroupNavigatorComponent', () => {
  let component: CanvasGroupNavigatorComponent;
  let fixture: ComponentFixture<CanvasGroupNavigatorComponent>;
  let spy: any;
  let canvasService: CanvasServiceStub;
  let viewerService: ViewerService;
  let intl: MimeViewerIntl;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule, SharedModule],
        declarations: [CanvasGroupNavigatorComponent],
        providers: [
          MimeViewerIntl,
          CanvasGroupDialogService,
          { provide: ViewerService, useClass: ViewerServiceStub },
          { provide: CanvasService, useClass: CanvasServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGroupNavigatorComponent);
    canvasService = injectedStub(CanvasService);
    viewerService = injectedStub(ViewerService);
    intl = TestBed.inject(MimeViewerIntl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', () => {
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
  });

  it('should enable both navigation buttons when viewer is on second canvas group', () => {
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
  });

  it('should disable previous button when viewer is on first canvas group', () => {
    canvasService._currentCanvasGroupIndex.next(0);
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('#footerNavigateBeforeButton')
    );
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it(
    'should disable next button when viewer is on last canvas group',
    waitForAsync(() => {
      canvasService._currentNumberOfCanvasGroups.next(10);

      canvasService._currentCanvasGroupIndex.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('#footerNavigateNextButton')
        );
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    })
  );

  it(
    'should display next canvas group',
    waitForAsync(() => {
      spy = spyOn(viewerService, 'goToNextCanvasGroup').and.stub();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(
          By.css('#footerNavigateNextButton')
        );
        button.nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.count()).toEqual(1);
      });
    })
  );

  it(
    'should display previous canvas group',
    waitForAsync(() => {
      spy = spyOn(viewerService, 'goToPreviousCanvasGroup');

      canvasService._currentCanvasGroupIndex.next(9);

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const button = fixture.debugElement.query(
          By.css('#footerNavigateBeforeButton')
        );
        button.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(spy.calls.count()).toEqual(1);
        });
      });
    })
  );

  it(
    'should disable previous and next button if there is only one canvas',
    waitForAsync(() => {
      canvasService.addAll([new Rect()], ViewerLayout.ONE_PAGE);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const previousButton = fixture.debugElement.query(
          By.css('#footerNavigateBeforeButton')
        );
        const nextButton = fixture.debugElement.query(
          By.css('#footerNavigateNextButton')
        );

        expect(nextButton.nativeElement.disabled).toBeTrue();
        expect(previousButton.nativeElement.disabled).toBeTrue();
      });
    })
  );

  it(
    'should check hotkeys',
    waitForAsync(() => {
      const event: KeyboardEvent = new KeyboardEvent('keydown', {
        code: '70', // 'f'
      });

      spy = spyOn(component, 'onSliderHotKey').and.callThrough();
      canvasService.addAll([new Rect()], ViewerLayout.ONE_PAGE);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const slider = fixture.debugElement.query(By.css('.navigation-slider'));
        slider.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
    })
  );
});

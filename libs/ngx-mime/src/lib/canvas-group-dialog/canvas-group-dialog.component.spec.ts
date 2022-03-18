import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../testing/injected-stub';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ClickService } from '../core/click-service/click.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { SharedModule } from '../shared/shared.module';
import { AltoServiceStub } from '../test/alto-service-stub';
import { CanvasServiceStub } from '../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';

describe('PageDialogComponent', () => {
  let component: CanvasGroupDialogComponent;
  let fixture: ComponentFixture<CanvasGroupDialogComponent>;
  let loader: HarnessLoader;

  let intl: MimeViewerIntl;
  let canvasService: CanvasServiceStub;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, HttpClientTestingModule, SharedModule],
        declarations: [CanvasGroupDialogComponent],
        providers: [
          ViewerService,
          ClickService,
          ModeService,
          ViewerLayoutService,
          MimeViewerIntl,
          {
            provide: IiifContentSearchService,
            useClass: IiifContentSearchServiceStub,
          },
          { provide: MatDialogRef, useClass: MatDialogRefStub },
          { provide: CanvasService, useClass: CanvasServiceStub },
          { provide: AltoService, useClass: AltoServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGroupDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    intl = TestBed.inject(MimeViewerIntl);
    canvasService = injectedStub(CanvasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', () => {
    const title = fixture.debugElement.query(
      By.css('.canvas-group-dialog-title')
    );

    intl.goToPageLabel = 'Testlabel';
    intl.changes.next();
    fixture.detectChanges();

    expect(title.nativeElement.innerHTML).toBe('Testlabel');
  });

  describe('error messages', () => {
    it('should show a error message if user enters a canvas group number index that does not exists', fakeAsync(async () => {
      canvasService._currentNumberOfCanvasGroups.next(10);

      component.canvasGroupControl.setValue(11);

      component.canvasGroupControl.markAsTouched();
      fixture.detectChanges();
      flush();

      const canvasGroupDoesNotExistsError = await loader.getHarness(
        MatFormFieldHarness
      );
      expect(await canvasGroupDoesNotExistsError.hasErrors()).toBeTrue();
    }));
  });
});

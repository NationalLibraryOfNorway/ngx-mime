import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { RecognizedTextContentComponent } from './recognized-text-content.component';

describe('RecognizedTextContentComponent', () => {
  let component: RecognizedTextContentComponent;
  let fixture: ComponentFixture<RecognizedTextContentComponent>;
  let altoService: any;
  let canvasService: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RecognizedTextContentComponent],
        providers: [
          MimeViewerIntl,
          CanvasService,
          AltoService,
          MimeViewerIntl,
          IiifContentSearchService,
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizedTextContentComponent);
    component = fixture.componentInstance;
    altoService = TestBed.inject(AltoService);
    canvasService = TestBed.inject(CanvasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recognized text', waitForAsync(() => {
    const firstCanvasRecognizedTextContent =
      '<p>fakefirstCanvasRecognizedText</p>';
    const secondCanvasRecognizedTextContent =
      '<p>fakeSecondRecognizedTextContent</p>';
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1]);
    spyOn(altoService, 'getHtml')
      .withArgs(0)
      .and.returnValue(firstCanvasRecognizedTextContent)
      .withArgs(1)
      .and.returnValue(secondCanvasRecognizedTextContent);
    spyOnProperty(altoService, 'onTextContentReady$').and.returnValue(
      cold('x|')
    );

    fixture.detectChanges();
    getTestScheduler().flush();

    const firstCanvasRecognizedTextContentDe: DebugElement =
      fixture.debugElement.query(
        By.css('div[data-test-id="firstCanvasRecognizedTextContent"]')
      );
    const secondCanvasRecognizedTextContentDe: DebugElement =
      fixture.debugElement.query(
        By.css('div[data-test-id="secondCanvasRecognizedTextContent"]')
      );
    expect(firstCanvasRecognizedTextContentDe.nativeElement.innerHTML).toBe(
      firstCanvasRecognizedTextContent
    );
    expect(secondCanvasRecognizedTextContentDe.nativeElement.innerHTML).toBe(
      secondCanvasRecognizedTextContent
    );
  }));

  it('should show error message', () => {
    spyOnProperty(altoService, 'hasErrors$').and.returnValue(
      cold('x|', { x: 'fakeError' })
    );

    fixture.detectChanges();
    getTestScheduler().flush();

    const error: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="error"]')
    );
    expect(error.nativeElement.innerHTML).toBe('fakeError');
  });
});

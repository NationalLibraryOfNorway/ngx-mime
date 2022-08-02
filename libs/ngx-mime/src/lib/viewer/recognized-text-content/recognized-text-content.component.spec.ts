import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { MimeViewerConfig } from '../../core/mime-viewer-config';
import { Hit } from '../../core/models/hit';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { RecognizedTextContentComponent } from './recognized-text-content.component';

fdescribe('RecognizedTextContentComponent', () => {
  let component: RecognizedTextContentComponent;
  let fixture: ComponentFixture<RecognizedTextContentComponent>;
  let altoService: any;
  let canvasService: any;
  let highlightService: any;
  let iiifContentSearchService: any;

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
          HighlightService,
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
    highlightService = TestBed.inject(HighlightService);
    iiifContentSearchService = TestBed.inject(IiifContentSearchService);

    altoService.setConfig(new MimeViewerConfig());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recognized text', (done: DoneFn) => {
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
      .and.returnValue(secondCanvasRecognizedTextContent)
      .and.callThrough();
    spyOnProperty(altoService, 'onTextContentReady$').and.returnValue(
      cold('x|')
    );

    fixture.detectChanges();
    getTestScheduler().flush();

    fixture.whenStable().then(() => {
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
      done();
    });
  });

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

  it('should call highlightSelectedHit in onSelected subscribe', () => {
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1]);
    spyOnProperty(iiifContentSearchService, 'onSelected').and.returnValue(
      of(createMockHit(1, 'test '))
    );
    const spy = spyOn(
      highlightService,
      'highlightSelectedHit'
    ).and.callThrough();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call highlightSelectedHit in updateRecognizedText method', (done: DoneFn) => {
    component.selectedHit = 1;
    spyOnProperty(altoService, 'onTextContentReady$').and.returnValue(
      cold('x|')
    );
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1]);
    const spy = spyOn(
      highlightService,
      'highlightSelectedHit'
    ).and.callThrough();

    fixture.detectChanges();
    getTestScheduler().flush();

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  function createMockHit(id: number, match: string): Hit {
    return {
      id,
      index: 0,
      match,
      label: '',
      before: '',
      after: '',
      rects: [],
    };
  }
});

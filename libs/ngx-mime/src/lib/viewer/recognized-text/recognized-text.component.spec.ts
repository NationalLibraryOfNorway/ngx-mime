import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { RecognizedTextComponent } from './recognized-text.component';

describe('RecognizedTextComponent', () => {
  let component: RecognizedTextComponent;
  let fixture: ComponentFixture<RecognizedTextComponent>;
  let altoService: any;
  let canvasService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RecognizedTextComponent],
      providers: [
        MimeViewerIntl,
        CanvasService,
        AltoService,
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RecognizedTextComponent);
    component = fixture.componentInstance;
    altoService = TestBed.inject(AltoService);
    canvasService = TestBed.inject(CanvasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recognized text', () => {
    const firstCanvasRecognizedTextContent =
      '<p>fakefirstCanvasRecognizedText</p>';
    const secondCanvasRecognizedTextContent = '<p>fakeSecondRecognizedText</p>';
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1]);
    spyOn(altoService, 'getHtml')
      .withArgs(0)
      .and.returnValue(firstCanvasRecognizedTextContent)
      .withArgs(1)
      .and.returnValue(secondCanvasRecognizedTextContent);
    spyOnProperty(altoService, 'onTextReady$').and.returnValue(cold('x|'));

    fixture.detectChanges();
    getTestScheduler().flush();

    const firstCanvasRecognizedTextDe: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="firstCanvasRecognizedText"]')
    );
    const secondCanvasRecognizedTextDe: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="secondCanvasRecognizedText"]')
    );
    expect(firstCanvasRecognizedTextDe.nativeElement.innerHTML).toBe(
      firstCanvasRecognizedTextContent
    );
    expect(secondCanvasRecognizedTextDe.nativeElement.innerHTML).toBe(
      secondCanvasRecognizedTextContent
    );
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
});

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
import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let altoService: any;
  let canvasService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TextComponent],
      providers: [
        MimeViewerIntl,
        CanvasService,
        AltoService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    altoService = TestBed.inject(AltoService);
    canvasService = TestBed.inject(CanvasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show text', () => {
    const text1Content = '<p>fakeText1</p>';
    const text2Content = '<p>fakeText2</p>';
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1]);
    spyOn(altoService, 'getHtml')
      .withArgs(0)
      .and.returnValue(text1Content)
      .withArgs(1)
      .and.returnValue(text2Content);
    spyOnProperty(altoService, 'onTextReady').and.returnValue(cold('x|'));

    fixture.detectChanges();
    getTestScheduler().flush();

    const text1: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="text1"]')
    );
    const text2: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="text2"]')
    );
    expect(text1.nativeElement.innerHTML).toBe(text1Content);
    expect(text2.nativeElement.innerHTML).toBe(text2Content);
  });

  it('should show error message', () => {
    spyOnProperty(altoService, 'hasErrors').and.returnValue(
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

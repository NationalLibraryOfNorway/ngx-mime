import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy } from 'jest-auto-spies';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ClickService } from '../../core/click-service/click.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest, Structure } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { SharedModule } from '../../shared/shared.module';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { ViewerServiceStub } from './../../test/viewer-service-stub';
import { TocComponent } from './table-of-contents.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;
  let iiifManifestService: IiifManifestServiceStub;
  let viewerService: ViewerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, TocComponent],
      providers: [
        ClickService,
        provideAutoSpy(CanvasService),
        ModeService,
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: ViewerService, useClass: ViewerServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    iiifManifestService = TestBed.inject<any>(IiifManifestService);
    viewerService = TestBed.inject(ViewerService);

    iiifManifestService._currentManifest.next(
      new Manifest({
        sequences: [
          {
            canvases: [
              { id: 'canvas1' },
              { id: 'canvas2' },
              { id: 'canvas3' },
              { id: 'canvas4' },
              { id: 'canvas5' },
            ],
          },
        ],
        structures: [
          new Structure({
            label: 'Forside',
            canvases: ['canvas1'],
            canvasIndex: 0,
          }),
          new Structure({
            label: 'Tittelside',
            canvases: ['canvas2'],
            canvasIndex: 1,
          }),
          new Structure({
            label: 'Bakside',
            canvases: ['canvas5'],
            canvasIndex: 4,
          }),
        ],
      }),
    );

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display table of contents', () => {
    fixture.detectChanges();

    const structures: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.toc-link'),
    );
    expect(structures.length).toEqual(3);
  });

  it('should display the correct label', () => {
    const labels: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.label'),
    );
    expect(labels[0].nativeElement.textContent).toEqual('Forside');
    expect(labels[1].nativeElement.textContent).toEqual('Tittelside');
    expect(labels[2].nativeElement.textContent).toEqual('Bakside');
  });

  it('should display the correct canvas group index', () => {
    const canvasGroupNumbers: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.canvasGroupIndex'),
    );
    expect(canvasGroupNumbers[0].nativeElement.textContent).toEqual('1');
    expect(canvasGroupNumbers[1].nativeElement.textContent).toEqual('2');
    expect(canvasGroupNumbers[2].nativeElement.textContent).toEqual('5');
  });

  it('should go to canvas group when selecting a canvas group in TOC', () => {
    jest.spyOn(viewerService, 'goToCanvas');

    const divs: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.toc-link'),
    );
    divs[2].triggerEventHandler('click', new Event('fakeEvent'));

    expect(viewerService.goToCanvas).toHaveBeenCalledWith(4, false);
  });
});

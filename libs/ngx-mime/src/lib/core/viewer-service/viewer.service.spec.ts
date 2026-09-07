import { Component, Injector, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAutoSpy } from 'jest-auto-spies';
import { filter, firstValueFrom } from 'rxjs';
import { mockIOS } from '../../test/navigator-mocks';
import { testManifest } from '../../test/testManifest';
import { AltoService } from '../alto-service/alto.service';
import { ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { CanvasService } from '../canvas-service/canvas-service';
import { ClickService } from '../click-service/click.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeService } from '../mode-service/mode.service';
import { RecognizedTextMode } from '../models';
import { Hit } from '../models/hit';
import { SearchResult } from '../models/search-result';
import { ViewerLayout } from '../models/viewer-layout';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { ViewerService } from './viewer.service';

@Component({
  template: ` <div [id]="openseadragonId()"></div> `,
})
class TestHostComponent {
  readonly openseadragonId = signal<string | null>(null);
}

describe('ViewerService', () => {
  const config = new MimeViewerConfig();
  let snackBar: MatSnackBar;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let injector: Injector;
  let viewerLayoutService: ViewerLayoutService;
  let viewerService: ViewerService;
  let recognizedTextContentModeState: WritableSignal<RecognizedTextMode>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, TestHostComponent],
      providers: [
        ViewerService,
        MimeViewerIntl,
        CanvasService,
        provideAutoSpy(ViewerLayoutService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(ClickService),
        ModeService,
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onSelected'],
        }),
        StyleService,
        provideAutoSpy(AltoService),
      ],
    });

    injector = TestBed.inject(Injector);
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    const altoService = TestBed.inject(AltoService) as any;
    recognizedTextContentModeState = signal(RecognizedTextMode.NONE);
    altoService.recognizedTextContentMode =
      recognizedTextContentModeState.asReadonly();
    viewerService = TestBed.inject(ViewerService);
    snackBar = TestBed.inject(MatSnackBar);
    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    hostFixture = TestBed.createComponent(TestHostComponent);
    viewerService.initialize();
    hostFixture.componentInstance.openseadragonId.set(
      viewerService.openseadragonId,
    );
    await hostFixture.whenStable();
  });

  afterEach(() => {
    viewerService.destroy();
  });

  it('should be created', () => {
    expect(viewerService).toBeTruthy();
  });

  it('should keep state of currentSearch on destroy when layoutSwitch = true', () => {
    viewerService.currentSearch = new SearchResult({
      q: 'Donald Duck',
      hits: new Array<Hit>(),
    });
    viewerService.destroy(true);
    expect(viewerService.currentSearch).not.toBeNull();
    expect(viewerService.currentSearch.q).toEqual('Donald Duck');
  });

  it('should set currentSearch to null on destroy', () => {
    viewerService.currentSearch = new SearchResult({
      q: 'Donald Duck',
      hits: new Array<Hit>(),
    });
    viewerService.destroy();
    expect(viewerService.currentSearch).toBeNull();
  });

  it('should keep state of rotation on destroy when layoutSwitch = true', async () => {
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );
    await waitForViewerReady();

    viewerService.rotate();
    viewerService.destroy(true);

    expect(viewerService.rotation()).toEqual(90);
  });

  it('should set rotation to 0 on destroy', async () => {
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );
    await waitForViewerReady();

    viewerService.rotate();
    viewerService.destroy(false);

    expect(viewerService.rotation()).toEqual(0);
  });

  it('should set viewer to null on destroy', async () => {
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );
    await waitForViewerReady();

    viewerService.destroy(false);

    expect(viewerService.getViewer()).toBeNull();
  });

  it('should hide pages in recognized-text-only mode', async () => {
    const hidePages = jest.spyOn(viewerService, 'hidePages');

    recognizedTextContentModeState.set(RecognizedTextMode.ONLY);
    await hostFixture.whenStable();

    expect(hidePages).toHaveBeenCalledTimes(1);
  });

  it('should apply only the latest recognized-text mode', async () => {
    const hidePages = jest.spyOn(viewerService, 'hidePages');
    const showPages = jest.spyOn(viewerService, 'showPages');

    recognizedTextContentModeState.set(RecognizedTextMode.ONLY);
    recognizedTextContentModeState.set(RecognizedTextMode.NONE);
    await hostFixture.whenStable();

    expect(hidePages).not.toHaveBeenCalled();
    expect(showPages).toHaveBeenCalledTimes(1);
  });

  describe('rotate', () => {
    it('should rotate if using webgl', async () => {
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        config,
      );
      await waitForViewerReady();

      viewerService.rotate();

      expect(viewerService.rotation()).toBe(90);
    });

    it('should show error message if using html', async () => {
      mockIOS();
      const openSpy = jest.spyOn(snackBar, 'open');
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        config,
      );
      const viewer = viewerService.getViewer();
      viewer.useCanvas = false;
      await waitForViewerReady();

      viewerService.rotate();

      expect(openSpy).toHaveBeenCalledTimes(1);
    });
  });

  function waitForViewerReady(): Promise<boolean> {
    return firstValueFrom(
      toObservable(viewerService.isReady, { injector }).pipe(
        filter((isReady) => isReady),
      ),
    );
  }
});

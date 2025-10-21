import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAutoSpy } from 'jest-auto-spies';
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
import { Hit } from '../models/hit';
import { SearchResult } from '../models/search-result';
import { ViewerLayout } from '../models/viewer-layout';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { ViewerService } from './viewer.service';

@Component({
  template: ` <div [id]="openseadragonId"></div> `,
})
class TestHostComponent {
  openseadragonId: string | null = null;
}

describe('ViewerService', () => {
  const config = new MimeViewerConfig();
  let snackBar: MatSnackBar;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let viewerLayoutService: ViewerLayoutService;
  let viewerService: ViewerService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatSnackBarModule, TestHostComponent],
      providers: [
        ViewerService,
        MimeViewerIntl,
        CanvasService,
        provideAutoSpy(ViewerLayoutService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(ClickService),
        provideAutoSpy(ModeService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onSelected'],
        }),
        provideAutoSpy(StyleService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(AltoService, {
          observablePropsToSpyOn: ['onRecognizedTextContentModeChange$'],
        }),
      ],
    });

    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    viewerService = TestBed.inject(ViewerService);
    snackBar = TestBed.inject(MatSnackBar);
    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    hostFixture = TestBed.createComponent(TestHostComponent);
    viewerService.initialize();
    hostFixture.componentInstance.openseadragonId =
      viewerService.openseadragonId;
    hostFixture.detectChanges();
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

  it('should keep state of rotation on destroy when layoutSwitch = true', (done) => {
    let rotation: number;
    viewerService.onRotationChange.subscribe((serviceRotation: number) => {
      rotation = serviceRotation;
    });
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );

    viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        viewerService.rotate();
        viewerService.destroy(true);
        expect(rotation).toEqual(90);
        done();
      }
    });
  });

  it('should set rotation to 0 on destroy', (done) => {
    let rotation: number;
    viewerService.onRotationChange.subscribe((serviceRotation: number) => {
      rotation = serviceRotation;
    });
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );

    viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        viewerService.rotate();
        viewerService.destroy(false);
        expect(rotation).toEqual(0);
        done();
      }
    });
  });

  it('should set viewer to null on destroy', (done) => {
    viewerService.setUpViewer(
      new ManifestBuilder(testManifest).build(),
      config,
    );

    viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        viewerService.destroy(false);
        expect(viewerService.getViewer()).toBeNull();
        done();
      }
    });
  });

  describe('rotate', () => {
    it('should rotate if using webgl', (done) => {
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        config,
      );

      viewerService.onOsdReadyChange.subscribe((state) => {
        if (state) {
          viewerService.rotate();
        }
      });

      viewerService.onRotationChange.subscribe((rotation: number) => {
        if (rotation !== 0) {
          expect(rotation).toBe(90);
          done();
        }
      });
    });

    it('should show error message if using html', (done) => {
      mockIOS();
      const openSpy = jest.spyOn(snackBar, 'open');
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        config,
      );
      const viewer = viewerService.getViewer();
      viewer.useCanvas = false;

      viewerService.onOsdReadyChange.subscribe((state) => {
        if (state) {
          viewerService.rotate();

          expect(openSpy).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });
  });
});

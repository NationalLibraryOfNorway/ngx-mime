import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AltoServiceStub } from '../../test/alto-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { testManifest } from '../../test/testManifest';
import { AltoService } from '../alto-service/alto.service';
import { ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ClickService } from '../click-service/click.service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Hit } from '../models/hit';
import { SearchResult } from '../models/search-result';
import { ViewerLayout } from '../models/viewer-layout';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { CanvasService } from './../canvas-service/canvas-service';
import { ModeService } from './../mode-service/mode.service';
import { ViewerService } from './viewer.service';

@Component({
  template: ` <div id="openseadragon"></div> `,
})
class TestHostComponent {}

describe('ViewerService', () => {
  let snackBar: MatSnackBar;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let viewerLayoutService: ViewerLayoutService;
  let viewerService: ViewerService;
  let originalTimeout: number;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [TestHostComponent],
      providers: [
        ViewerService,
        ClickService,
        CanvasService,
        ModeService,
        MimeResizeService,
        ViewerLayoutService,
        IiifContentSearchService,
        HttpClient,
        HttpHandler,
        MediaObserver,
        MimeViewerIntl,
        StyleService,
        HighlightService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: AltoService, useClass: AltoServiceStub },
      ],
    });

    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    viewerService = TestBed.inject(ViewerService);
    snackBar = TestBed.inject(MatSnackBar);
    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    hostFixture = TestBed.createComponent(TestHostComponent);
    viewerService.initialize();
    hostFixture.detectChanges();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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
      new MimeViewerConfig()
    );

    let subscription: Subscription;
    subscription = viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        subscription.unsubscribe();
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
      new MimeViewerConfig()
    );

    let subscription: Subscription;
    subscription = viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        subscription.unsubscribe();
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
      new MimeViewerConfig()
    );

    let subscription: Subscription;
    subscription = viewerService.onOsdReadyChange.subscribe((state) => {
      if (state) {
        subscription.unsubscribe();
        viewerService.destroy(false);
        expect(viewerService.getViewer()).toBeNull();
        done();
      }
    });
  });

  describe('rotate', () => {
    it('should rotate if using canvas', (done) => {
      const openSpy = spyOn(snackBar, 'open');
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        new MimeViewerConfig()
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

    it('should show error message if not using canvas', (done) => {
      const openSpy = spyOn(snackBar, 'open');
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        new MimeViewerConfig()
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

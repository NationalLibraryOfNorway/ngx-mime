import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { testManifest } from '../../test/testManifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { ClickService } from '../click-service/click.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Hit } from '../models/hit';
import { SearchResult } from '../models/search-result';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { CanvasService } from './../canvas-service/canvas-service';
import { ModeService } from './../mode-service/mode.service';
import { ViewerService } from './viewer.service';

@Component({
  template: ` <div id="openseadragon"></div> `,
})
class TestHostComponent {}

describe('ViewerService', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let viewerLayoutService: ViewerLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
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
      ],
    });

    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should be created', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      expect(viewerService).toBeTruthy();
    }
  ));

  it('should keep state of currentSearch on destroy when layoutSwitch = true', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({
        q: 'Donald Duck',
        hits: new Array<Hit>(),
      });
      viewerService.destroy(true);
      expect(viewerService.currentSearch).not.toBeNull();
      expect(viewerService.currentSearch.q).toEqual('Donald Duck');
    }
  ));

  it('should set currentSearch to null on destroy', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({
        q: 'Donald Duck',
        hits: new Array<Hit>(),
      });
      viewerService.destroy();
      expect(viewerService.currentSearch).toBeNull();
    }
  ));

  it('should keep state of rotation on destroy when layoutSwitch = true', function (done) {
    inject([ViewerService], (viewerService: ViewerService) => {
      let rotation: number;
      viewerService.onRotationChange.subscribe((serviceRotation: number) => {
        rotation = serviceRotation;
      });
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        new MimeViewerConfig()
      );

      viewerService.onOsdReadyChange.subscribe((state) => {
        if (state) {
          viewerService.rotate();
          viewerService.destroy(true);
          expect(rotation).toEqual(90);
          done();
        }
      });
    })();
  });

  it('should set rotation to 0 on destroy', function (done) {
    inject([ViewerService], (viewerService: ViewerService) => {
      let rotation: number;
      viewerService.onRotationChange.subscribe((serviceRotation: number) => {
        rotation = serviceRotation;
      });
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        new MimeViewerConfig()
      );

      viewerService.onOsdReadyChange.subscribe((state) => {
        if (state) {
          viewerService.rotate();
          viewerService.destroy();
          expect(rotation).toEqual(0);
          done();
        }
      });
    })();
  });

  it('should set viewer to null on destroy', function (done) {
    inject([ViewerService], (viewerService: ViewerService) => {
      viewerService.setUpViewer(
        new ManifestBuilder(testManifest).build(),
        new MimeViewerConfig()
      );

      viewerService.onOsdReadyChange.subscribe((state) => {
        if (state) {
          viewerService.destroy();
          expect(viewerService.getViewer()).toBeNull();
          done();
        }
      });
    })();
  });
});

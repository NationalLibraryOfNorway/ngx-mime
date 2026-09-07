import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasGroupDialogService } from '../../canvas-group-dialog/canvas-group-dialog.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { Hit } from '../../core/models/hit';
import { SearchResult } from '../../core/models/search-result';
import { ContentSearchNavigationService } from '../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { CanvasServiceStub } from '../../test/canvas-service-stub';
import { IiifContentSearchServiceStub } from '../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { ViewerLayoutServiceStub } from '../../test/viewer-layout-service-stub';
import { ViewerServiceStub } from '../../test/viewer-service-stub';
import { ViewerFooterComponent } from './viewer-footer.component';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let viewerLayoutServiceStub: ViewerLayoutServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let fixture: ComponentFixture<ViewerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ViewerFooterComponent],
      providers: [
        MimeViewerIntl,
        {
          provide: ViewerService,
          useClass: ViewerServiceStub,
        },
        {
          provide: CanvasService,
          useClass: CanvasServiceStub,
        },
        {
          provide: IiifManifestService,
          useClass: IiifManifestServiceStub,
        },
        CanvasGroupDialogService,
        ContentSearchNavigationService,
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        {
          provide: ViewerLayoutService,
          useClass: ViewerLayoutServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    viewerLayoutServiceStub = TestBed.inject<any>(ViewerLayoutService);
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
  });

  it('should always show pageNavigator in desktop size', async () => {
    await fixture.whenStable();

    expect(cmp.showPageNavigator()).toBeTruthy();
  });

  it('should show pageNavigator in desktop size and if content search navigator is displayed', async () => {
    const sr = new SearchResult();
    sr.add(new Hit());

    iiifContentSearchServiceStub.setSearchResult(sr);
    await fixture.whenStable();

    expect(cmp.showPageNavigator()).toBeTruthy();
    expect(cmp.showContentSearchNavigator()).toBeTruthy();
  });

  it('should hide pageNavigator if mobile size and content search navigator is displayed', async () => {
    const sr = new SearchResult();
    sr.add(new Hit());

    iiifContentSearchServiceStub.setSearchResult(sr);
    viewerLayoutServiceStub.useMobileViewport();
    await fixture.whenStable();

    expect(cmp.showPageNavigator()).toBeFalsy();
  });
});

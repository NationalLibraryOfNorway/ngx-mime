import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Hit } from '../core/models/hit';
import { SearchResult } from '../core/models/search-result';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { testManifest } from '../test/testManifest';
import { ViewerLayoutServiceStub } from '../test/viewer-layout-service-stub';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ContentSearchDialogComponent } from './content-search-dialog.component';

describe('ContentSearchDialogComponent', () => {
  let component: ContentSearchDialogComponent;
  let fixture: ComponentFixture<ContentSearchDialogComponent>;
  let loader: HarnessLoader;

  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let viewerLayoutServiceStub: ViewerLayoutServiceStub;
  let dialogRef: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSearchDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        ContentSearchNavigationService,
        CanvasService,
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
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

    fixture = TestBed.createComponent(ContentSearchDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    viewerLayoutServiceStub = TestBed.inject<any>(ViewerLayoutService);
    dialogRef = TestBed.inject(MatDialogRef);
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should search the current manifest for the entered query on submit', async () => {
    iiifManifestServiceStub.setManifest(testManifest);
    const search = jest.spyOn(iiifContentSearchServiceStub, 'search');

    await submitSearch('dummysearch');

    expect(search).toHaveBeenCalledWith(testManifest, 'dummysearch');
  });

  it('should display desktop toolbar', async () => {
    await fixture.whenStable();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop'),
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', async () => {
    viewerLayoutServiceStub.useMobileViewport();
    await fixture.whenStable();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop'),
    );
    expect(heading).toBeNull();
  });

  it.each([
    {
      behavior: 'close the dialog on mobile',
      isMobile: true,
      shouldCloseDialog: true,
    },
    {
      behavior: 'keep the dialog open on desktop',
      isMobile: false,
      shouldCloseDialog: false,
    },
  ])(
    'should select a hit and $behavior',
    async ({ isMobile, shouldCloseDialog }) => {
      if (isMobile) {
        viewerLayoutServiceStub.useMobileViewport();
      }
      jest.spyOn(iiifContentSearchServiceStub, 'selected');
      jest.spyOn(dialogRef, 'close');
      iiifContentSearchServiceStub.setSearchResult(
        new SearchResult({
          q: 'dummysearch',
          hits: [
            new Hit({
              index: 0,
              match: 'querystring',
            }),
          ],
        }),
      );
      await fixture.whenStable();

      const hits = fixture.debugElement.queryAll(
        By.css('a[data-testid="hit"]'),
      );
      hits[0].triggerEventHandler('click', null);
      await fixture.whenStable();

      expect(iiifContentSearchServiceStub.selected).toHaveBeenCalled();
      if (shouldCloseDialog) {
        expect(dialogRef.close).toHaveBeenCalled();
      } else {
        expect(dialogRef.close).not.toHaveBeenCalled();
      }
    },
  );

  it('should remain in search input if content search return zero hits', async () => {
    const searchResultContainer = fixture.debugElement.query(
      By.css('.content-search-result-container'),
    );
    const spy = jest.spyOn(searchResultContainer.nativeElement, 'focus');
    iiifManifestServiceStub.setManifest(testManifest);
    await fixture.whenStable();

    await submitSearch('dummyvalue');
    iiifContentSearchServiceStub.setSearchResult(new SearchResult());
    await fixture.whenStable();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should set focus on search result if content search return hits', async () => {
    const searchResultContainer = fixture.debugElement.query(
      By.css('.content-search-result-container'),
    );
    const spy = jest.spyOn(searchResultContainer.nativeElement, 'focus');
    iiifManifestServiceStub.setManifest(testManifest);
    await fixture.whenStable();

    await submitSearch('dummyvalue');
    iiifContentSearchServiceStub.setSearchResult(
      new SearchResult({
        hits: [new Hit({ id: 1 }), new Hit({ id: 2 })],
      }),
    );
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
  });

  it('should only show clear button on input', async () => {
    const searchInput = await getSearchInput();

    expect(await getButtonCount()).toEqual(2);

    await searchInput.setValue('dummyvalue');

    expect(await getButtonCount()).toBe(3);
  });

  async function getSearchInput(): Promise<MatInputHarness> {
    return loader.getHarness(
      MatInputHarness.with({ selector: '.content-search-input' }),
    );
  }

  async function submitSearch(query: string): Promise<void> {
    const input = await getSearchInput();
    const submitButton = await loader.getHarness(
      MatButtonHarness.with({ buttonType: 'submit' }),
    );

    await input.setValue(query);
    await submitButton.click();
    await fixture.whenStable();
  }

  async function getButtonCount() {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    return buttons.length;
  }
});

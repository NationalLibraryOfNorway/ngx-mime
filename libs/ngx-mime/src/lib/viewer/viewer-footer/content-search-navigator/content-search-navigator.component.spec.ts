import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spy, provideAutoSpy } from 'jest-auto-spies';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl';
import { Hit } from '../../../core/models/hit';
import { SearchResult } from '../../../core/models/search-result';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../../../core/viewer-layout-service/viewer-layout-service';
import { SharedModule } from '../../../shared/shared.module';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { ContentSearchNavigatorComponent } from './content-search-navigator.component';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchServiceSpy: Spy<IiifContentSearchService>;
  let canvasServiceSpy: Spy<CanvasService>;
  let contentSearchNavigationServiceSpy: Spy<ContentSearchNavigationService>;
  let viewerLayoutServiceSpy: Spy<ViewerLayoutService>;
  let intl: MimeViewerIntl;
  let loader: HarnessLoader;
  let nextButton: MatButtonHarness;
  let previousButton: MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [ContentSearchNavigatorComponent],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(ContentSearchNavigationService, {
          observablePropsToSpyOn: ['currentHitCounter'],
        }),
        provideAutoSpy(CanvasService, {
          observablePropsToSpyOn: ['onCanvasGroupIndexChange'],
        }),
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(ViewerLayoutService, {
          gettersToSpyOn: ['layout'],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchServiceSpy = TestBed.inject(
      IiifContentSearchService,
    ) as Spy<IiifContentSearchService>;
    intl = TestBed.inject(MimeViewerIntl);
    contentSearchNavigationServiceSpy = TestBed.inject(
      ContentSearchNavigationService,
    ) as Spy<ContentSearchNavigationService>;
    canvasServiceSpy = TestBed.inject(CanvasService) as Spy<CanvasService>;
    viewerLayoutServiceSpy = TestBed.inject(
      ViewerLayoutService,
    ) as Spy<ViewerLayoutService>;

    component = fixture.componentInstance;
    component.searchResult = createDefaultData();
    iiifContentSearchServiceSpy.onChange.nextWith(component.searchResult);
    fixture.detectChanges();

    nextButton = await loader.getHarness(
      MatButtonHarness.with({
        selector: '[data-testid="footerNavigateNextHitButton"]',
      }),
    );

    previousButton = await loader.getHarness(
      MatButtonHarness.with({
        selector: '[data-testid="footerNavigatePreviousHitButton"]',
      }),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', () => {
    const text = fixture.debugElement.query(
      By.css('[data-testid="footerNavigateNextHitButton"]'),
    );
    expect(text.nativeElement.getAttribute('aria-label')).toContain(`Next Hit`);

    intl.nextHitLabel = 'New test string';
    intl.changes.next();
    fixture.detectChanges();
    expect(text.nativeElement.getAttribute('aria-label')).toContain(
      'New test string',
    );
  });

  it('should go to previous hit when user presses "previous" button', async () => {
    jest.spyOn(contentSearchNavigationServiceSpy, 'goToPreviousHit');

    await previousButton.click();

    expect(
      contentSearchNavigationServiceSpy.goToPreviousHit,
    ).toHaveBeenCalledTimes(1);
  });

  it('should go to next hit when user presses "next" button', async () => {
    jest.spyOn(contentSearchNavigationServiceSpy, 'goToNextHit');

    await nextButton.click();

    expect(contentSearchNavigationServiceSpy.goToNextHit).toHaveBeenCalledTimes(
      1,
    );
  });

  it('should disable the "previous" button when the first search result is selected', async () => {
    const firstSearchHitIndex = 0;
    contentSearchNavigationServiceSpy.currentHitCounter.nextWith(
      firstSearchHitIndex,
    );

    await checkButtonIsDisabled(previousButton);
  });

  it('should disable the "next" button when the last search result is selected', async () => {
    const lastSearchHitIndex = component.searchResult.size() - 1;
    contentSearchNavigationServiceSpy.currentHitCounter.nextWith(
      lastSearchHitIndex,
    );

    await checkButtonIsDisabled(nextButton);
  });

  function createDefaultData() {
    const searchResult = new SearchResult();
    searchResult.add(
      new Hit({
        id: 0,
        index: 0,
      }),
    );
    searchResult.add(
      new Hit({
        id: 1,
        index: 1,
      }),
    );
    return searchResult;
  }

  const checkButtonIsDisabled = async (button: MatButtonHarness) => {
    expect(await button.isDisabled()).toBeTruthy();
  };
});

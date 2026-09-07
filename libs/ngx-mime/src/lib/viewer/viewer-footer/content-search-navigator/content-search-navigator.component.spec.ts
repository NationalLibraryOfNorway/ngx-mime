import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl';
import { Hit } from '../../../core/models/hit';
import { SearchResult } from '../../../core/models/search-result';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../../../core/viewer-layout-service/viewer-layout-service';
import { ContentSearchNavigationServiceStub } from '../../../test/content-search-navigation-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { ContentSearchNavigatorComponent } from './content-search-navigator.component';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchServiceSpy: Spy<IiifContentSearchService>;
  let contentSearchNavigationService: ContentSearchNavigationServiceStub;
  let intl: MimeViewerIntl;
  let loader: HarnessLoader;
  let nextButton: MatButtonHarness;
  let previousButton: MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ContentSearchNavigatorComponent],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        {
          provide: ContentSearchNavigationService,
          useClass: ContentSearchNavigationServiceStub,
        },
        provideAutoSpy(CanvasService, {
          observablePropsToSpyOn: ['onCanvasGroupIndexChange'],
        }),
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(ViewerLayoutService, {
          gettersToSpyOn: ['layout'],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchServiceSpy = TestBed.inject(
      IiifContentSearchService,
    ) as Spy<IiifContentSearchService>;
    intl = TestBed.inject(MimeViewerIntl);
    contentSearchNavigationService = TestBed.inject(
      ContentSearchNavigationService,
    ) as unknown as ContentSearchNavigationServiceStub;

    component = fixture.componentInstance;
    const searchResult = createDefaultData();
    fixture.componentRef.setInput('searchResult', searchResult);
    iiifContentSearchServiceSpy.onChange.nextWith(searchResult);
    await fixture.whenStable();

    nextButton = await getButtonHarness('footerNavigateNextHitButton');
    previousButton = await getButtonHarness('footerNavigatePreviousHitButton');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', async () => {
    const text = fixture.debugElement.query(
      By.css('[data-testid="footerNavigateNextHitButton"]'),
    );
    expect(text.nativeElement.getAttribute('aria-label')).toContain(`Next Hit`);

    intl.nextHitLabel = 'New test string';
    intl.notifyChanges();
    await fixture.whenStable();

    expect(text.nativeElement.getAttribute('aria-label')).toContain(
      'New test string',
    );
  });

  it('should go to previous hit when user presses "previous" button', async () => {
    const goToPreviousHit = jest.spyOn(
      contentSearchNavigationService,
      'goToPreviousHit',
    );
    contentSearchNavigationService.setCurrentHitCounter(1);
    await fixture.whenStable();

    await previousButton.click();

    expect(goToPreviousHit).toHaveBeenCalledTimes(1);
  });

  it('should go to next hit when user presses "next" button', async () => {
    const goToNextHit = jest.spyOn(
      contentSearchNavigationService,
      'goToNextHit',
    );

    await nextButton.click();

    expect(goToNextHit).toHaveBeenCalledTimes(1);
  });

  it('should disable the "previous" button when the first search result is selected', async () => {
    const firstSearchHitIndex = 0;
    contentSearchNavigationService.setCurrentHitCounter(firstSearchHitIndex);

    await checkButtonIsDisabled(previousButton);
  });

  it('should disable the "next" button when the last search result is selected', async () => {
    const lastSearchHitIndex = component.searchResult().size() - 1;
    contentSearchNavigationService.setCurrentHitCounter(lastSearchHitIndex);

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

  const getButtonHarness = async (
    testId: string,
  ): Promise<MatButtonHarness> => {
    return loader.getHarness(
      MatButtonHarness.with({
        selector: `[data-testid="${testId}"]`,
      }),
    );
  };
});

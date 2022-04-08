import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../testing/injected-stub';
import { Hit } from '../core/models/hit';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { SearchResult } from '../core/models/search-result';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { SharedModule } from '../shared/shared.module';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { testManifest } from '../test/testManifest';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ViewDialogComponent } from './view-dialog.component';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;
  let loader: HarnessLoader;

  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let mediaObserver: any;
  let dialogRef: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
        declarations: [ViewDialogComponent],
        providers: [
          MimeViewerIntl,
          MimeResizeService,
          MimeDomHelper,
          FullscreenService,
          { provide: MatDialogRef, useClass: MatDialogRefStub },
          { provide: ViewerService, useClass: ViewerServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
          {
            provide: IiifContentSearchService,
            useClass: IiifContentSearchServiceStub,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    mediaObserver = TestBed.inject(MediaObserver);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).toBeNull();
  });

  it('should go to hit and close dialog when selected on mobile', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);
    spyOn(iiifContentSearchServiceStub, 'selected').and.callThrough();
    spyOn(dialogRef, 'close').and.callThrough();
    component.currentSearch = 'dummysearch';
    component.hits = [
      new Hit({
        index: 0,
        match: 'querystring',
      }),
    ];
    component.numberOfHits = 1;
    fixture.detectChanges();

    const hits = fixture.debugElement.queryAll(By.css('.hit'));
    hits[0].triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(iiifContentSearchServiceStub.selected).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should go to hit and when selected on desktop', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(false);
    spyOn(iiifContentSearchServiceStub, 'selected').and.callThrough();
    spyOn(dialogRef, 'close').and.callThrough();
    component.currentSearch = 'dummysearch';
    component.hits = [
      new Hit({
        index: 0,
        match: 'querystring',
      }),
    ];
    component.numberOfHits = 1;
    fixture.detectChanges();

    const hits = fixture.debugElement.queryAll(By.css('.hit'));
    hits[0].triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(iiifContentSearchServiceStub.selected).toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should remain in search input if content search return zero hits', () => {
    const searchInput = fixture.debugElement.query(
      By.css('.content-search-input')
    );
    const searchResultContainer = fixture.debugElement.query(
      By.css('.content-search-result-container')
    );
    const spy = spyOn(searchResultContainer.nativeElement, 'focus');
    iiifManifestServiceStub._currentManifest.next(testManifest);

    fixture.detectChanges();

    searchInput.nativeElement.setAttribute('value', 'dummyvalue');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    searchInput.nativeElement.dispatchEvent(event);

    iiifContentSearchServiceStub._currentSearchResult.next(new SearchResult());

    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should set focus on search result if content search return hits', () => {
    const searchInput = fixture.debugElement.query(
      By.css('.content-search-input')
    );
    const searchResultContainer = fixture.debugElement.query(
      By.css('.content-search-result-container')
    );
    const spy = spyOn(searchResultContainer.nativeElement, 'focus');
    iiifManifestServiceStub._currentManifest.next(testManifest);

    fixture.detectChanges();

    searchInput.nativeElement.setAttribute('value', 'dummyvalue');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    searchInput.nativeElement.dispatchEvent(event);

    iiifContentSearchServiceStub._currentSearchResult.next(
      new SearchResult({
        hits: [new Hit(), new Hit()],
      })
    );

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should only show clear button on input', async () => {
    const searchInput: DebugElement = fixture.debugElement.query(
      By.css('.content-search-input')
    );

    expect(await getButtonCount()).toEqual(2);

    searchInput.nativeElement.value = 'dummyvalue';
    searchInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(await getButtonCount()).toBe(3);
  });

  async function getButtonCount() {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    return buttons.length;
  }
});

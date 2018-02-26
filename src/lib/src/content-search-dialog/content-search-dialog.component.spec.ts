import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { ObservableMedia, MatchMedia } from '@angular/flex-layout';

import { SharedModule } from './../shared/shared.module';
import { MimeMaterialModule } from './../shared/mime-material.module';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { MimeViewerIntl } from './../core/intl/viewer-intl';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { FullscreenService } from './../core/fullscreen-service/fullscreen.service';
import { ViewerService } from './../core/viewer-service/viewer.service';
import { MediaServiceStub } from './../test/media-service-stub';
import { SearchResult } from './../core/models/search-result';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';
import { testManifest } from './../test/testManifest';
import { ViewerServiceMock } from './../test/viewer-service-mock';
import { MatDialogRefStub } from './../test/mat-dialog-ref-stub';
import { Hit } from '../core/models/hit';

describe('ContentSearchDialogComponent', () => {
  let component: ContentSearchDialogComponent;
  let fixture: ComponentFixture<ContentSearchDialogComponent>;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
        declarations: [ContentSearchDialogComponent],
        providers: [
          MimeViewerIntl,
          MimeResizeService,
          MimeDomHelper,
          FullscreenService,
          { provide: MatDialogRef, useClass: MatDialogRefStub },
          { provide: ObservableMedia, useClass: MediaServiceStub },
          { provide: ViewerService, useClass: ViewerServiceMock },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
          { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(ContentSearchDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      iiifContentSearchServiceStub = TestBed.get(IiifContentSearchService);
      iiifManifestServiceStub = TestBed.get(IiifManifestService);
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display desktop toolbar',
    inject([ObservableMedia], (media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(false);

      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
      expect(heading).not.toBeNull();
    })
  );

  it(
    'should display mobile toolbar',
    inject([ObservableMedia], (media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(true);

      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
      expect(heading).toBeNull();
    })
  );

  it(
    'should go to hit and close dialog when selected on mobile',
    inject(
      [ObservableMedia, ViewerService, MatDialogRef],
      (media: ObservableMedia, viewerService: ViewerService, dialogRef: MatDialogRef<ContentSearchDialogComponent>) => {
        spyOn(media, 'isActive').and.returnValue(true);
        spyOn(iiifContentSearchServiceStub, 'selected').and.callThrough();
        spyOn(dialogRef, 'close').and.callThrough();
        component.currentSearch = 'dummysearch';
        component.hits = [
          new Hit({
            index: 0,
            match: 'querystring'
          })
        ];
        component.numberOfHits = 1;
        fixture.detectChanges();

        const hits = fixture.debugElement.queryAll(By.css('.hit'));
        hits[0].triggerEventHandler('click', null);

        fixture.detectChanges();
        expect(iiifContentSearchServiceStub.selected).toHaveBeenCalled();
        expect(dialogRef.close).toHaveBeenCalled();
      }
    )
  );

  it(
    'should go to hit and when selected on desktop',
    inject(
      [ObservableMedia, ViewerService, MatDialogRef],
      (media: ObservableMedia, viewerService: ViewerService, dialogRef: MatDialogRef<ContentSearchDialogComponent>) => {
        spyOn(media, 'isActive').and.returnValue(false);
        spyOn(iiifContentSearchServiceStub, 'selected').and.callThrough();
        spyOn(dialogRef, 'close').and.callThrough();
        component.currentSearch = 'dummysearch';
        component.hits = [
          new Hit({
            index: 0,
            match: 'querystring'
          })
        ];
        component.numberOfHits = 1;
        fixture.detectChanges();

        const hits = fixture.debugElement.queryAll(By.css('.hit'));
        hits[0].triggerEventHandler('click', null);

        fixture.detectChanges();
        expect(iiifContentSearchServiceStub.selected).toHaveBeenCalled();
        expect(dialogRef.close).not.toHaveBeenCalled();
      }
    )
  );

  it('should remain in search input if content search return zero hits', () => {
    const searchInput = fixture.debugElement.query(By.css('.content-search-input'));
    const searchResultContainer = fixture.debugElement.query(By.css('.content-search-result-container'));
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
    const searchInput = fixture.debugElement.query(By.css('.content-search-input'));
    const searchResultContainer = fixture.debugElement.query(By.css('.content-search-result-container'));
    const spy = spyOn(searchResultContainer.nativeElement, 'focus');
    iiifManifestServiceStub._currentManifest.next(testManifest);

    fixture.detectChanges();

    searchInput.nativeElement.setAttribute('value', 'dummyvalue');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    searchInput.nativeElement.dispatchEvent(event);

    iiifContentSearchServiceStub._currentSearchResult.next(
      new SearchResult({
        hits: [new Hit(), new Hit()]
      })
    );

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});

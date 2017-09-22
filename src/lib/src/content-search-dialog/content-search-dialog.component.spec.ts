import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MdDialogRef } from '@angular/material';
import { ObservableMedia, MatchMedia } from '@angular/flex-layout';

import { SharedModule } from './../shared/shared.module';
import { MimeMaterialModule } from './../shared/mime-material.module';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { MimeViewerIntl } from './../core/viewer-intl';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ViewerService } from './../core/viewer-service/viewer.service';
import { Hit } from './../core/models/search-result';

describe('ContentSearchDialogComponent', () => {
  let component: ContentSearchDialogComponent;
  let fixture: ComponentFixture<ContentSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [
        ContentSearchDialogComponent
      ],
      providers: [
        MimeViewerIntl,
        IiifManifestService,
        IiifContentSearchService,
        MimeResizeService,
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: ObservableMedia, useClass: MediaMock },
        { provide: ViewerService, useClass: ViewerServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar',
    inject([ObservableMedia], (media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(false);

      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
      expect(heading).not.toBeNull();
    }));

  it('should display mobile toolbar',
    inject([ObservableMedia], (media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(true);

      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
      expect(heading).toBeNull();
    }));

  it('should go to hit and close dialog when selected on mobile',
    inject([ObservableMedia, ViewerService, MdDialogRef],
      (media: ObservableMedia, viewerService: ViewerService, dialogRef: MdDialogRef<ContentSearchDialogComponent>) => {
      spyOn(media, 'isActive').and.returnValue(true);
      spyOn(viewerService, 'goToPage').and.callThrough();
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
      expect(viewerService.goToPage).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalled();
    }));

    it('should go to hit and when selected on desktop',
    inject([ObservableMedia, ViewerService, MdDialogRef],
      (media: ObservableMedia, viewerService: ViewerService, dialogRef: MdDialogRef<ContentSearchDialogComponent>) => {
      spyOn(media, 'isActive').and.returnValue(false);
      spyOn(viewerService, 'goToPage').and.callThrough();
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
      expect(viewerService.goToPage).toHaveBeenCalled();
      expect(dialogRef.close).not.toHaveBeenCalled();
    }));

});

class MdDialogRefMock {
  close(): void {}
}

class MediaMock {
  isActive(m: string) {
    return false;
  }
}

class ViewerServiceMock {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  public goToPreviousPage(): void { }

  public goToNextPage(): void { }

  public goToPage(index: number): void { }

}

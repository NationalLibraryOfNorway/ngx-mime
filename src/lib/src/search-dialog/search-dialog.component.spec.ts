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
import { SearchDialogComponent } from './search-dialog.component';
import { MimeViewerIntl } from './../core/viewer-intl';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ViewerService } from './../core/viewer-service/viewer.service';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [
        SearchDialogComponent
      ],
      providers: [
        MimeViewerIntl,
        IiifManifestService,
        IiifContentSearchService,
        MimeResizeService,
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: ObservableMedia, useClass: MediaMock },
        { provide: ViewerService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchDialogComponent);
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

  it('should go to hit when selected',
    inject([ViewerService], (viewerService: ViewerService) => {
      spyOn(media, 'isActive').and.returnValue(true);

      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
      expect(heading).toBeNull();
    }));

});

class MdDialogRefMock {
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

}

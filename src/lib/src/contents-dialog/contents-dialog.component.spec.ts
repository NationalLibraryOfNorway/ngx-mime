import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { TOCComponent } from './tableOfContents/tableOfContents.component';

describe('ContentsDialogComponent', () => {
  let component: ContentsDialogComponent;
  let fixture: ComponentFixture<ContentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [
        ContentsDialogComponent,
        MetadataComponent,
        TOCComponent
      ],
      providers: [
        MimeViewerIntl,
        IiifManifestService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: ObservableMedia, useClass: MediaMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentsDialogComponent);
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

});

class MdDialogRefMock {
}

class MediaMock {
  isActive(m: string) {
    return false;
  }
}

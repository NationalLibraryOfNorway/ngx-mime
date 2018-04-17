import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { MediaServiceStub } from './../test/media-service-stub';
import { TocComponent } from './table-of-contents/table-of-contents.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { ClickService } from '../core/click-service/click.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { Manifest, Structure } from '../core/models/manifest';
import { testManifest } from './../test/testManifest';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';

describe('ContentsDialogComponent', () => {
  let component: ContentsDialogComponent;
  let fixture: ComponentFixture<ContentsDialogComponent>;
  let media: ObservableMedia;
  let iiifManifestService: IiifManifestServiceStub;
  let intl: MimeViewerIntl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
      declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
      providers: [
        ViewerService,
        ClickService,
        MimeViewerIntl,
        CanvasService,
        ModeService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        ViewerLayoutService,
        IiifContentSearchService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ObservableMedia, useClass: MediaServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentsDialogComponent);
    component = fixture.componentInstance;
    media = TestBed.get(ObservableMedia);
    iiifManifestService = TestBed.get(IiifManifestService);
    intl = TestBed.get(MimeViewerIntl);
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    spyOn(media, 'isActive').and.returnValue(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    spyOn(media, 'isActive').and.returnValue(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(By.css('.heading-desktop'));
    expect(heading).toBeNull();
  });

  it('should show toc', () => {
    const manifest = new Manifest({
      structures: [new Structure()]
    });
    iiifManifestService._currentManifest.next(manifest);
    intl.tocLabel = 'TocTestLabel';

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList = fixture.nativeElement.querySelectorAll('.mat-tab-label');
      const tocTab = Array.from(tabs).find(t => t.textContent === intl.tocLabel);
      expect(tocTab).toBeDefined();
    });
  });

  it('should hide toc', () => {
    const manifest = new Manifest();
    iiifManifestService._currentManifest.next(manifest);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList = fixture.nativeElement.querySelectorAll('.mat-tab-label');
      const tocTab = Array.from(tabs).find(t => t.textContent === intl.tocLabel);
      expect(tocTab).toBeUndefined();
    });
  });
});

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { SharedModule } from '../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { Manifest } from '../core/models/manifest';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;
  let iiifManifestService: IiifManifestServiceStub;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
        declarations: [AttributionDialogComponent],
        providers: [
          MimeViewerIntl,
          AttributionDialogResizeService,
          MimeDomHelper,
          FullscreenService,
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
          { provide: MatDialogRef, useClass: MatDialogRefStub }
        ]
      });
      TestBed.compileComponents();
    })
  );

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(AttributionDialogComponent);
      component = fixture.componentInstance;
      iiifManifestService = TestBed.get(IiifManifestService);
      fixture.detectChanges();
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display attribution', () => {
    iiifManifestService._currentManifest.next(
      new Manifest({
        attribution: 'This is a test attribution'
      })
    );

    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.contents'));
    expect(attribution.nativeElement.innerText).toBe('This is a test attribution');
  });
});

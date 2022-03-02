import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../testing/injected-stub';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Manifest } from '../core/models/manifest';
import { SharedModule } from '../shared/shared.module';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { AttributionDialogComponent } from './attribution-dialog.component';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;
  let iiifManifestService: IiifManifestServiceStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
      declarations: [AttributionDialogComponent],
      providers: [
        MimeViewerIntl,
        AttributionDialogResizeService,
        MimeDomHelper,
        FullscreenService,
        {
          provide: AccessKeysService,
          useClass: jasmine.createSpy('accessKeysService')
        },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AttributionDialogComponent);
    component = fixture.componentInstance;
    iiifManifestService = injectedStub(IiifManifestService);
    fixture.detectChanges();
  }));

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

    const attribution: DebugElement = fixture.debugElement.query(
      By.css('.mat-dialog-content')
    );
    expect(attribution.nativeElement.innerText).toBe(
      'This is a test attribution'
    );
  });
});

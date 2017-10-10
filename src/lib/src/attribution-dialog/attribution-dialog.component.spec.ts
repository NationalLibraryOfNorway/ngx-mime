import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { Manifest } from '../core/models/manifest';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [AttributionDialogComponent],
      providers: [
        MimeViewerIntl,
        AttributionDialogResizeService,
        MimeDomHelper,
        FullscreenService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttributionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display attribution', () => {
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.contents'));
    expect(attribution.nativeElement.innerText).toBe('This is a test attribution');
  });

});

class IiifManifestServiceStub {

  get currentManifest(): Observable<Manifest> {
    return Observable.of(new Manifest({
      attribution: 'This is a test attribution'
    }));
  }

  load(manifestUri: string): void {
  }
}

class MatDialogRefMock {
}

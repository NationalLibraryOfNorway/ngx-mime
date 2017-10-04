import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../../shared/shared.module';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest, Metadata } from '../../core/models/manifest';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { TOCComponent } from './tableOfContents.component';

describe('TOCComponent', () => {
  let component: TOCComponent;
  let fixture: ComponentFixture<TOCComponent>;
  let iiifManifestServiceStub: IiifManifestServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule
      ],
      declarations: [
        TOCComponent
      ],
      providers: [
        MimeViewerIntl,
        {provide: IiifManifestService, useClass: IiifManifestServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});

class IiifManifestServiceStub {

  get currentManifest(): Observable<Manifest> {
    return Observable.of(new Manifest({
      metadata: [
        new Metadata('label1', 'value1'),
        new Metadata('label2', 'value2')
      ],
      attribution: 'This is a test attribution',
      license: 'https://wiki.creativecommons.org/wiki/CC0'
    }));
  }

  load(manifestUri: string): void {
  }
}

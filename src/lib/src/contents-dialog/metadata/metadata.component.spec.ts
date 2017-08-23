import { MimeViewerIntl } from './../../core/viewer-intl';
import { DebugElement } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from './../../shared/shared.module';
import { MetadataComponent } from './metadata.component';
import { Manifest, Metadata } from './../../core/models/manifest';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;
  let iiifManifestServiceStub: IiifManifestServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule
      ],
      declarations: [
        MetadataComponent
      ],
      providers: [
        MimeViewerIntl,
        {provide: IiifManifestService, useClass: IiifManifestServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display metadata', () => {
    fixture.detectChanges();

    const metadatas: DebugElement[] = fixture.debugElement.queryAll(By.css('.metadata'));
    expect(metadatas.length).toEqual(2);
  });

  it('should display attribution', () => {
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.attribution'));
    expect(attribution.nativeElement.innerText).toBe('This is a test attribution');
  });

  it('should display license', () => {
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.license'));
    expect(attribution.nativeElement.innerText).toBe('https://wiki.creativecommons.org/wiki/CC0');
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

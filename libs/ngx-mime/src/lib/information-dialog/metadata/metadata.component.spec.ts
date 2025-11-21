import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { Manifest, Metadata } from '../../core/models/manifest';
import { MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;
  let iiifManifestServiceSpy: Spy<IiifManifestService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MetadataComponent],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(IiifManifestService, {
          observablePropsToSpyOn: ['currentManifest'],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    iiifManifestServiceSpy = TestBed.inject(
      IiifManifestService,
    ) as Spy<IiifManifestService>;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display metadata', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        metadata: [
          new Metadata('label1', 'value1'),
          new Metadata('label2', 'value2'),
        ],
      }),
    );
    fixture.detectChanges();

    const metadatas: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.metadata'),
    );
    expect(metadatas.length).toEqual(2);
  });

  it('should display attribution', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        attribution: 'This is a test attribution',
      }),
    );
    fixture.detectChanges();

    const attribution: HTMLElement =
      fixture.nativeElement.querySelector('.attribution');
    expect(attribution.textContent).toBe('This is a test attribution');
  });

  it('should display license', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        license: 'https://wiki.creativecommons.org/wiki/CC0',
      }),
    );
    fixture.detectChanges();

    const attribution: HTMLElement =
      fixture.nativeElement.querySelector('.license');
    expect(attribution.textContent).toBe(
      'https://wiki.creativecommons.org/wiki/CC0',
    );
  });

  it('should display logo', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        logo: 'http://example.com/dummylogo.jpg',
      }),
    );
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(
      By.css('.logo'),
    );
    expect(attribution.nativeElement.getAttribute('src')).toBe(
      'http://example.com/dummylogo.jpg',
    );
  });
});

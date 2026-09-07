import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { Manifest, Metadata } from '../../core/models/manifest';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { MetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;
  let iiifManifestService: IiifManifestServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MetadataComponent],
      providers: [
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    iiifManifestService = TestBed.inject<any>(IiifManifestService);
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display metadata', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        metadata: [
          new Metadata('label1', 'value1'),
          new Metadata('label2', 'value2'),
        ],
      }),
    );
    await fixture.whenStable();

    const metadatas: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.metadata'),
    );
    expect(metadatas.length).toEqual(2);
  });

  it('should display attribution', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        attribution: 'This is a test attribution',
      }),
    );
    await fixture.whenStable();

    const attribution: HTMLElement =
      fixture.nativeElement.querySelector('.attribution');
    expect(attribution.textContent).toBe('This is a test attribution');
  });

  it('should display license', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        license: 'https://wiki.creativecommons.org/wiki/CC0',
      }),
    );
    await fixture.whenStable();

    const attribution: HTMLElement =
      fixture.nativeElement.querySelector('.license');
    expect(attribution.textContent).toBe(
      'https://wiki.creativecommons.org/wiki/CC0',
    );
  });

  it('should display logo', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        logo: 'http://example.com/dummylogo.jpg',
      }),
    );
    await fixture.whenStable();

    const attribution: DebugElement = fixture.debugElement.query(
      By.css('.logo'),
    );
    expect(attribution.nativeElement.getAttribute('src')).toBe(
      'http://example.com/dummylogo.jpg',
    );
  });
});

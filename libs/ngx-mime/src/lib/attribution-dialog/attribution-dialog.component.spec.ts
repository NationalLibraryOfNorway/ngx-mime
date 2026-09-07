import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { Manifest } from '../core/models/manifest';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { AttributionDialogComponent } from './attribution-dialog.component';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;
  let iiifManifestService: IiifManifestServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributionDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(AccessKeysService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributionDialogComponent);
    component = fixture.componentInstance;
    iiifManifestService = TestBed.inject<any>(IiifManifestService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display attribution', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        attribution: 'This is a test attribution',
      }),
    );
    await fixture.whenStable();

    const attributionEl: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('p');
    expect(attributionEl?.textContent).toEqual('This is a test attribution');
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { AttributionDialogComponent } from './attribution-dialog.component';

describe('AttributionDialogComponent', () => {
  let component: AttributionDialogComponent;
  let fixture: ComponentFixture<AttributionDialogComponent>;
  let iiifManifestServiceSpy: Spy<IiifManifestService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        AttributionDialogComponent,
      ],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(IiifManifestService, {
          observablePropsToSpyOn: ['currentManifest'],
        }),
        provideAutoSpy(AttributionDialogResizeService),
        provideAutoSpy(StyleService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(AccessKeysService),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionDialogComponent);
    component = fixture.componentInstance;
    iiifManifestServiceSpy = TestBed.inject(
      IiifManifestService,
    ) as Spy<IiifManifestService>;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display attribution', () => {
    iiifManifestServiceSpy.currentManifest.nextWith(
      new Manifest({
        attribution: 'This is a test attribution',
      }),
    );

    fixture.detectChanges();

    const attributionEl: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('p');
    expect(attributionEl?.textContent).toEqual('This is a test attribution');
  });
});

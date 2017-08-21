import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia } from '@angular/flex-layout';

import { SharedModule } from './../../shared/shared.module';
import { ContentsDialogModule } from './../../contents-dialog/contents-dialog.module';
import { ViewerHeaderComponent } from './viewer-header.component';
import { MimeViewerIntl } from './../viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ViewerHeaderTestModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed',
    inject([MimeViewerIntl], (intl: MimeViewerIntl) => {
      const button = fixture.debugElement.query(By.css('#metadataButton'));

      intl.metadataLabel = 'Metadata of the publication';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe('Metadata of the publication');
    }));

  it('should open contents dialog', () => {
    component.openContents();
  });

});

@NgModule({
  imports: [
    NoopAnimationsModule,
    SharedModule,
    ContentsDialogModule,
    HttpClientModule
  ],
  declarations: [
    ViewerHeaderComponent,
  ],
  exports: [ViewerHeaderComponent],
  providers: [
    MimeViewerIntl,
    IiifManifestService
  ]
})
class ViewerHeaderTestModule { }

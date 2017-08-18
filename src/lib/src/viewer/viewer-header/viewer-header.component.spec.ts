import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, ObservableMedia } from '@angular/flex-layout';

import { ViewerHeaderComponent } from './viewer-header.component';
import { ContentsComponent } from './../contents/contents.component';
import { MetadataComponent } from './../contents/metadata/metadata.component';
import { MimeViewerIntl } from './../viewer-intl';
import { MimeMaterialModule } from './../../mime-material.module';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let spy: any;

  class MockMedia {
    isActive(): boolean {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ViewerHeaderTestModule
      ],
      providers: [
        MimeViewerIntl,
        { provide: ObservableMedia, useClass: MockMedia }
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

    expect(component.isContentsDialogOpen).toBeTruthy();
    ;

});

@NgModule({
  imports: [
    NoopAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MimeMaterialModule,
  ],
  declarations: [
    ViewerHeaderComponent,
    ContentsComponent,
    MetadataComponent
  ],
  exports: [ViewerHeaderComponent],
  entryComponents: [ContentsComponent],
})
class ViewerHeaderTestModule { }


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
import { MimeViewerIntl } from './../../core/viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';

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
      const button = fixture.debugElement.query(By.css('#contentsDialogButton'));

      intl.contents = 'Metadata of the publication';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe('Metadata of the publication');
    }));

  it('should open contents dialog', () => {
    component.openContents();
  });

  it("should start in visible mode", async(() => {
    let toolbar = fixture.debugElement.query(By.css("md-toolbar"));
    expect(component.state).toBe('show');
    expectHeaderToShow(toolbar.nativeElement);
  }));

  it("should not be visible when state is changed to 'hide'", async(() => {
    let toolbar = fixture.debugElement.query(By.css("md-toolbar"));
    // Check initial style to make sure we later see an actual change
    expectHeaderToShow(toolbar.nativeElement);

    component.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectHeaderToBeHidden(toolbar.nativeElement);
    });
  }));

  it("should be visible when state is changed to 'show'", async(() => {
    let toolbar = fixture.debugElement.query(By.css("md-toolbar"));

    component.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectHeaderToBeHidden(toolbar.nativeElement);

      component.state = 'show';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectHeaderToShow(toolbar.nativeElement);
      });

    });

  }));

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
    IiifManifestService,
    MimeResizeService
  ]
})
class ViewerHeaderTestModule { }

function expectHeaderToShow(toolbarElement: any) {
  expect(toolbarElement.style.display).toBe('block');
  expect(toolbarElement.style.opacity).toBe('1');
  expect(toolbarElement.style.transform).toBe('translate(0px, 0px)');
}

function expectHeaderToBeHidden(toolbarElement: any) {
  expect(toolbarElement.style.display).toBe('none');
  expect(toolbarElement.style.opacity).toBe('0');
  expect(toolbarElement.style.transform).toBe('translate(0px, -100%)');
}
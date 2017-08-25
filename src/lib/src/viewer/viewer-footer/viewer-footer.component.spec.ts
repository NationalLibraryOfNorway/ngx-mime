import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia } from '@angular/flex-layout';

import { SharedModule } from './../../shared/shared.module';
import { ContentsDialogModule } from './../../contents-dialog/contents-dialog.module';
import { ViewerFooterComponent } from './viewer-footer.component';
import { MimeViewerIntl } from './../../core/viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { ResizeService } from './../../core/resize-service/resize.service';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let fixture: ComponentFixture<ViewerFooterComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ContentsDialogModule,
        HttpClientModule
      ],
      declarations: [
        ViewerFooterComponent,
      ],
      providers: [
        MimeViewerIntl,
        IiifManifestService,
        ResizeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    console.log(cmp);
    expect(cmp).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', (async) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        console.log(cmp);
        /*
        expect(cmp.startEvent.triggerName).toEqual('myAnimation');
        expect(cmp.startEvent.phaseName).toEqual('start');
        expect(cmp.startEvent.toState).toEqual('void');
        expect(cmp.doneEvent.triggerName).toEqual('myAnimation');
        expect(cmp.doneEvent.phaseName).toEqual('done');
        expect(cmp.doneEvent.toState).toEqual('void');*/
        async();
      });
    });

  });

  it('should open contents dialog', () => {
    component.openContents();
  });

});

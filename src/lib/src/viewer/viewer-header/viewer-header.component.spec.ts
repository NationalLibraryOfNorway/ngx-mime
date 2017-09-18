import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from './../../shared/shared.module';
import { SearchDialogModule } from './../../search-dialog/search-dialog.module';
import { ContentsDialogModule } from './../../contents-dialog/contents-dialog.module';
import { ViewerHeaderComponent } from './viewer-header.component';
import { MimeViewerIntl } from './../../core/viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestServiceStub } from './../../test/iiif-manifest-service-stub';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ViewerHeaderTestModule,
        SearchDialogModule
      ],
      providers: [
        { provide: FullscreenService, useClass: FullscreenServiceMock },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub }
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
    component.toggleContents();
  });

  it('should start in visible mode', async(() => {
    expect(component.state).toBe('show');
    expectHeaderToShow(fixture.debugElement.nativeElement);
  }));

  it('should not be visible when state is changed to hide', async(() => {
    let toolbar = fixture.debugElement.query(By.css('md-toolbar'));
    // Check initial style to make sure we later see an actual change
    expectHeaderToShow(fixture.debugElement.nativeElement);

    component.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectHeaderToBeHidden(fixture.debugElement.nativeElement);
    });
  }));

  it('should be visible when state is changed to show', async(() => {
    let toolbar = fixture.debugElement.query(By.css('md-toolbar'));

    component.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectHeaderToBeHidden(fixture.debugElement.nativeElement);

      component.state = 'show';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectHeaderToShow(fixture.debugElement.nativeElement);
      });

    });

  }));

  it('should show fullscreen button if fullscreen mode is supported',
    inject([FullscreenService], (fullscreenService: FullscreenService) => {
      spyOn(fullscreenService, 'isEnabled').and.returnValue(true);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#fullscreenButton'));
      expect(button).not.toBeNull();
    }));

  it('should hide fullscreen button if fullscreen mode is unsupported',
    inject([FullscreenService], (fullscreenService: FullscreenService) => {
      spyOn(fullscreenService, 'isEnabled').and.returnValue(false);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#fullscreenButton'));
      expect(button).not.toBeNull();
    }));

  it('should show search button if manifest has a search service',
    inject([IiifManifestService], (iiifManifestService: IiifManifestServiceStub) => {
      iiifManifestService._currentManifest.next({
        service: {}
      });

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#contentSearchDialogButton'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Search');
    }));

  it('should hide search button if manifest does not have a search service',
    inject([IiifManifestService], (iiifManifestService: IiifManifestServiceStub) => {
      iiifManifestService._currentManifest.next({});

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#contentSearchDialogButton'));
      expect(button).toBeNull();
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

function expectHeaderToShow(element: any) {
  expect(element.style.display).toBe('block');
  expect(element.style.opacity).toBe('1');
  expect(element.style.transform).toBe('translate(0px, 0px)');
}

function expectHeaderToBeHidden(element: any) {
  expect(element.style.display).toBe('none');
  expect(element.style.opacity).toBe('0');
  expect(element.style.transform).toBe('translate(0px, -100%)');
}
class FullscreenServiceMock {

  public isEnabled(): boolean {
    return true;
  }

  get onChange(): Observable<boolean> {
    return Observable.of(true);
  }

  public isFullscreen(): boolean {
    return false;
  }
}

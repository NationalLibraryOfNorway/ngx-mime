import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../../shared/shared.module';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest, Structure } from '../../core/models/manifest';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { TOCComponent } from './tableOfContents.component';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ClickService } from '../../core/click-service/click.service';
import { PageService } from '../../core/page-service/page-service';
import { ModeService } from '../../core/mode-service/mode.service';
import { MdDialogRef } from '@angular/material';
import { ContentsDialogComponent } from '../contents-dialog.component';
import { ObservableMedia } from '@angular/flex-layout';

describe('TOCComponent', () => {
  let component: TOCComponent;
  let fixture: ComponentFixture<TOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule
      ],
      declarations: [
        TOCComponent
      ],
      providers: [
        ViewerService,
        ClickService,
        PageService,
        ModeService,
        MimeViewerIntl,
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: ObservableMedia, useClass: MediaMock },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display table of contents', () => {
    fixture.detectChanges();

    const structures: DebugElement[] = fixture.debugElement.queryAll(By.css('.toc-link'));
    expect(structures.length).toEqual(3);
  });

  it('should display the correct label', () => {
    const labels: DebugElement[] = fixture.debugElement.queryAll(By.css('.label'));
    expect(labels[0].nativeElement.innerText).toEqual('Forside');
    expect(labels[1].nativeElement.innerText).toEqual('Tittelside');
    expect(labels[2].nativeElement.innerText).toEqual('Bakside');
  });

  it('should display the correct page number', () => {
    const pageNumbers: DebugElement[] = fixture.debugElement.queryAll(By.css('.canvasIndex'));
    expect(pageNumbers[0].nativeElement.innerText).toEqual('1');
    expect(pageNumbers[1].nativeElement.innerText).toEqual('2');
    expect(pageNumbers[2].nativeElement.innerText).toEqual('5');
  });

  it('should go to page when selecting a page in TOC',
    inject([ViewerService], (viewerService: ViewerService) => {
      let spy = spyOn(viewerService, 'goToPage').and.callThrough();

      const divs: DebugElement[] = fixture.debugElement.queryAll(By.css('.toc-link'));
      divs[2].triggerEventHandler('click', null);

      expect(viewerService.goToPage).toHaveBeenCalledWith(4, false);
  }));

  it('should close contents dialog when selecting a page in TOC when on mobile',
    inject([MdDialogRef, ObservableMedia], (dialogRef: MdDialogRef<ContentsDialogComponent>, media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(true);
      spyOn(dialogRef, 'close').and.callThrough();

      const divs: DebugElement[] = fixture.debugElement.queryAll(By.css('.toc-link'));
      divs[2].triggerEventHandler('click', null);

      expect(dialogRef.close).toHaveBeenCalled();
    }));

});

class IiifManifestServiceStub {
  get currentManifest(): Observable<Manifest> {
    return Observable.of(new Manifest({
      sequences: [{
        canvases: [
          {id: 'canvas1'},
          {id: 'canvas2'},
          {id: 'canvas3'},
          {id: 'canvas4'},
          {id: 'canvas5'}
        ]
      }],
      structures: [
        new Structure({label: 'Forside', canvases: ['canvas1'], canvasIndex: 0}),
        new Structure({label: 'Tittelside', canvases: ['canvas2'], canvasIndex: 1}),
        new Structure({label: 'Bakside', canvases: ['canvas5'], canvasIndex: 4})
      ]
    }));
  }
}

class MdDialogRefMock {
  close(): void {}
}

class MediaMock {
  isActive(m: string) {
    return false;
  }
}

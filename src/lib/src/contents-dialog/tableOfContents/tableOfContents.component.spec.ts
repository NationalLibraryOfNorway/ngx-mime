import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
        {provide: IiifManifestService, useClass: IiifManifestServiceStub}
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

    const structures: DebugElement[] = fixture.debugElement.queryAll(By.css('.toc'));
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

  it('should close contents dialog when selecting')

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
        new Structure({label: 'Forside', canvases: ['canvas1']}),
        new Structure({label: 'Tittelside', canvases: ['canvas2']}),
        new Structure({label: 'Bakside', canvases: ['canvas5']})
      ]
    }));
  }

  load(manifestUri: string): void {
  }
}

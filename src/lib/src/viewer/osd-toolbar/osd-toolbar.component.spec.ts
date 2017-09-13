import { PageService } from '../../core/page-service/page-service';
import { ModeService } from '../../core/mode-service/mode.service';
import { ClickService } from '../../core/click/click.service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OsdToolbarComponent } from './osd-toolbar.component';
import { SharedModule } from './../../shared/shared.module';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from '../../core/viewer-intl';

describe('OsdToolbarComponent', () => {
  let component: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [OsdToolbarComponent],
      providers: [
        MimeResizeService,
        MimeViewerIntl,
        ViewerService,
        ClickService,
        PageService,
        ModeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

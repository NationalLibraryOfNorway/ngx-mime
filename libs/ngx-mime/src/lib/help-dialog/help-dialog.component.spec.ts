import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { HelpDialogModule } from './help-dialog.module';
import { HelpDialogComponent } from './help-dialog.component';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { ViewerServiceStub } from '../test/viewer-service-stub';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;
  let mediaObserver: any;
  let dialogRef: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HelpDialogModule],
      providers: [
        MimeViewerIntl,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ViewerService, useClass: ViewerServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mediaObserver = TestBed.inject(MediaObserver);
    dialogRef = TestBed.inject(MatDialogRef);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).toBeNull();
  });
});

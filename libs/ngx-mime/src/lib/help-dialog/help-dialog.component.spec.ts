import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogModule } from './help-dialog.module';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;
  let mediaObserver: any;
  let dialogRef: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HelpDialogModule],
        providers: [
          MimeViewerIntl,
          MimeResizeService,
          MimeDomHelper,
          FullscreenService,
          { provide: MatDialogRef, useClass: MatDialogRefStub },
          { provide: ViewerService, useClass: ViewerServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mediaObserver = TestBed.inject(MediaObserver);
    dialogRef = TestBed.inject(MatDialogRef);
  });

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

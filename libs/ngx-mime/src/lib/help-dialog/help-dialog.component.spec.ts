import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { SharedModule } from '../shared/shared.module';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { HelpDialogComponent } from './help-dialog.component';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;
  let mediaObserver: any;
  let dialogRef: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(MimeResizeService, {
          observablePropsToSpyOn: ['onResize'],
        }),
        { provide: MatDialogRef, useClass: MatDialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
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

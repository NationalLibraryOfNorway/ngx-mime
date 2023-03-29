import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogComponent } from './help-dialog.component';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;
  let mediaObserverSpy: Spy<MediaObserver>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HelpDialogComponent],
      providers: [
        MimeViewerIntl,
        provideAutoSpy(MimeResizeService, {
          observablePropsToSpyOn: ['onResize'],
        }),
        provideAutoSpy(MediaObserver),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    mediaObserverSpy = TestBed.inject<any>(MediaObserver);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    mediaObserverSpy.isActive.and.returnValue(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    mediaObserverSpy.isActive.and.returnValue(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).toBeNull();
  });
});

import { ViewerMode } from '../models/viewer-mode';
import { TestBed, inject } from '@angular/core/testing';
import { ModeService } from './mode.service';
import { ModeChanges } from '../models/modeChanges';

describe('ModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeService]
    });
  });

  it('should be created', inject([ModeService], (service: ModeService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit when mode changes', inject(
    [ModeService],
    (service: ModeService) => {
      let selectedMode: ViewerMode;
      service.onChange.subscribe(
        (mode: ModeChanges) => (selectedMode = mode.currentValue)
      );

      service.mode = ViewerMode.DASHBOARD;
      expect(selectedMode).toEqual(ViewerMode.DASHBOARD);
    }
  ));

  it('should store the initial mode', inject(
    [ModeService],
    (service: ModeService) => {
      service.initialMode = ViewerMode.DASHBOARD;
      expect(service.mode).toEqual(ViewerMode.DASHBOARD);
      expect(service.initialMode).toEqual(ViewerMode.DASHBOARD);
    }
  ));

  it('should not modify initial mode on mode change', inject(
    [ModeService],
    (service: ModeService) => {
      service.initialMode = ViewerMode.DASHBOARD;
      service.mode = ViewerMode.PAGE;
      expect(service.mode).toEqual(ViewerMode.PAGE);
      expect(service.initialMode).toEqual(ViewerMode.DASHBOARD);
    }
  ));

  it('should change mode when toggled', inject(
    [ModeService],
    (service: ModeService) => {
      service.initialMode = ViewerMode.DASHBOARD;
      service.toggleMode();
      expect(service.mode).toEqual(ViewerMode.PAGE);
      service.toggleMode();
      expect(service.mode).toEqual(ViewerMode.DASHBOARD);
    }
  ));

  it('should change mode to DASHBOARD when toggled in PAGE_ZOOMED', inject(
    [ModeService],
    (service: ModeService) => {
      service.initialMode = ViewerMode.PAGE_ZOOMED;
      service.toggleMode();
      expect(service.mode).toEqual(ViewerMode.DASHBOARD);
    }
  ));

  it('should emit when mode is toggled', inject(
    [ModeService],
    (service: ModeService) => {
      let selectedMode: ViewerMode;
      service.onChange.subscribe(
        (mode: ModeChanges) => (selectedMode = mode.currentValue)
      );
      service.initialMode = ViewerMode.DASHBOARD;
      service.toggleMode();
      expect(selectedMode).toEqual(ViewerMode.PAGE);
    }
  ));
});

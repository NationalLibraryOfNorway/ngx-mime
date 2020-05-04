import { TestBed } from "@angular/core/testing";
import { SharedModule } from "../shared/shared.module";
import { HelpDialogService } from "./help-dialog.service";
import { MimeDomHelper } from "../core/mime-dom-helper";
import { HelpDialogConfigStrategyFactory } from "./help-dialog-config-strategy-factory";
import { FullscreenService } from "../core/fullscreen-service/fullscreen.service";
import { MimeResizeService } from "../core/mime-resize-service/mime-resize.service";

describe('HelpDialogService', () => {
  let service: HelpDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      providers: [
        HelpDialogService,
        MimeDomHelper,
        MimeResizeService,
        HelpDialogConfigStrategyFactory,
        FullscreenService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(HelpDialogService);
  });

  it('should create', () => {
      expect(service).toBeTruthy();
  });
});

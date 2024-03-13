import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { SharedModule } from '../shared/shared.module';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogService } from './view-dialog.service';

describe('ViewDialogService', () => {
  let service: ViewDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        ViewDialogService,
        provideAutoSpy(ViewDialogConfigStrategyFactory),
        provideAutoSpy(MimeResizeService),
        provideAutoSpy(MimeDomHelper),
      ],
    });
    service = TestBed.inject(ViewDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

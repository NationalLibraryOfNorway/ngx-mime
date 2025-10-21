import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { InformationDialogService } from './information-dialog.service';

describe('InformationDialogService', () => {
  let service: InformationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAutoSpy(MimeResizeService),
        provideAutoSpy(HelpDialogService),
        provideAutoSpy(InformationDialogService),
        provideAutoSpy(HelpDialogService),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(InformationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

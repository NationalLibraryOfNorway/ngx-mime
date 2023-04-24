import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { SharedModule } from '../shared/shared.module';
import { InformationDialogService } from './information-dialog.service';

describe('InformationDialogService', () => {
  let service: InformationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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

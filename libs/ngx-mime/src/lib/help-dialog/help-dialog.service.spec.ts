import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogService } from './help-dialog.service';

describe('HelpDialogService', () => {
  let service: HelpDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [provideAutoSpy(HelpDialogService)],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(HelpDialogService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

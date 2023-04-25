import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { SharedModule } from '../shared/shared.module';
import { AttributionDialogService } from './attribution-dialog.service';

describe('AttributionDialogService', () => {
  let service: AttributionDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [provideAutoSpy(AttributionDialogService)],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AttributionDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

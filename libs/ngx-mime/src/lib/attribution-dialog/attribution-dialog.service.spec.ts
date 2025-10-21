import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { AttributionDialogService } from './attribution-dialog.service';

describe('AttributionDialogService', () => {
  let service: AttributionDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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

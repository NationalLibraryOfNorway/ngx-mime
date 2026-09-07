import { TestBed } from '@angular/core/testing';
import { StyleService } from './style.service';

describe('StyleService', () => {
  let service: StyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StyleService],
    });
    service = TestBed.inject(StyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

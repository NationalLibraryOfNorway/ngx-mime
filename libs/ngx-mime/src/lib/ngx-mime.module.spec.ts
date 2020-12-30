import { TestBed, waitForAsync } from '@angular/core/testing';
import { MimeModule } from './ngx-mime.module';

describe('NgxMimeModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MimeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MimeModule).toBeDefined();
  });
});

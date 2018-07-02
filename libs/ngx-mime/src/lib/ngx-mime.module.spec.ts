import { async, TestBed } from '@angular/core/testing';
import { MimeModule } from './ngx-mime.module';

describe('NgxMimeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MimeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MimeModule).toBeDefined();
  });
});

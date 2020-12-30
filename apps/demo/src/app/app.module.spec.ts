import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppModule).toBeDefined();
  });
});

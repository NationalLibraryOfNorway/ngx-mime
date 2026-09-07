import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
import { ViewerSpinnerComponent } from './viewer-spinner.component';

describe('ViewerSpinnerComponent', () => {
  let component: ViewerSpinnerComponent;
  let fixture: ComponentFixture<ViewerSpinnerComponent>;
  let spinnerService: SpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerSpinnerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SpinnerService],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerSpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner', async () => {
    spinnerService.show();
    await fixture.whenStable();

    const spinner = fixture.debugElement.query(By.css('.mime-spinner'));
    expect(window.getComputedStyle(spinner.nativeElement).display).toBe(
      'block',
    );
  });
});

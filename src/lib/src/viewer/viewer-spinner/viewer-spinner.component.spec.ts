import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';

import { SharedModule } from './../../shared/shared.module';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
import { ViewerSpinnerComponent } from './viewer-spinner.component';

describe('ViewerSpinnerComponent', () => {
  let component: ViewerSpinnerComponent;
  let fixture: ComponentFixture<ViewerSpinnerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [SpinnerService],
        declarations: [ViewerSpinnerComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should show spinner',
    async(
      inject([SpinnerService], (spinnerService: SpinnerService) => {
        let spinner: any;

        spinnerService.show();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          spinner = fixture.debugElement.query(By.css('.mime-spinner'));
          expect(window.getComputedStyle(spinner.nativeElement).display).toBe('block');
        });
      })
    )
  );
});

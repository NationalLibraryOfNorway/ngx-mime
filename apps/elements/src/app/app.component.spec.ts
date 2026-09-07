import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('manifestUri', '');
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a ngx-mime viewer`, () => {
    const appDe: DebugElement = fixture.debugElement;
    const ngxMime = appDe.query(By.css('mime-viewer'));
    expect(ngxMime).toBeTruthy();
  });

  it('should update the viewer config when the config input changes', async () => {
    fixture.componentRef.setInput(
      'config',
      JSON.stringify({ navigationControlEnabled: false }),
    );
    await fixture.whenStable();

    expect(component.mimeConfig().navigationControlEnabled).toBe(false);
  });
});

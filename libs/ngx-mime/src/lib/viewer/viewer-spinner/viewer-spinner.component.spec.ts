import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { By } from '@angular/platform-browser';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
import { ViewerSpinnerComponent } from './viewer-spinner.component';

describe('ViewerSpinnerComponent', () => {
  let component: ViewerSpinnerComponent;
  let fixture: ComponentFixture<ViewerSpinnerComponent>;
  let spinnerService: SpinnerService;
  let loader: HarnessLoader;
  let intl: MimeViewerIntl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerSpinnerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SpinnerService, MimeViewerIntl],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerSpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
    loader = TestbedHarnessEnvironment.loader(fixture);
    intl = TestBed.inject(MimeViewerIntl);
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

  it('should re-render when the i18n labels have changed', async () => {
    intl.loadingLabel = 'Laster innhold';
    intl.notifyChanges();
    await fixture.whenStable();

    const spinner = await getSpinner();
    const ariaLabel = await getAriaLabel(spinner);
    expect(ariaLabel).toEqual('Laster innhold');
  });

  const getSpinner = async () =>
    loader.getHarnessOrNull(MatProgressSpinnerHarness);

  const getAriaLabel = async (
    spinnerHarness: MatProgressSpinnerHarness | null,
  ) => {
    const host = await spinnerHarness?.host();

    return host?.getAttribute('aria-label');
  };
});

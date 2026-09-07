import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let loader: HarnessLoader;
  let navigate: jest.MockedFunction<Router['navigate']>;

  beforeEach(async () => {
    navigate = jest.fn().mockResolvedValue(true);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [{ provide: Router, useValue: { navigate } }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    fixture.componentRef.setInput('sidenav', {
      toggle: jest.fn(),
    } as unknown as MatSidenav);
    loader = TestbedHarnessEnvironment.loader(fixture);
    await fixture.whenStable();
  });

  it('should navigate to the entered manifest on submit', async () => {
    const input = await loader.getHarness(MatInputHarness);
    const submitButton = await loader.getHarness(
      MatButtonHarness.with({ buttonType: 'submit' }),
    );

    await input.setValue('https://example.com/manifest.json');
    await submitButton.click();
    await fixture.whenStable();

    expect(navigate).toHaveBeenCalledWith(['demo'], {
      queryParams: {
        manifestUri: 'https://example.com/manifest.json',
      },
    });
  });
});

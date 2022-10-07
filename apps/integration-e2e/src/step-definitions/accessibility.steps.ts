import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Then(
  'the viewer should meet all accessibility criteria',
  async function (this: CustomWorld) {
    await this.page.goto(`${this.parameters.appUrl}`);

    // Alle Scenarios is checked in After hook
    expect(true).toBeTruthy();
  }
);

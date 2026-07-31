import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Then } from '../support/fixtures';

Then(
  'the viewer should meet all accessibility criteria',
  async function (this: CustomWorld) {
    await this.viewerPage.open();

    // Alle Scenarios is checked in After hook
    expect(true).toBeTruthy();
  },
);

import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Then } from '../support/fixtures';

Then(
  'the logo associated with the resource are displayed to the user',
  async function (this: CustomWorld) {
    await expect(this.metadataPage.logo).toBeVisible();
  },
);

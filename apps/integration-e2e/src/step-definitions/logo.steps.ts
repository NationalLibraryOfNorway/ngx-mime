import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Then(
  'the logo associated with the resource are displayed to the user',
  async function (this: CustomWorld) {
    await expect(this.metadataPage.logo).toBeVisible();
  },
);

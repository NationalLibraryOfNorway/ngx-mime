import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('the help dialog is open', async function (this: CustomWorld) {
  await this.viewerPage.openHelpDialog();
});

Then('help is displayed to the user', async function (this: CustomWorld) {
  await expect(this.helpDialogPage.container).toBeVisible();
});

Then(
  'the Help dialog should be {word}',
  async function (this: CustomWorld, state) {
    state === 'closed'
      ? await expect(this.helpDialogPage.container).toBeHidden()
      : await expect(this.helpDialogPage.container).toBeVisible();
  }
);

import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('the help dialog is open', async function (this: CustomWorld) {
  await this.viewerPage.openHelpDialog();
});

Then('help is displayed to the user', async function (this: CustomWorld) {
  const isOpen = await this.helpDialogPage.isOpen();
  expect(isOpen).toBeTruthy();
});

Then(
  'the Help dialog should be {word}',
  async function (this: CustomWorld, state) {
    const isOpen = await this.helpDialogPage.isOpen();
    const expectedState = state === 'closed' ? false : true;
    expect(isOpen).toEqual(expectedState);
  }
);

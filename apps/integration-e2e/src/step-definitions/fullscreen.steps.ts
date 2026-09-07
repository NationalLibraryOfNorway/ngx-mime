import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Given, Then, When } from '../support/fixtures';

Given('the viewer is in full screen mode', async function (this: CustomWorld) {
  await this.viewerPage.fullscreenButton.click();
});

When('the user select full screen mode', async function (this: CustomWorld) {
  await this.viewerPage.fullscreenButton.click();
});

When(
  'the user select exit full screen mode',
  async function (this: CustomWorld) {
    await this.viewerPage.fullscreenButton.click();
  },
);

Then(
  'the viewer should be presented using the entire screen',
  async function (this: CustomWorld) {
    await expect.poll(() => this.viewerPage.isFullscreen()).toBeTruthy();
  },
);

Then(
  'the viewer should be presented normally',
  async function (this: CustomWorld) {
    await expect.poll(() => this.viewerPage.isFullscreen()).toBeFalsy();
  },
);

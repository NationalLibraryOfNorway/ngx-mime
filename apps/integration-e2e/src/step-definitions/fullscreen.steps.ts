import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

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
  }
);

Then(
  'the viewer should be presented using the entire screen',
  async function (this: CustomWorld) {
    expect(await this.viewerPage.isFullscreen()).toBeTruthy();
  }
);

Then(
  'the viewer should be presented normally',
  async function (this: CustomWorld) {
    expect(await this.viewerPage.isFullscreen()).toBeFalsy();
  }
);

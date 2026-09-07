import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Given, Then, When } from '../support/fixtures';

let previousCanvasGroupLabel = '';

Given(
  /^the viewer is on page (.*)$/,
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.goToCanvasGroup(canvasGroupIndex);
  },
);

When(
  /^the user hits key (.*)$/,
  async function (this: CustomWorld, key: string) {
    previousCanvasGroupLabel =
      await this.viewerPage.getCurrentCanvasGroupLabel();
    await this.viewerPage.pressKeyboardEvent(key);
  },
);

Given(
  /^the content search dialog is open$/,
  async function (this: CustomWorld) {
    await this.viewerPage.sendKeyboardEvent('s');
  },
);

Given(/^the information dialog is open$/, async function (this: CustomWorld) {
  await this.viewerPage.sendKeyboardEvent('c');
});

Then(/^the viewer should go to next page$/, async function (this: CustomWorld) {
  await expect(this.viewerPage.currentCanvasGroupLabel).toHaveText(
    `${parseInt(previousCanvasGroupLabel, 10) + 1}`,
  );
});

Then(
  /^the viewer should go to previous page$/,
  async function (this: CustomWorld) {
    await expect(this.viewerPage.currentCanvasGroupLabel).toHaveText(
      `${parseInt(previousCanvasGroupLabel, 10) - 1}`,
    );
  },
);

Then(/^the viewer should go to last page$/, async function (this: CustomWorld) {
  await expect(this.viewerPage.currentCanvasGroupLabel).toHaveText(
    `${await this.viewerPage.getNumberOfCanvasGroups()}`,
  );
});

Then(
  /^the viewer should go to first page$/,
  async function (this: CustomWorld) {
    await expect(this.viewerPage.currentCanvasGroupLabel).toHaveText('1');
  },
);

Then(/^the viewer should not change page$/, async function (this: CustomWorld) {
  await this.animations.waitFor();

  await expect(this.viewerPage.currentCanvasGroupLabel).toHaveText(
    previousCanvasGroupLabel,
  );
});

Then(
  /^the content search dialog should open$/,
  async function (this: CustomWorld) {
    await expect(this.contentSearchPage.container).toBeVisible();
  },
);

Then(
  /^the content search dialog should close$/,
  async function (this: CustomWorld) {
    await expect(this.contentSearchPage.container).toBeHidden();
  },
);

Then(
  /^the information dialog should open$/,
  async function (this: CustomWorld) {
    await expect(this.informationDialogPage.container).toBeVisible();
  },
);

Then(
  /^the information dialog should close$/,
  async function (this: CustomWorld) {
    await expect(this.informationDialogPage.container).toBeHidden();
  },
);

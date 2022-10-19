import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let previousCanvasGroupLabel = '';

Given(
  /^the viewer is on page (.*)$/,
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.goToCanvasGroup(canvasGroupIndex);
  }
);

When(
  /^the user hits key (.*)$/,
  async function (this: CustomWorld, key: string) {
    previousCanvasGroupLabel =
      await this.viewerPage.getCurrentCanvasGroupLabel();
    await this.viewerPage.sendKeyboardEvent(key);
    await this.utils.waitForAnimation();
  }
);

Given(
  /^the content search dialog is open$/,
  async function (this: CustomWorld) {
    await this.viewerPage.sendKeyboardEvent('s');
  }
);

Given(/^the contents dialog is open$/, async function (this: CustomWorld) {
  await this.viewerPage.sendKeyboardEvent('c');
});

Then(/^the viewer should go to next page$/, async function (this: CustomWorld) {
  expect(await this.viewerPage.getCurrentCanvasGroupLabel()).toEqual(
    `${parseInt(previousCanvasGroupLabel, 10) + 1}`
  );
});

Then(
  /^the viewer should go to previous page$/,
  async function (this: CustomWorld) {
    expect(await this.viewerPage.getCurrentCanvasGroupLabel()).toEqual(
      `${parseInt(previousCanvasGroupLabel, 10) - 1}`
    );
  }
);

Then(/^the viewer should go to last page$/, async function (this: CustomWorld) {
  expect(await this.viewerPage.getCurrentCanvasGroupLabel()).toEqual(
    `${await this.viewerPage.getNumberOfCanvasGroups()}`
  );
});

Then(
  /^the viewer should go to first page$/,
  async function (this: CustomWorld) {
    expect(await this.viewerPage.getCurrentCanvasGroupLabel()).toEqual('1');
  }
);

Then(/^the viewer should not change page$/, async function (this: CustomWorld) {
  expect(await this.viewerPage.getCurrentCanvasGroupLabel()).toEqual(
    previousCanvasGroupLabel
  );
});

Then(
  /^the content search dialog should open$/,
  async function (this: CustomWorld) {
    await expect(this.contentSearchPage.container).toBeVisible();
  }
);

Then(
  /^the content search dialog should close$/,
  async function (this: CustomWorld) {
    await expect(this.contentSearchPage.container).toBeHidden();
  }
);

Then(/^the contents dialog should open$/, async function (this: CustomWorld) {
  expect(await this.contentsDialogPage.isOpen()).toBeTruthy();
});

Then(/^the contents dialog should close$/, async function (this: CustomWorld) {
  expect(await this.contentsDialogPage.isClosed()).toBeTruthy();
});

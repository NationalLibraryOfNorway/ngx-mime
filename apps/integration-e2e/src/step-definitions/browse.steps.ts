import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Then, When } from '../support/fixtures';

When(
  'the user swipe {word} and the velocity is between {int}-{int}',
  async function () {
    return 'pending';
  },
);

When(
  'the user swipe {word} and the velocity is equal or greater than {int}',
  async function () {
    return 'pending';
  },
);

When(
  'the user swipe {word} but the velocity is less than {int}',
  async function () {
    return 'pending';
  },
);

When(
  'the user drags the page slider to page {int}',
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.slideToCanvasGroup(canvasGroupIndex - 1);
  },
);

When(
  'the user enters {int} in the page dialog',
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.goToCanvasGroupWithDialog(canvasGroupIndex);
  },
);

Then(
  'page {word} is displayed',
  async function (this: CustomWorld, canvasGroupIndex: string) {
    await expect(this.viewerPage.currentCanvasGroupLabel).toContainText(
      canvasGroupIndex,
    );
  },
);

When(
  'the user click the {word} button',
  async function (this: CustomWorld, navigationButton: string) {
    navigationButton === 'next'
      ? await this.viewerPage.clickNextButton()
      : await this.viewerPage.clickPreviousButton();
  },
);

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Point } from '../pages/viewer.po';

let previousCenter: Point;

When('the user is dragging', async function (this: CustomWorld) {
  previousCenter = await this.viewerPage.getCenter();
  await this.viewerPage.pan({ x: previousCenter.x + 150, y: 0 });
  await this.utils.waitForAnimation();
});

When('the user hits ArrowUp', async function (this: CustomWorld) {
  previousCenter = await this.viewerPage.getCenter();
  await this.viewerPage.sendKeyboardEvent('ArrowUp');
});

When('the user hits ArrowRight', async function (this: CustomWorld) {
  previousCenter = await this.viewerPage.getCenter();
  await this.viewerPage.sendKeyboardEvent('ArrowRight');
});

Then('the image is moved inside the view', async function (this: CustomWorld) {
  expect((await this.viewerPage.getCenter()).x).not.toEqual(previousCenter.x);
});

Then(
  'the image is not moved inside the view',
  async function (this: CustomWorld) {
    expect((await this.viewerPage.getCenter()).y).toEqual(previousCenter.y);
  }
);

import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let previousZoomLevel = 0;

Given('the zoom level is home', async function (this: CustomWorld) {
  expect(
    await this.viewerPage.isCurrentCanvasGroupFittedViewport(),
  ).toBeTruthy();
});

Given('the view is all zoomed out', async function (this: CustomWorld) {
  await this.viewerPage.clickZoomHomeButton();
  await this.animations.waitFor();
});

Given('the view is zoomed in', async function (this: CustomWorld) {
  await this.viewerPage.openOsdControls();
  await this.viewerPage.clickZoomInButton();
  await this.animations.waitFor();
  previousZoomLevel = await this.viewerPage.getZoomLevel();
});

When('the user pinch out', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.pinchOut();
  await this.animations.waitFor();
});

When('the user pinch in', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.pinchIn();
  await this.animations.waitFor();
});

When('the user click zoom in button', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.openOsdControls();
  await this.viewerPage.clickZoomInButton();
  await this.animations.waitFor();
});

When('the user click zoom out button', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.openOsdControls();
  await this.viewerPage.clickZoomOutButton();
  await this.animations.waitFor();
});

When('the user double click', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.dblClick();
  await this.animations.waitFor();
});

When('the user double taps', async function (this: CustomWorld) {
  previousZoomLevel = await this.viewerPage.getZoomLevel();
  await this.viewerPage.dblTap();
  await this.animations.waitFor();
});

Then(
  'the current zoom level has increased',
  async function (this: CustomWorld) {
    expect(await this.viewerPage.getZoomLevel()).toBeGreaterThan(
      previousZoomLevel,
    );
  },
);

Then(
  'the current zoom level has decreased',
  async function (this: CustomWorld) {
    expect(await this.viewerPage.getZoomLevel()).toBeLessThan(
      previousZoomLevel,
    );
  },
);

Then('the view should be all zoomed out', async function (this: CustomWorld) {
  expect(await this.viewerPage.getZoomLevel()).toEqual(
    await this.viewerPage.getMinZoom(),
  );
});

Then(
  'the view should be vertically centered',
  async function (this: CustomWorld) {
    expect(await this.viewerPage.isVerticallyCentered()).toBeTruthy();
  },
);

Then('the current zoom level is home', async function (this: CustomWorld) {
  expect(
    await this.viewerPage.isCurrentCanvasGroupFittedViewport(),
  ).toBeTruthy();
});

import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('the layout is two-page', async function (this: CustomWorld) {
  await this.viewerPage.setDashboardMode();
  await this.viewerPage.setTwoPageView();

  expect(await this.viewerPage.isTwoPageView()).toBeTruthy();
});

Given('the layout is one-page', async function (this: CustomWorld) {
  await this.viewerPage.setDashboardMode();
  await this.viewerPage.setOnePageView();

  expect(await this.viewerPage.isOnePageView()).toBeTruthy();
});

Then('only the cover page is displayed', async function (this: CustomWorld) {
  await this.animations.waitFor();
  const visibleCanvasGroups = await this.viewerPage.visibleCanvasGroups();
  // Firste page visible
  expect(visibleCanvasGroups[0]).toBeTruthy();
  // Rest of the pages should not be visible
  visibleCanvasGroups.splice(0, 1);
  expect(visibleCanvasGroups.includes(true)).toBeFalsy();
});

Then('page 2 and 3 are displayed', async function (this: CustomWorld) {
  await this.animations.waitFor();

  const visibleCanvasGroups = await this.viewerPage.visibleCanvasGroups();
  // Second and third pages visible
  expect(visibleCanvasGroups[1]).toBeTruthy();
  expect(visibleCanvasGroups[2]).toBeTruthy();

  // Rest of the pages should not be visible
  visibleCanvasGroups.splice(1, 2);
  expect(visibleCanvasGroups.includes(true)).toBeFalsy();
});

Then('only page 2 is displayed', async function (this: CustomWorld) {
  await this.animations.waitFor();
  const visibleCanvasGroups = await this.viewerPage.visibleCanvasGroups();
  // Second page visible
  expect(visibleCanvasGroups[1]).toBeTruthy();

  // Rest of the pages should not be visible
  visibleCanvasGroups.splice(1, 1);
  expect(visibleCanvasGroups.includes(true)).toBeFalsy();
});

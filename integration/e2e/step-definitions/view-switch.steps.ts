const { Given, When, Then } = require('cucumber');
import { browser, by } from 'protractor';

import { ViewerPage } from '../pages/viewer.po';
import { expect } from '../helpers/chai-imports';
import { Utils } from '../helpers/utils';

const page = new ViewerPage();
const utils = new Utils();
// 300ms is the time the animation is set up to use but we need some extra time
const switchAnimationTime = 1700;

Given('the viewer is in dashboard view', async () => {
  const overlay = await page.getSVGElement();
  await overlay.click();
  await page.waitForAnimation(switchAnimationTime);
  expect(await page.isDashboardMode()).to.equal(true);
});

Given('the viewer is in page view', async () => {
  expect(await page.isPageMode()).to.equal(true);
});

When('the user click in the viewer', async () => {
  // TODO click page.getSVGElement() insted of first overlay
  // to be able to switch view mode when firste page is out of view
  const overlay = await page.getSVGElement();
  await overlay.click();
  await page.waitForAnimation(switchAnimationTime);
});

Then('the viewer should change to page view', async () => {
  expect(await page.isPageMode()).to.equal(true);
});

Given('the viewer should be in page view', async () => {
  expect(await page.isPageMode()).to.equal(true);
});

Then('the viewer should change to dashboard view', async () => {
  expect(await page.isDashboardMode()).to.equal(true);
});

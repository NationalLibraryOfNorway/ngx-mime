const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

const page = new ViewerPage();
const metadata = new MetadataPage();

Given('the viewer is in full screen mode', async () => {
  const fullscreenButton = await page.fullscreenButton();
  await fullscreenButton.click();
});

When('the user select full screen mode', async () => {
  const fullscreenButton = await page.fullscreenButton();
  await fullscreenButton.click();
});

When('the user select exit full screen mode', async () => {
  const fullscreenButton = await page.fullscreenButton();
  await fullscreenButton.click();
});

Then('the viewer should be presented using the entire screen', async () => {
  expect(await page.isFullscreen()).to.equal(true);
});

Then('the viewer should be presented normally', async () => {
  expect(await page.isFullscreen()).to.equal(false);
});

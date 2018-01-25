import { defineSupportCode } from 'cucumber';
import { expect } from 'chai';

import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousZoomLevel = 0;

  Given('zoom level is home', async () => {
    expect(await page.isCurrentPageFittedViewport()).to.equal(true);
  });

  Given('the view is all zoomed out', async () => {
    await page.clickZoomHomeButton();
    await page.waitForAnimation();
  });

  Given('the view is zoomed in', async () => {
    await page.clickZoomInButton();
    await page.waitForAnimation();
    previousZoomLevel = await page.getZoomLevel();
  });

  When('the user pinch out', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.pinchOut();
    await page.waitForAnimation();
  });

  When('the user pinch in', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.pinchIn();
    await page.waitForAnimation();
  });

  When('the user click zoom in button', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.clickZoomInButton();
    await page.waitForAnimation();
  });

  When('the user click zoom out button', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.clickZoomOutButton();
    await page.waitForAnimation();
  });

  When('the user double click', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.dblClick();
    await page.waitForAnimation();
  });

  When('the user double taps', async () => {
    previousZoomLevel = await page.getZoomLevel();
    await page.dblTap();
    await page.waitForAnimation();
  });

  Then('the current zoom level has increased', async () => {
    expect((await page.getZoomLevel())).to.be.greaterThan(previousZoomLevel);
  });

  Then('the current zoom level has decreased', async () => {
    expect((await page.getZoomLevel())).to.be.lessThan(previousZoomLevel);
  });

  Then('the view should be all zoomed out', async () => {
    expect((await page.getZoomLevel())).to.equal((await page.getMinZoom()));
  });

  Then('the view should be vertically centered', async () => {
    expect(await page.isVerticallyCentered()).to.equal(true);
  });

  Then('the current zoom level is home', async () => {
    expect(await page.isCurrentPageFittedViewport()).to.equal(true);
  });

});

import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser } from 'protractor';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousZoomLevel = 0;
  const sleepTime = 1000;

  Given(/^default zoom level is set$/, async () => {
    await page.setDefaultZoom();
  });

  Given(/^the view is all zoomed out$/, async () => {
    await browser.sleep(sleepTime);
    await page.getMinZoom().then((minZoom: number) => {
      page.setZoomLevel(minZoom);
    });
  });

  Given(/^the view is zoomed in$/, async () => {
    await page.zoomIn();
  });

  When(/^the user pinch out$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    // await page.pinchOut(); //TODO Use pinchOut() when we get Protractor.touchActions to work
    await page.zoomIn();
  });

  When(/^the user pinch in$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    // await page.pinchIn(); //TODO Use pinchIn() when we get Protractor.touchActions to work
    await page.zoomOut();
  });

  When(/^the user click zoom in button$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.clickZoomInButton();
  });

  When(/^the user click zoom out button$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.clickZoomOutButton();
  });

  When(/^the user double click$/, async () => {
    await browser.sleep(sleepTime);
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.dblClick();
  });

  Then(/^the current zoom level has increased$/, async () => {
    await browser.sleep(sleepTime);
    expect((await page.getZoomLevel())).to.be.greaterThan(previousZoomLevel);
  });

  Then(/^the current zoom level has decreased$/, async () => {
    await browser.sleep(sleepTime);
    expect((await page.getZoomLevel())).to.be.lessThan(previousZoomLevel);
  });

  Then(/^the view should be all zoomed out$/, async () => {
    expect((await page.getZoomLevel())).to.equal((await page.getMinZoom()));
  });
});

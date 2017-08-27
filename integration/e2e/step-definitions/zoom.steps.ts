import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousZoomLevel = 0;

  Given(/^zoom level is home$/, async () => {
    await page.setHomeZoom();
    await page.waitForAnimation();
  });

  Given(/^the view is all zoomed out$/, async () => {
    await page.getMinZoom().then((zoomLevel: number) => page.setZoomLevel(zoomLevel));
    await page.waitForAnimation();
  });

  Given(/^the view is zoomed in$/, async () => {
    await page.zoomIn();
    await page.waitForAnimation();
  });

  When(/^the user pinch out$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.pinchOut();
    await page.waitForAnimation();
  });

  When(/^the user pinch in$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.pinchIn();
    await page.waitForAnimation();
  });

  When(/^the user click zoom in button$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.clickZoomInButton();
    await page.waitForAnimation();
  });

  When(/^the user click zoom out button$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.clickZoomOutButton();
    await page.waitForAnimation();
  });

  When(/^the user double click$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.dblClick();
    await page.waitForAnimation();
  });

  Then(/^the current zoom level has increased$/, async () => {
    expect((await page.getZoomLevel())).to.be.greaterThan(previousZoomLevel);
  });

  Then(/^the current zoom level has decreased$/, async () => {
    expect((await page.getZoomLevel())).to.be.lessThan(previousZoomLevel);
  });

  Then(/^the view should be all zoomed out$/, async () => {
    expect((await page.getZoomLevel())).to.equal((await page.getMinZoom()));
  });

  Then(/^the current zoom level is home$/, async () => {
    expect((await page.getZoomLevel())).to.equal((await page.getHomeZoom()));
  });
});

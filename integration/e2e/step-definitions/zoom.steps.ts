import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser } from 'protractor';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousZoomLevel = 0;

  Given(/^the viewer is in page view$/, async () => {
    expect((await page.getOpenSeadragon().isDisplayed())).to.be.true;
  });

  Given(/^default zoom level is set$/, async () => {
    await page.setHomeZoomLevel();
  });

  When(/^the user pinch out$/, async () => {
    await page.zoomIn();
    await page.getZoomLevel().then((zoomlevel: number) => {
      console.log('Zoomlevel is now ' + zoomlevel);
      previousZoomLevel = zoomlevel;
    });
    await page.pinchOut();
  });

  When(/^the user pinch in$/, async () => {
    await page.zoomOut();
    await page.getZoomLevel().then((zoomlevel: number) => {
      console.log('Zoomlevel is now ' + zoomlevel);
      previousZoomLevel = zoomlevel;
    });
    await page.pinchIn();
  });

  When(/^the user click zoom in button$/, async () => {
    await page.clickZoomInButton();
  });

  When(/^the user click zoom out button$/, async () => {
    await page.clickZoomOutButton();
  });

  Then(/^the current zoom level has increased$/, async () => {
    await page.getZoomLevel().then((zoomLevel: number) => {
      console.log(zoomLevel + ' > ' + previousZoomLevel);
      expect(zoomLevel).to.be.greaterThan(previousZoomLevel);
    });
  });

  Then(/^the current zoom level has decreased$/, async () => {
    await page.getZoomLevel().then((zoomLevel: number) => {
      console.log(zoomLevel + ' < ' + previousZoomLevel);
      expect(zoomLevel).to.be.lessThan(previousZoomLevel);
    });
  });


  //
  // Given(/^the view is all zoomed out$/, async () => {
  //   return 'pending';
  // });
  //
  // When(/^the user double click$/, async () => {
  //   return 'pending';
  // });
});

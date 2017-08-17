import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser } from 'protractor';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();

  Given(/^the viewer is opened with a publication$/, async () => {
    await page.open();
  });

  Given(/^the viewer is in page view$/, async () => {
    await expect(page.getOpenSeadragon()).exist;
  });

  When(/^the user pinch out$/, async () => {
    await page.zoomOut();
  });

  Then(/^the current zoom level has increased$/, async () => {
    page.getZoomLevel().then(zoomLevel => {
      console.log(zoomLevel);
    });
    await browser.sleep(5000);
  });

  // Given(/^the view is zoomed in$/, async () => {
  //   return 'pending';
  // });
  //
  // When(/^the user pinch$/, async () => {
  //   return 'pending';
  // });
  //
  // Then(/^the current zoom level has decreased$/, async () => {
  //   return 'pending';
  // });
  //
  // When(/^the user click zoom in button$/, async () => {
  //   return 'pending';
  // });
  //
  // When(/^the user click zoom out button$/, async () => {
  //   return 'pending';
  // });
  //
  // Given(/^the view is all zoomed out$/, async () => {
  //   return 'pending';
  // });
  //
  // When(/^the user double click$/, async () => {
  //   return 'pending';
  // });
});

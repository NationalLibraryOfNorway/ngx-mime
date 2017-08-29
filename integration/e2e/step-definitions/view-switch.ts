import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousZoomLevel = 0;

  Given(/^the viewer is in dashboard view$/, async () => {
    await page.setHomeZoom();
    await page.waitForAnimation();
  });


  When(/^the user click in the viewer$/, async () => {
    await page.getZoomLevel().then((zoomlevel: number) => previousZoomLevel = zoomlevel);
    await page.pinchOut();
    await page.waitForAnimation();
  });

  Then(/^the viewer should change to page view$/, async () => {
    const header = page.getHeader();
    const headerToolbar = header.element(by.css('md-toolbar'));
    utils.waitForElement(headerToolbar);
    const size = await headerToolbar.getSize();
    expect((await headerToolbar.size.height)).to.be.greaterThan(1);
  });

});

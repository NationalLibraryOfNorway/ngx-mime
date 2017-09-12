import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser, by } from 'protractor';
import { Utils } from '../helpers/utils';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const utils = new Utils();
  // 300ms is the time the animation is set up to use but we need some extra time
  const switchAnimationTime = 1700;

  Given(/^the viewer is in dashboard view$/, async () => {
    const firstOverlay = await page.getFirstPageOverlay();
    await utils.clickElement(firstOverlay);
    await browser.sleep(switchAnimationTime);
    expect(await page.isDashboardMode()).to.be.true;
  });

  Given(/^the viewer is in page view$/, async () => {
    expect(await page.isPageMode()).to.be.true;
  });


  When(/^the user click in the viewer$/, async () => {
    const firstOverlay = await page.getFirstPageOverlay();
    await utils.clickElement(firstOverlay);
    await browser.sleep(switchAnimationTime);
  });

  When(/^the user double click in the viewer$/, async () => {
    const firstOverlay = await page.getFirstPageOverlay();
    await utils.clickElement(firstOverlay);
    await utils.clickElement(firstOverlay);
    await browser.sleep(switchAnimationTime);
  });

  Then(/^the viewer should change to page view$/, async () => {
    expect(await page.isPageMode()).to.be.true;
  });

  Given(/^the viewer should be in page view$/, async () => {
    expect(await page.isPageMode()).to.be.true;
  });

  Then(/^the viewer should change to dashboard view$/, async () => {
    expect(await page.isDashboardMode()).to.be.true;
  });

});

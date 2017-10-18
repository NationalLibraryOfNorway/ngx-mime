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
    const overlay = await page.getSVGElement();
    await overlay.click();
    await page.waitForAnimation(switchAnimationTime);
    expect(await page.isDashboardMode()).to.equal(true);
  });

  Given(/^the viewer is in page view$/, async () => {
    expect(await page.isPageMode()).to.equal(true);
  });

  Given(/^the layout is two-page$/, async () => {
    const btn = await page.getTwoPageButton();
    // Button is present, so click to switch to two-page
    if (btn) {
      await btn.click();
      // We dont know how long it takes to build the layout, so the wait might become an issue here
      await page.waitForAnimation(switchAnimationTime);
    }
    expect(await page.isTwoPageView()).to.equal(true);
  });

  Given(/^the layout is one-page$/, async () => {
    const btn = await page.getOnePageButton();
    // Button is present, so switch to one-page
    if (btn) {
      await btn.click();
      // We dont know how long it takes to build the layout, so the wait might become an issue here
      await page.waitForAnimation(switchAnimationTime);
    }

    expect(await page.isOnePageView()).to.equal(true);
  });

  When(/^the user click in the viewer$/, async () => {
    // TODO click page.getSVGElement() insted of first overlay
    // to be able to switch view mode when firste page is out of view
    const overlay = await page.getSVGElement();
    await overlay.click();
    await page.waitForAnimation(switchAnimationTime);
  });

  Then(/^the viewer should change to page view$/, async () => {
    expect(await page.isPageMode()).to.equal(true);
  });

  Given(/^the viewer should be in page view$/, async () => {
    expect(await page.isPageMode()).to.equal(true);
  });

  Then(/^the viewer should change to dashboard view$/, async () => {
    expect(await page.isDashboardMode()).to.equal(true);
  });

});

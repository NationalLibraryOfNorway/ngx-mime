import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  // 300ms is the time the animation is set up to use but we need some extra time
  const switchAnimationTime = 700;

  Given(/^the viewer is in dashboard view$/, async () => {
    await page.open();
    expect(await isDashboardMode()).to.be.true;
  });

  Given(/^the viewer is in page view$/, async () => {
    await page.open();
    const firstOverlay = page.getFirstPageOverlay();
    firstOverlay.click();
    await browser.sleep(switchAnimationTime);
    expect(await isPageMode()).to.be.true;
  });

  When(/^the user click in the viewer$/, async () => {
    const firstOverlay = page.getFirstPageOverlay();
    firstOverlay.click();
    await browser.sleep(switchAnimationTime);
  });

  Then(/^the viewer should change to page view$/, async () => {
    expect(await isPageMode()).to.be.true;
  });

  Then(/^the viewer should change to dashboard view$/, async () => {
    expect(await isDashboardMode()).to.be.true;
  });

  async function isDashboardMode(): Promise<boolean> {
    const header = page.getHeader();
    const footer = page.getFooter();
    const headerIsDisplayed = await header.isDisplayed();
    const footerIsDisplayed = await footer.isDisplayed();
    return headerIsDisplayed && headerIsDisplayed;
  }

  async function isPageMode(): Promise<boolean> {
    const header = page.getHeader();
    const footer = page.getFooter();
    const headerIsDisplayed = await header.isDisplayed();
    const footerIsDisplayed = await footer.isDisplayed();
    return (!headerIsDisplayed && !headerIsDisplayed);
  }

});

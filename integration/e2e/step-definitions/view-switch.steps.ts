import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser, by } from 'protractor';
import { Utils } from '../helpers/utils';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const utils = new Utils();
  // 300ms is the time the animation is set up to use but we need some extra time
  const switchAnimationTime = 2000;

  Given(/^the viewer is in dashboard view$/, async () => {
    const firstOverlay = page.getFirstPageOverlay();
    firstOverlay.click();
    await browser.sleep(switchAnimationTime);
    expect(await isDashboardMode()).to.be.true;
  });

  Given(/^the viewer is in page view$/, async () => {
    expect(await isPageMode()).to.be.true;
  });


  When(/^the user click in the viewer$/, async () => {
    const firstOverlay = page.getFirstPageOverlay();
    utils.clickElement(firstOverlay);
    await browser.sleep(switchAnimationTime);
  });

  When(/^the user double click in the viewer$/, async () => {
    const firstOverlay = page.getFirstPageOverlay();
    utils.clickElement(firstOverlay);
    utils.clickElement(firstOverlay);
    await browser.sleep(switchAnimationTime);
  });

  Then(/^the viewer should change to page view$/, async () => {
    expect(await isPageMode()).to.be.true;
  });

  Given(/^the viewer should be in page view$/, async () => {
    expect(await isPageMode()).to.be.true;
  });

  Then(/^the viewer should change to dashboard view$/, async () => {
    expect(await isDashboardMode()).to.be.true;
  });

  async function isDashboardMode(): Promise<boolean> {
    const header = page.getHeader();
    const footer = page.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisPresent = (await headerDisplay) === 'block';
    const footerisPresent = (await footerDisplay) === 'block';
    return (headerisPresent && headerisPresent);
  }

  async function isPageMode(): Promise<boolean> {
    const header = page.getHeader();
    const footer = page.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisHidden = (await headerDisplay) === 'none';
    const footerisHidden = (await footerDisplay) === 'none';
    return (headerisHidden && footerisHidden);
  }

});

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
  });


  When(/^the user click in the viewer$/, async () => {
    await page.pinchIn();
//    await page.waitForAnimation();


    //const header = page.getHeader();
    //await page.tap(header.getWebElement());
    // await page.waitForAnimation();
  });

  Then(/^the viewer should change to page view$/, async () => {
    // const header = page.getHeader();
    // const size = await header.getSize();
    // console.log(size.height);
    // expect(size.height).to.be.lessThan(1);
  });

});

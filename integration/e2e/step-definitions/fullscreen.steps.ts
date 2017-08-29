import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();
  const metadata = new MetadataPage();

  Given(/^the user select full screen mode$/, async () => {
    await page.fullscreenButton().click();
  });

  Then(/^the viewer should be presented using the entire screen$/, async () => {
    expect(page.isFullscreen()).to.be.true;
  });

});


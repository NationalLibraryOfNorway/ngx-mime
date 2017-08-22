import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();

  Given(/^I am opening a default book$/, async () => {
    await page.open();
  });

  Given(/^the viewer is opened with a publication$/, async () => {
    await page.open();
  });

  Then(/^Viewer should be displayed$/, async () => {
    await expect(page.getOpenSeadragon()).exist;
  });
});

import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given }) {
  const page = new ViewerPage();

  Given(/^I am opening a default book$/, async () => {
    await page.open();
    await expect(page.getOpenSeadragon()).exist;
  });
});

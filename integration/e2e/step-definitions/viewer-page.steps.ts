import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given }) {

  Given(/^I am opening a default book$/, async () => {
    await ViewerPage.open();
    await expect(ViewerPage.getOpenSeadragon()).exist;
  });
});

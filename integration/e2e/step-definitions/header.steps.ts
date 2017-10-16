import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();

  Then(/^the label should be displayed$/, async () => {
    const expectedLabel = 'New travels into the interior parts of Africa : ' +
      'by the way of the Cape of Good Hope, in the years 1783, 84 and 85. Vol. 3';
    expect(await page.getHeaderLabel()).to.equal(expectedLabel);
  });
});

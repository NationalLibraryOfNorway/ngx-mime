import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports'
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given }) {
  const viewerPage = new ViewerPage();

  Given(/^I am on viewer page$/, async () => {
    await viewerPage.open();
    await expect(viewerPage.getTitle()).to.eventually.equal('IntegrationTest');
  });

});

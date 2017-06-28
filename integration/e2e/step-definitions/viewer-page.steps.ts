import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports'
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given }) {
  const aLtrBook = 'http://localhost:4545/catalog/v1/iiif/a-ltr-book/manifest';
  const viewerPage = new ViewerPage();

  Given(/^I am opening a book which are written from left to right$/, async () => {
    await viewerPage.open(aLtrBook);
    await expect(viewerPage.getHeadTitle()).to.eventually.equal('IntegrationTest');
  });

});

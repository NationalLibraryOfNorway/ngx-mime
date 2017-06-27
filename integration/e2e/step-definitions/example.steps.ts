import { defineSupportCode } from 'cucumber';
import { promisify } from 'bluebird'
import { expect } from '../helpers/chai-imports'
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Then }) {
  const viewerPage = new ViewerPage();

  Then(/^it should display "(.*?)"$/, async (text) => {
    await expect(viewerPage.getContent().getText()).to.eventually.equal(text);
  })

});


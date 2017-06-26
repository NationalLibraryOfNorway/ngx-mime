import { defineSupportCode } from 'cucumber';
import { promisify } from 'bluebird'
import { expect } from '../helpers/chai-imports'
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const viewerPage = new ViewerPage();

  Given('I open the viewer page', function() {
    return viewerPage.open();
  });

  Then('it should display {stringInDoubleQuotes}', function (text) {
    expect(viewerPage.getTitle().getText()).to.eventually.equal(text);
  })
});


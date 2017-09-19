import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ContentSearchPage } from './../pages/content-search.po';
import { ViewerPage, Point } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const contentSearchPage = new ContentSearchPage();

  When(/^the user search for the word "(.*)"$/, async (term: string) => {
    await page.openContentSearchDialog();
    await contentSearchPage.setSearchTerm(term);
  });

  Then(/^there are (.*) results found$/, async (numberOfHits: string) => {
    const expected = numberOfHits === 'no' ? 0 : parseInt(numberOfHits, 8);
    const hits = await contentSearchPage.getNumberOfHits();
    expect(hits).to.equal(expected);
  });

  Then(/^the word "(.*)" should be highlighted$/, async (term: string) => {
    return Promise.resolve('pending');
  });

});

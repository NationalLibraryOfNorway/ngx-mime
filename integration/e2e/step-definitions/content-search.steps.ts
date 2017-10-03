import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ContentSearchPage } from './../pages/content-search.po';
import { ViewerPage, Point } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const contentSearchPage = new ContentSearchPage();

  Given(/^the user has selected the second hit$/, async () => {
    await selectHit(1);
  });

  When(/^the user search for the word "(.*)"$/, async (term: string) => {
    await page.openContentSearchDialog();
    await contentSearchPage.setSearchTerm(term);
    await page.waitForAnimation();
  });

  When(/^the user selects the first hit$/, async () => {
    await selectHit(0);
  });

  When(/^the user select the (.*) hit button$/, async (action: string) => {
    let button;
    if (action === 'previous') {
      button = await contentSearchPage.previousButton();
    } else if (action === 'next') {
      button = await contentSearchPage.nextButton();
    } else if (action === 'clear') {
      button = await contentSearchPage.clearButton();
    }
    await button.click();
    await page.waitForAnimation();
  });

  Then(/^there are (.*) results found$/, async (numberOfHits: string) => {
    const expected = numberOfHits === 'no' ? 0 : parseInt(numberOfHits, 8);
    const hits = await contentSearchPage.getNumberOfHits();
    expect(hits).to.equal(expected);
  });

  Then(/^the word "(.*)" should be highlighted$/, async (term: string) => {
    const hits = await contentSearchPage.getHits();
    const firstHit = await hits[0].getAttribute('innerHTML');
    expect(firstHit).to.contains(`${term} </em>`);
  });

  Then(/^the page with hit number (.*) should be displayed$/, async (hit) => {
    const pageNumber = await page.getCurrentPageNumber();
    if (hit === 1) {
      expect(pageNumber).to.equal(25);
    } else if (hit === 3) {
      expect(pageNumber).to.equal(29);
    }
  });

  Then(/^all highlighting should be removed$/, async () => {
    const hits = await contentSearchPage.getHighlighted();
    expect(hits.length).to.equals(0);
  });

  Then(/^the search result toolbar should be removed$/, async () => {
    const el = await contentSearchPage.contentSearchNavigatorToolbar();
    expect(el.isPresent()).to.eql({});
  });

  async function selectHit(selected: number) {
    const hits = await contentSearchPage.getHits();
    const first = hits[selected];
    await first.click();
    await page.waitForAnimation();
  }
});

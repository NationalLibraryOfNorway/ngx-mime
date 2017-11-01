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
    const currentPageString = await page.getCurrentPageString();
    if (hit === 1) {
      expect(currentPageString.includes('25')).to.eql(true);
    } else if (hit === 3) {
      expect(currentPageString.includes('29')).to.eql(true);
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

  Then(/^hit number (.*) should be marked$/, async (hitIndex: number) => {
    const isSelected: boolean = await contentSearchPage.isSelected(hitIndex);
    expect(isSelected).to.equal(true);
  });

  async function selectHit(selected: number) {
    const hits = await contentSearchPage.getHits();
    const first = hits[selected];
    await first.click();
    await page.waitForAnimation();
  }
});

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

import { ElementFinder } from 'protractor';
import { ViewerPage } from '../pages/viewer.po';
import { ContentSearchPage } from '../pages/content-search.po';

const page = new ViewerPage();
const contentSearchPage = new ContentSearchPage();
let selectedHitIndex: number;

Given('the search dialog is open', async () => {
  await page.openContentSearchDialog();
});

Given('the user has search for the word {string}', async (term: string) => {
  await search(term);
});

Given('the user has selected the {word} hit', async (hit: string) => {
  await selectHit(hit);
});

When('the user search for the word {string}', async (term: string) => {
  await search(term);
});

When('the user selects the {word} hit', async (hit: string) => {
  await selectHit(hit);
});

When('the user select the {word} hit button', async (action: string) => {
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

When('the user closes the search dialog', async () => {
  const closeButton = await contentSearchPage.closeButton();
  await closeButton.click();
  await page.waitForAnimation();
});

When('the user opens the search dialog', async () => {
  await page.openContentSearchDialog();
});

When('the user click the search inputs clear button', async () => {
  const clearButton = await contentSearchPage.clearInputButton();
  await clearButton.click();
});

Then('there are {word} results found', async (numberOfHits: string) => {
  const expected = numberOfHits === 'no' ? 0 : parseInt(numberOfHits, 10);
  const hits = await contentSearchPage.getNumberOfHits();
  expect(hits).to.equal(expected);
});

Then('the word {string} should be highlighted', async (term: string) => {
  const firstHit: ElementFinder = contentSearchPage.getHit(0);
  const hitText = await firstHit.$('em').getText();

  expect(hitText.toLowerCase()).to.contains(`${term.toLowerCase()}`);
});

Then(
  'the page with hit number {word} should be displayed',
  async (hit: string) => {
    const currentPageString = await page.getCurrentCanvasGroupLabel();
    if (hit === '1') {
      expect(currentPageString.includes('7')).to.eql(true);
    } else if (hit === '3') {
      expect(currentPageString.includes('20')).to.eql(true);
    } else if (hit === '5' || hit === '6') {
      expect(currentPageString.includes('38')).to.eql(true);
    }
  }
);

Then('hit number {int} should be highlighted', async (hit: number) => {
  const hitIndex = hit - 1;
  expect(await contentSearchPage.isSelected(hitIndex)).to.eql(true);
});

Then('all highlighting should be removed', async () => {
  const hits = await contentSearchPage.getHighlighted();
  expect(hits.length).to.equals(0);
});

Then('the search result toolbar should be removed', async () => {
  expect(
    await contentSearchPage.contentSearchNavigatorToolbar().isPresent()
  ).to.equal(false);
});

Then('the Search dialog should be {word}', async (state: string) => {
  const isOpen = await contentSearchPage.isOpen();
  const expectedState = state === 'closed' ? false : true;
  expect(isOpen).to.equal(expectedState);
});

Then('the hit should be marked', async () => {
  const isSelected: boolean = await contentSearchPage.hitIsSelected(
    selectedHitIndex
  );
  expect(isSelected).to.equal(true);
});

Then('the hit should be visible', async () => {
  const isVisible: boolean = await contentSearchPage.hitIsVisible(
    selectedHitIndex
  );
  expect(isVisible).to.equal(true);
});

Then('the search query should be empty', async () => {
  const searchTerm = await contentSearchPage.searchTerm();
  expect(searchTerm).to.equals('');
});

async function search(term: string) {
  await page.openContentSearchDialog();
  await contentSearchPage.setSearchTerm(term);
}

async function selectHit(hit: string) {
  const selected = await hitStringToHitIndex(hit);
  const hits = await contentSearchPage.getHits();
  const first = hits[selected];
  await first.click();
  await page.waitForAnimation(1000);
  selectedHitIndex = selected;
}

async function hitStringToHitIndex(hit: string): Promise<number> {
  let index: number;
  if ('first' === hit) {
    index = 0;
  } else if ('second' === hit) {
    index = 1;
  } else if ('last' === hit) {
    const hits = await contentSearchPage.getHits();
    index = hits.length - 1;
  } else if ('fifth' === hit) {
    index = 4;
  } else if ('sixth' === hit) {
    index = 5;
  } else {
    try {
      index = parseInt(hit, 10);
    } catch (e) {
      throw new Error(`Unrecognized value "${hit}`);
    }
  }
  return index;
}

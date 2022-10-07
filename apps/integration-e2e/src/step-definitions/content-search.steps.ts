import { Given, Then, When } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let selectedHitIndex: number;

Given('the search dialog is open', async function (this: CustomWorld) {
  await this.viewerPage.openContentSearchDialog();
});

Given(
  'the user has search for the word {string}',
  async function (this: CustomWorld, term: string) {
    await this.contentSearchPage.search(term);
  }
);

Given(
  'the user has selected the {word} hit',
  async function (this: CustomWorld, hit: string) {
    selectedHitIndex = await this.contentSearchPage.selectHit(hit);
  }
);

When(
  'the user search for the word {string}',
  async function (this: CustomWorld, term: string) {
    await this.contentSearchPage.search(term);
  }
);

When(
  'the user selects the {word} hit',
  async function (this: CustomWorld, hit: string) {
    selectedHitIndex = await this.contentSearchPage.selectHit(hit);
  }
);

When(
  'the user select the {word} hit button',
  async function (this: CustomWorld, action: string) {
    let button!: Locator;
    if (action === 'previous') {
      button = await this.contentSearchPage.previousButton();
    } else if (action === 'next') {
      button = await this.contentSearchPage.nextButton();
    } else if (action === 'clear') {
      button = await this.contentSearchPage.clearButton();
    }
    await button.click();
    await this.utils.waitForAnimation();
  }
);

When('the user closes the search dialog', async function (this: CustomWorld) {
  const closeButton = await this.contentSearchPage.closeButton();
  await closeButton.click();
  await this.utils.waitForAnimation();
});

When('the user opens the search dialog', async function (this: CustomWorld) {
  await this.viewerPage.openContentSearchDialog();
});

When(
  'the user click the search inputs clear button',
  async function (this: CustomWorld) {
    const clearButton = await this.contentSearchPage.clearInputButton();
    await clearButton.click();
  }
);

Then(
  'there are {word} results found',
  async function (this: CustomWorld, numberOfHits: string) {
    const expected = numberOfHits === 'no' ? 0 : parseInt(numberOfHits, 10);
    const hits = await this.contentSearchPage.getNumberOfHits();
    expect(hits).toEqual(expected);
  }
);

Then(
  'the word {string} should be highlighted',
  async function (this: CustomWorld, term: string) {
    const firstHit = this.contentSearchPage.getHit(0);
    const hitText = await firstHit.locator('em').textContent();
    const word = hitText ? hitText : '';
    await expect(firstHit.locator('em')).toContainText(term);
  }
);

Then(
  'the page with hit number {word} should be displayed',
  async function (this: CustomWorld, hit: string) {
    const currentPageString =
      await this.viewerPage.getCurrentCanvasGroupLabel();

    if (hit === '1') {
      expect(currentPageString.includes('7')).toBeTruthy();
    } else if (hit === '3') {
      expect(currentPageString.includes('20')).toBeTruthy();
    } else if (hit === '5' || hit === '6') {
      expect(currentPageString.includes('38')).toBeTruthy();
    }
  }
);

Then(
  'hit number {int} should be highlighted',
  async function (this: CustomWorld, hit: number) {
    const hitIndex = hit - 1;
    expect(await this.contentSearchPage.isSelected(hitIndex)).toBeTruthy();
  }
);

Then('all highlighting should be removed', async function (this: CustomWorld) {
  const hits = await this.contentSearchPage.getHighlighted();
  expect(await hits.count()).toEqual(0);
});

Then(
  'the search result toolbar should be removed',
  async function (this: CustomWorld) {
    expect(
      await this.contentSearchPage.contentSearchNavigatorToolbar().isVisible()
    ).toEqual(false);
  }
);

Then(
  'the Search dialog should be {word}',
  async function (this: CustomWorld, state: string) {
    const isOpen = await this.contentSearchPage.isOpen();
    const expectedState = state === 'closed' ? false : true;
    expect(isOpen).toEqual(expectedState);
  }
);

Then('the hit should be marked', async function (this: CustomWorld) {
  const isSelected: boolean = await this.contentSearchPage.hitIsSelected(
    selectedHitIndex
  );
  expect(isSelected).toBeTruthy();
});

Then('the hit should be visible', async function (this: CustomWorld) {
  const isVisible: boolean = await this.contentSearchPage.hitIsVisible(
    selectedHitIndex
  );
  expect(isVisible).toBeTruthy();
});

Then('the search query should be empty', async function (this: CustomWorld) {
  const searchTerm = await this.contentSearchPage.searchTerm();

  expect(searchTerm).toEqual('');
});

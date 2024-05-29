import { Given, Then, When } from '@cucumber/cucumber';
import { Locator, expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let selectedHitIndex: number;

Given('the search dialog is open', async function (this: CustomWorld) {
  await this.viewerPage.openContentSearchDialog();
});

Given(
  'the user has search for the word {string}',
  async function (this: CustomWorld, term: string) {
    await this.contentSearchPage.search(term);
  },
);

Given(
  'the user has selected the {word} hit',
  async function (this: CustomWorld, hit: string) {
    selectedHitIndex = await this.contentSearchPage.selectHit(hit);
  },
);

When(
  'the user search for the word {string}',
  async function (this: CustomWorld, term: string) {
    await this.contentSearchPage.search(term);
    await expect(
      this.contentSearchPage.resultsFoundLabel.or(
        this.contentSearchPage.nothingFoundLabel,
      ),
    ).toBeVisible();
  },
);

When(
  'the user selects the {word} hit',
  async function (this: CustomWorld, hit: string) {
    selectedHitIndex = await this.contentSearchPage.selectHit(hit);
  },
);

When(
  'the user select the {word} hit button',
  async function (this: CustomWorld, action: string) {
    let button!: Locator;
    if (action === 'previous') {
      button = this.contentSearchPage.navigatePreviousHitButton;
    } else if (action === 'next') {
      button = this.contentSearchPage.navigateNextHitButton;
    } else if (action === 'clear') {
      button = this.contentSearchPage.navigateCloseHitsButton;
    }
    await button.click();
    await this.animations.waitFor();
  },
);

When('the user closes the search dialog', async function (this: CustomWorld) {
  await this.contentSearchPage.closeButton.click();
});

When('the user opens the search dialog', async function (this: CustomWorld) {
  await this.viewerPage.openContentSearchDialog();
});

When(
  'the user click the search inputs clear button',
  async function (this: CustomWorld) {
    await this.contentSearchPage.clearSearchButton.click();
    await this.animations.waitFor();
  },
);

Then(
  'there are {word} results found',
  async function (this: CustomWorld, numberOfHits: string) {
    const expected = numberOfHits === 'no' ? '0' : numberOfHits;
    await expect(this.contentSearchPage.numberOfHits).toHaveValue(expected);
  },
);

Then(
  'the word {string} should be highlighted',
  async function (this: CustomWorld, term: string) {
    const firstHit = this.contentSearchPage.hits.nth(0);
    await expect(firstHit.locator('em')).toContainText(term);
  },
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
  },
);

Then(
  'hit number {int} should be highlighted',
  async function (this: CustomWorld, hit: number) {
    const hitIndex = hit - 1;
    expect(await this.contentSearchPage.isSelected(hitIndex)).toBeTruthy();
  },
);

Then('all highlighting should be removed', async function (this: CustomWorld) {
  await expect(this.contentSearchPage.highlighted).toHaveCount(0);
});

Then(
  'the search result toolbar should be removed',
  async function (this: CustomWorld) {
    await expect(this.contentSearchPage.navigatorToolbar).toBeHidden();
  },
);

Then(
  'the Search dialog should be {word}',
  async function (this: CustomWorld, state: string) {
    state === 'closed'
      ? await expect(this.contentSearchPage.container).toBeHidden()
      : await expect(this.contentSearchPage.container).toBeVisible();
  },
);

Then('the hit should be marked', async function (this: CustomWorld) {
  const isSelected: boolean =
    await this.contentSearchPage.hitIsSelected(selectedHitIndex);
  expect(isSelected).toBeTruthy();
});

Then('the hit should be visible', async function (this: CustomWorld) {
  await expect(this.contentSearchPage.hits.nth(selectedHitIndex)).toBeVisible();
});

Then('the search query should be empty', async function (this: CustomWorld) {
  await expect(this.contentSearchPage.searchInput).toHaveValue('');
});

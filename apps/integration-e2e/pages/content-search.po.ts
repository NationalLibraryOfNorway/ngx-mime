import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
} from 'protractor';
import { protractor } from 'protractor/built';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {
  private contentSearchInputEl: ElementFinder;
  private closeContentSearchDialogButtonEl: ElementFinder;
  private numberOfHitsEl: ElementFinder;
  private mimeSearchEl: ElementFinder;
  private contentSearchNavigatorToolbarEl: ElementFinder;
  private clearSearchButtonEl: ElementFinder;
  private footerNavigateCloseHitsButtonEl: ElementFinder;
  private footerNavigatePreviousHitButtonEl: ElementFinder;
  private footerNavigateNextHitButtonEl: ElementFinder;
  private contentSearchContainerEl: ElementFinder;
  private contentSearchHitsEls: ElementArrayFinder;
  private highlightedEls: ElementArrayFinder;

  constructor() {
    this.contentSearchInputEl = element(by.css('input.content-search-input'));
    this.closeContentSearchDialogButtonEl = element(
      by.css('.close-content-search-dialog-button')
    );
    this.numberOfHitsEl = element(by.css('.numberOfHits'));
    this.mimeSearchEl = element(by.css('mime-search'));
    this.contentSearchNavigatorToolbarEl = element(
      by.css('.content-search-navigator-toolbar')
    );
    this.clearSearchButtonEl = element(by.css('.clearSearchButton'));
    this.footerNavigateCloseHitsButtonEl = element(
      by.css('#footerNavigateCloseHitsButton')
    );
    this.footerNavigatePreviousHitButtonEl = element(
      by.css('#footerNavigatePreviousHitButton')
    );
    this.footerNavigateNextHitButtonEl = element(
      by.css('#footerNavigateNextHitButton')
    );
    this.contentSearchContainerEl = element(
      by.css('.content-search-container')
    );
    this.contentSearchHitsEls = element.all(
      by.css('.content-search-container .hit')
    );
    this.highlightedEls = element.all(by.css('.openseadragon-canvas .hit'));
  }

  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    return this.mimeSearchEl.isPresent();
  }

  closeButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.closeContentSearchDialogButtonEl)
    );
  }

  async setSearchTerm(term: string): Promise<void> {
    const el = await this.contentSearchInput();
    await el.clear();
    await el.sendKeys(term);
    await el.sendKeys(protractor.Key.ENTER);
  }

  async searchTerm() {
    const el: ElementFinder = await this.contentSearchInput();
    return await el.getAttribute('value');
  }

  async getNumberOfHits() {
    await utils.waitForPresenceOf(this.numberOfHitsEl);
    const value = await this.numberOfHitsEl.getAttribute('value');
    return parseInt(value, 10);
  }

  getHits(): ElementArrayFinder {
    return this.contentSearchHitsEls;
  }

  getHit(index: number) {
    return this.getHits().get(index);
  }

  contentSearchNavigatorToolbar() {
    return this.contentSearchNavigatorToolbarEl;
  }

  async clearInputButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.clearSearchButtonEl)
    );
  }

  async clearButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.footerNavigateCloseHitsButtonEl)
    );
  }

  async previousButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.footerNavigatePreviousHitButtonEl)
    );
  }

  async nextButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.footerNavigateNextHitButtonEl)
    );
  }

  async isContentSearchDialogOpen() {
    return await utils.isElementVisible(this.contentSearchContainerEl);
  }

  async isContentSearchDialogClosed() {
    return await utils.isElementInvisible(this.contentSearchContainerEl);
  }

  async isSelected(index: number) {
    try {
      await utils.waitForElement(
        element(
          by.css(`.openseadragon-canvas .hit.selected[mimeHitIndex="${index}"]`)
        )
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async hitIsSelected(index: number) {
    const el: ElementFinder = this.getHit(index);
    const classes = await el.getAttribute('class');
    return classes.indexOf('mat-accent') !== -1;
  }

  async hitIsVisible(index: number): Promise<boolean> {
    const el = this.getHit(index);
    return await utils.isElementVisible(el);
  }

  async getHighlighted() {
    return this.highlightedEls;
  }

  private async contentSearchInput() {
    return utils.promisify(async () =>
      utils.waitForElement(this.contentSearchInputEl)
    );
  }
}

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
  private contentSearchHitsEls: ElementArrayFinder;

  constructor() {
    this.contentSearchInputEl = element(by.css('input.content-search-input'));
    this.closeContentSearchDialogButtonEl = element(
      by.css('.close-content-search-dialog-button')
    );
    this.numberOfHitsEl = element(by.css('.numberOfHits'));
    this.contentSearchHitsEls = element.all(
      by.css('.content-search-container .hit')
    );
  }

  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    const el: ElementFinder = element(by.css('mime-search'));
    return el.isPresent();
  }

  closeButton(): Promise<ElementFinder> {
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
    return parseInt(value, 8);
  }

  getHits(): ElementArrayFinder {
    return this.contentSearchHitsEls;
  }

  getHit(index: number) {
    return this.getHits().get(index);
  }

  contentSearchNavigatorToolbar() {
    return element(by.css('.content-search-navigator-toolbar'));
  }

  async clearInputButton() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('.clearSearchButton')))
    );
  }

  async clearButton() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('#footerNavigateCloseHitsButton')))
    );
  }

  async previousButton() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('#footerNavigatePreviousHitButton')))
    );
  }

  async nextButton() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('#footerNavigateNextHitButton')))
    );
  }

  async isContentSearchDialogOpen() {
    return await utils.isElementVisible(
      element(by.css('.content-search-container'))
    );
  }

  async isContentSearchDialogClosed() {
    return await utils.isElementInvisible(
      element(by.css('.content-search-container'))
    );
  }

  async isSelected(index: number) {
    return utils
      .waitForElement(
        element(
          by.css(
            `.openseadragon-canvas [mimeHitIndex="${index}"][.hit.selected]`
          )
        )
      )
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
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
    return element.all(by.css('.openseadragon-canvas .hit'));
  }

  private async contentSearchInput() {
    return utils.promisify(async () =>
      utils.waitForElement(this.contentSearchInputEl)
    );
  }
}

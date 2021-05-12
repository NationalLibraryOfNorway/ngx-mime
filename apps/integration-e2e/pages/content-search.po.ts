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
    return new Promise(async (resolve) => {
      await utils
        .waitForElement(this.closeContentSearchDialogButtonEl)
        .then(() => {
          resolve(this.closeContentSearchDialogButtonEl);
        });
    });
  }

  async setSearchTerm(term: string) {
    await this.contentSearchInput().then(async (el) => {
      await el.clear();
      await el.sendKeys(term);
      await el.sendKeys(protractor.Key.ENTER);
    });
  }

  contentSearchInput(): Promise<ElementFinder> {
    return new Promise(async (resolve) => {
      await utils
        .waitForElement(this.contentSearchInputEl)
        .then(() => {
          resolve(this.contentSearchInputEl);
        });
    });
  }

  async searchTerm(): Promise<string> {
    return this.contentSearchInput().then((el) => {
      return el.getText();
    });
  }

  async getNumberOfHits() {
    return utils.waitForPresenceOf(this.numberOfHitsEl).then(async (el) => {
      return el.getAttribute('value').then((value: string) => {
        return parseInt(value, 8);
      });
    });
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

  clearInputButton() {
    return utils.waitForElement(element(by.css('.clearSearchButton')));
  }

  clearButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigateCloseHitsButton'))
    );
  }

  previousButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigatePreviousHitButton'))
    );
  }

  nextButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigateNextHitButton'))
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
}

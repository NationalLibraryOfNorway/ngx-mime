import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {

  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    const el: ElementFinder = element(by.css('mime-search'));
    return el.isPresent();
  }

  closeButton(): Promise<ElementFinder> {
    return utils.waitForElement(element(by.css('#close-content-search-dialog-button')));
  }

  async setSearchTerm(term: string) {
    const el: ElementFinder = await utils.waitForElement(element(by.css('.content-search-input')));
    await el.clear();
    await utils.sendKeys(el, term)
    await el.sendKeys(protractor.Key.ENTER);
  }

  async getNumberOfHits() {
    await browser.sleep(1000);
    const el: ElementFinder = await utils.waitForElement(element(by.css('#numberOfHits')));
    const numberOfHits = await el.getAttribute('value');
    return parseInt(numberOfHits, 8);
  }

  async getHits(): Promise<any> {
    return element.all(by.css('.content-search-container .hit'));
  }

  async getHit(index: number): Promise<ElementFinder> {
    const els = await element.all(by.css('.content-search-container .hit'));
    const pagesArray = await els.map((page, i) => page);
    return pagesArray[index];
  }

  contentSearchNavigatorToolbar() {
    return element(by.css('#content-search-navigator-toolbar'));
  }

  clearButton() {
    return utils.waitForElement(element(by.css('#footerNavigateCloseHitsButton')));
  }

  previousButton() {
    return utils.waitForElement(element(by.css('#footerNavigatePreviousHitButton')));
  }

  nextButton() {
    return utils.waitForElement(element(by.css('#footerNavigateNextHitButton')));
  }

  async hitIsSelected(index: number) {
    const el = await this.getHit(index);
    const classes = await el.getAttribute('class');
    return classes.indexOf('mat-primary') !== -1;
  }

  async hitIsVisible(index: number): Promise<boolean> {
    const el = await this.getHit(index);
    return await utils.isElementVisible(el);
  }

  async getHighlighted() {
    return element.all(by.css('.openseadragon-canvas .hit'));
  }

}

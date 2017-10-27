import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {

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

  async getHits() {
    const el = element.all(by.css('.content-search-container .hit'));
    await utils.waitForElement(el.last());
    return el;
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

  async getSelected() {
    const el = element.all(by.css('.hit.selected'));
    return el;
  }

  async getHighlighted() {
    const el = element.all(by.css('.hit'));
    return el;
  }
}

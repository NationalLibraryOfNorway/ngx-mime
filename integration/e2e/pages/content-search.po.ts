import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {

  async setSearchTerm(term: string) {
    const el: ElementFinder = await utils.waitForElement(element(by.css('.search-input')));
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
    const hits = [];
    const el = element.all(by.css('.summary'));
    await utils.waitForElement(el.first());
    return el;
  }
}

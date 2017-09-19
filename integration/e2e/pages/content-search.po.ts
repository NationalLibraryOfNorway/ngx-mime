import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {

  async setSearchTerm(term: string) {
    const el = await utils.waitForElement(element(by.css('.search-input')));
    el.clear().sendKeys(term).sendKeys(protractor.Key.ENTER);
  }

  async getNumberOfHits() {
    const el = await utils.waitForElement(element(by.css('#numberOfHits')));
    return el.getText();
  }

  async getHits() {
    const hits = [];
    const el = element.all(by.css('.summary'));
    await utils.waitForElement(el.first());
    const count = await el.count();
    for (let i = 0; i < count; i++) {
      const hit = el.get(i);
      const summary = await hit.getText();
      hits.push(new Hit({
        summary: summary
      }));
    }
    return hits;
  }
}

export class Hit {
  public summary?: string;

  constructor(public fields?: {
    summary?: string;
  }) {
    if (fields) {
      this.summary = fields.summary || this.summary;
    }
  }
}

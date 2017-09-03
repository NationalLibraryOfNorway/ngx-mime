import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class MetadataPage {

  async getAll() {
    const metadatas = [];
    const el = element.all(by.css('.metadata'));
    await utils.waitForElement(el.first());
    const count = await el.count();
    for (let i = 0; i < count; i++) {
      const metadata = el.get(i);
      const title = await metadata.element(by.css('.title')).getText();
      const content = await metadata.element(by.css('.content')).getText();
      metadatas.push(new Metadata({
        title: title,
        content: content
      }));
    }
    return metadatas;
  }

  async getAttribution() {
    const el = element(by.css('#metadata-attribution'));
    await utils.waitForElement(el);
    return el;
  }

  async getLicense() {
    const el = element(by.css('#metadata-license'));
    await utils.waitForElement(el);
    return el;
  }
}

export class Metadata {
  public title?: string;
  public content?: string;

  constructor(public fields?: {
    title?: string;
    content?: string;
  }) {
    if (fields) {
      this.title = fields.title || this.title;
      this.content = fields.content || this.content;
    }
  }
}

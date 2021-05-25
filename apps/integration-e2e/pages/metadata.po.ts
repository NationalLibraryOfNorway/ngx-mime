import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();

export class Metadata {
  public title?: string;
  public content?: string;

  constructor(
    public fields?: {
      title?: string;
      content?: string;
    }
  ) {
    if (fields) {
      this.title = fields.title || this.title;
      this.content = fields.content || this.content;
    }
  }
}

export class MetadataPage {
  private metadataEls: ElementArrayFinder;
  private attributionEl: ElementFinder;
  private licenseEl: ElementFinder;
  private logoEl: ElementFinder;

  constructor() {
    this.metadataEls = element.all(by.css('.metadata'));
    this.attributionEl = element(by.css('.content.attribution'));
    this.licenseEl = element(by.css('.content.license'));
    this.logoEl = element(by.css('.content.logo'));
  }

  async getAll() {
    const metadatas = [];
    const el = this.metadataEls;
    await utils.waitForElement(el.first());
    const count = await el.count();
    for (let i = 0; i < count; i++) {
      const metadata = el.get(i);
      const title = await metadata.element(by.css('.title')).getText();
      const content = await metadata.element(by.css('.content')).getText();
      metadatas.push(
        new Metadata({
          title: title,
          content: content,
        })
      );
    }
    return metadatas;
  }

  async getAttribution() {
    return utils.promisify(async () =>
      utils.waitForElement(this.attributionEl)
    );
  }

  async getLicense() {
    return utils.promisify(async () => utils.waitForElement(this.licenseEl));
  }

  async isLogoDisplayed(): Promise<boolean> {
    try {
      await utils.waitForElement(this.logoEl);
      return true;
    } catch (e) {
      return false;
    }
  }
}

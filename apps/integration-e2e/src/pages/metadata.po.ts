import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class Metadata {
  public title?: string | null;
  public content?: string | null;

  constructor(
    public fields?: {
      title?: string | null;
      content?: string | null;
    }
  ) {
    if (fields) {
      this.title = fields.title || this.title;
      this.content = fields.content || this.content;
    }
  }
}

export class MetadataPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly metadataEls: Locator;
  readonly attributionEl: Locator;
  readonly licenseEl: Locator;
  readonly logoEl: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.metadataEls = page.locator('.metadata');
    this.attributionEl = page.locator('.content.attribution');
    this.licenseEl = page.locator('.content.license');
    this.logoEl = page.locator('.content.logo');
  }

  async getAll() {
    const metadatas = [];
    const el = this.metadataEls;
    const count = await el.count();
    for (let i = 0; i < count; i++) {
      const metadata = el.nth(i);
      const title = await metadata.locator('.title').textContent();
      const content = await metadata.locator('.content').textContent();
      metadatas.push(
        new Metadata({
          title: title,
          content: content,
        })
      );
    }
    return metadatas;
  }
/*
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
  */
}

import { Locator, Page } from 'playwright';

export class MetadataPage {
  readonly metadata: Locator;
  readonly attribution: Locator;
  readonly license: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.metadata = page.locator('.metadata');
    this.attribution = page.locator('.content.attribution');
    this.license = page.locator('.content.license');
    this.logo = page.locator('.content.logo');
  }
}

import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class MetadataPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly metadata: Locator;
  readonly attribution: Locator;
  readonly license: Locator;
  readonly logo: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.metadata = page.locator('.metadata');
    this.attribution = page.locator('.content.attribution');
    this.license = page.locator('.content.license');
    this.logo = page.locator('.content.logo');
  }
}

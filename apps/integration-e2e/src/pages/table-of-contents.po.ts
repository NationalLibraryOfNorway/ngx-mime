import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class TableOfContentsPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly tocLink: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.tocLink = page.locator('.toc-link');
  }
}

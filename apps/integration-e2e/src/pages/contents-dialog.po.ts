import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class ContentsDialogPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly container: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.container = page.locator('.contents-container');
  }
}

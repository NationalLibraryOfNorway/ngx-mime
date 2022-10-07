import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class ContentsDialogPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly contentsDialogContainer: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.contentsDialogContainer = page.locator('.contents-container');
  }

  async isOpen() {
    await this.contentsDialogContainer.waitFor();
    return this.contentsDialogContainer.isVisible();
  }

  async isClosed() {
    return this.contentsDialogContainer.isHidden();
  }
}

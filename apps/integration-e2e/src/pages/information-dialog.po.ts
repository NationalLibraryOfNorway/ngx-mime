import { Locator, Page } from 'playwright';

export class InformationDialogPage {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.locator('.information-container');
  }
}

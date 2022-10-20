import { Locator, Page } from 'playwright';

export class ContentsDialogPage {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.locator('.contents-container');
  }
}

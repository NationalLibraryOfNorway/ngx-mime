import { Locator, Page } from 'playwright';

export class HelpDialogPage {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.locator('mime-help');
  }
}

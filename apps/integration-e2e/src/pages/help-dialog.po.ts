import { Locator, Page } from 'playwright';
import { Utils } from '../helpers/utils';

export class HelpDialogPage {
  readonly utils: Utils;
  readonly container: Locator;

  constructor(page: Page) {
    this.utils = new Utils(page);
    this.container = page.locator('mime-help');
  }

  async isOpen() {
    await this.utils.waitForAnimation();
    return this.container.isVisible();
  }
}

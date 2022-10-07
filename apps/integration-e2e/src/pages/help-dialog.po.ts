import { Locator, Page } from 'playwright';
import { Utils } from '../helpers/utils';

export class HelpDialogPage {
  readonly utils: Utils;
  readonly mimeHelpEl: Locator;

  constructor(page: Page) {
    this.utils = new Utils(page);
    this.mimeHelpEl = page.locator('mime-help');
  }

  async isOpen() {
    await this.utils.waitForAnimation();
    return this.mimeHelpEl.isVisible();
  }
}

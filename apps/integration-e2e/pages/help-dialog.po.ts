import { browser, by, element, ElementFinder } from 'protractor';

export class HelpDialogPage {
  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    const el: ElementFinder = element(by.css('mime-help'));
    return el.isPresent();
  }
}

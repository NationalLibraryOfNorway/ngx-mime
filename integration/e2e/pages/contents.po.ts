import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentsPage {
  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    const el: ElementFinder = element(by.css('mime-contents'));
    return el.isPresent();
  }
}

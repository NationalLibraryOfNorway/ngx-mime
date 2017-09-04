import { protractor } from 'protractor/built';
import { Capabilities } from 'selenium-webdriver';
import { browser, element, by, ElementFinder, By } from 'protractor';

const EC = protractor.ExpectedConditions;
const TIMEOUT = 200;
export class Utils {

  public async waitForElement(el: ElementFinder) {
    let found = false;
    for (let i = 0; i < TIMEOUT; i++) {
      await browser.sleep(1);
      const isElementPresent = await browser.isElementPresent(el);
      if (isElementPresent) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw Error(el.locator());
    } else {
      return el;
    }
  }

  async clickElement(el: ElementFinder) {
    const browserName = await this.getBrowserName();
    switch (browserName) {
      case 'internet explorer':
        return el.sendKeys('\n');
      default:
        return el.click();
    }
  }

  async getBrowserName() {
    const cap: Capabilities = await browser.getCapabilities();
    return cap.get('browserName');
  }
}

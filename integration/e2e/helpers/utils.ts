import { browser, ElementFinder, protractor } from 'protractor/built';
import { Capabilities } from 'selenium-webdriver';

const EC = protractor.ExpectedConditions;
const TIMEOUT = 15000;
export class Utils {
  public waitForElement(el) {
    browser.wait(EC.presenceOf(el), TIMEOUT)
      .catch(function (err) {
        console.log(err);
        return null;
      });
    return el;
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

import { browser, ElementFinder, protractor } from 'protractor/built';
import { Capabilities } from 'selenium-webdriver';

const EC = protractor.ExpectedConditions;
const TIMEOUT = 60000;

export class Utils {
  static numbersAreClose(
    thing: number,
    realThing: number,
    epsilon: number
  ): boolean {
    return Math.abs(thing - realThing) <= epsilon;
  }

  public async waitForElement(el: ElementFinder): Promise<ElementFinder> {
    await browser.wait(EC.presenceOf(el), TIMEOUT, 'element not visible');
    return el;
  }

  public async waitForPresenceOf(el: ElementFinder) {
    await browser.wait(EC.presenceOf(el), 10000);
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

  async isElementVisible(element: ElementFinder) {
    return (await EC.visibilityOf(element)) ? true : false;
  }

  async isElementInvisible(element: ElementFinder) {
    return (await EC.invisibilityOf(element)) ? true : false;
  }
}

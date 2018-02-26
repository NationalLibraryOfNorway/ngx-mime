import { browser, ElementFinder, protractor } from 'protractor/built';
import { Capabilities } from 'selenium-webdriver';

const EC = protractor.ExpectedConditions;
const RETRY = 100;
export class Utils {
  static numbersAreClose(thing: number, realThing: number, epsilon: number): boolean {
    return Math.abs(thing - realThing) <= epsilon;
  }

  public async waitForElement(el: ElementFinder): Promise<ElementFinder> {
    let found = false;
    for (let i = 0; i < RETRY; i++) {
      await browser.sleep(10);
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

  async sendKeys(el: ElementFinder, txt: string) {
    for (let i = 0; i < txt.length; i++) {
      await el.sendKeys(txt[i]);
      await browser.sleep(100);
    }
  }

  async isElementVisible(element: ElementFinder) {
    return (await EC.visibilityOf(element)) ? true : false;
  }

  async isElementInvisible(element: ElementFinder) {
    return (await EC.invisibilityOf(element)) ? true : false;
  }
}

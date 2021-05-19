import { browser, ElementFinder, protractor } from 'protractor';
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

  public async waitForElement(el: ElementFinder): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await browser.wait(EC.visibilityOf(el), TIMEOUT, 'element not visible');
        resolve(el);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async waitForPresenceOf(el: ElementFinder): Promise<any> {
    return new Promise(async (resolve) => {
      await browser.wait(EC.presenceOf(el), 10000);
      resolve(el);
    });
  }

  public async isPresentAndDisplayed(el: ElementFinder): Promise<boolean> {
    const isPresent = await el.isPresent();
    if (!isPresent) {
      return false;
    } else {
      return await el.isDisplayed();
    }
  }

  async clickElement(el: ElementFinder): Promise<void> {
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
    return EC.visibilityOf(element) ? true : false;
  }

  async isElementInvisible(element: ElementFinder) {
    return EC.invisibilityOf(element) ? true : false;
  }

  promisify(callback: () => Promise<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await callback());
      } catch (e) {
        reject(e);
      }
    });
  }
}

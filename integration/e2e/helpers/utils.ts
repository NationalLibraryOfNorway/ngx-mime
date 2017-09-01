import { browser, protractor } from 'protractor/built';

const EC = protractor.ExpectedConditions;
const TIMEOUT = 15000;
export class Utils {
  public async waitForElement(el) {
    await browser.wait(EC.presenceOf(el), TIMEOUT)
      .catch(function (err) {
        console.log(err);
        return null;
      });
    return el;
  }
}

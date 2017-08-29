import { browser, protractor } from 'protractor/built';

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

  public waitForElementToBeClickable(el) {
    browser.wait(EC.elementToBeClickable(el), TIMEOUT)
      .catch(function (err) {
        console.log(err);
        return false;
      });
    return true;
  }
}

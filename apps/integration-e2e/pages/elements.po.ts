import { browser } from 'protractor';

export class ElementsPage {
  async open() {
    await browser.waitForAngularEnabled(false);
    await browser.get('index-elements.html');
  }
}

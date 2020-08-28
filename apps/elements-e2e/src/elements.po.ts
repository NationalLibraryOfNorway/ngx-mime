import { browser, by, element } from 'protractor';

export class ElementsPage {
  async navigateTo() {
    browser.waitForAngularEnabled(false);
    await browser.get('/');
  }

  getViewer() {
    return element(by.css('app-mime-viewer'));
  }
}

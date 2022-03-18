import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  async getHeadingText() {
    return element(by.css('h1.cdk-visually-hidden')).getAttribute(
      'textContent'
    );
  }
}

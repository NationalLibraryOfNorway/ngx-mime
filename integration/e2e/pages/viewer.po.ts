import { browser, element, by } from 'protractor';

export class ViewerPage {

  open() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getContent() {
    return element(by.css('h2'));
  }

}
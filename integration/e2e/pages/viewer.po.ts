import { browser, element, by } from 'protractor';

export class ViewerPage {

  open() {
    browser.get('/');
  }

  getTitle() {
    return element(by.css('h2'));
  }

}
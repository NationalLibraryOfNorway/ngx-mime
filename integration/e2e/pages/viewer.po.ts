import { browser, element, by } from 'protractor';

export class ViewerPage {

  open(manifestUri: string) {
    return browser.get(`?manifestUri=${manifestUri}`);
  }

  getHeadTitle() {
    return browser.getTitle();
  }

  getContent() {
    return element(by.css('h2'));
  }

}
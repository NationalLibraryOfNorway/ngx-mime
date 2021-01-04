import { browser } from 'protractor';
import { ViewerPage } from './viewer.po';

export class ElementsPage {
  static readonly DARK_THEME_CLASS = 'ngx-mime-dark-theme';

  async open(manifestName?: string) {
    let uri = 'index-elements.html';
    await browser.waitForAngularEnabled(false);

    if (manifestName) {
      uri += '?manifestUri=' + ViewerPage.bookShelf[manifestName];
    }

    await browser.get(uri);
  }

  async setDarkMode() {
    return browser.executeScript(
      `return document.body.classList.add("${ElementsPage.DARK_THEME_CLASS}");`
    );
  }

  async setLightMode() {
    return browser.executeScript(
      `return document.body.classList.remove("${ElementsPage.DARK_THEME_CLASS}");`
    );
  }
}

import { Page } from 'playwright';
import { ViewerPage } from './viewer.po';

export class ElementsPage {
  static readonly DARK_THEME_CLASS = 'ngx-mime-dark-theme';

  constructor(
    private page: Page,
    private viewerPage: ViewerPage,
  ) {
    this.page = page;
    this.viewerPage = viewerPage;
  }

  async open(manifestName?: string) {
    let uri = '/index-elements.html';

    if (manifestName) {
      uri += '?manifestUri=' + this.viewerPage.getBookShelfUrl(manifestName);
    }

    await this.page.goto(uri);
  }

  async setDarkMode() {
    await this.page.evaluate(
      `return document.body.classList.add("${ElementsPage.DARK_THEME_CLASS}");`,
    );
  }

  async setLightMode() {
    await this.page.evaluate(
      `return document.body.classList.remove("${ElementsPage.DARK_THEME_CLASS}");`,
    );
  }
}

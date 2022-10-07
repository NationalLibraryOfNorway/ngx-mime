import { Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';
import { ViewerPage } from './viewer.po';

export class ElementsPage {
  static readonly DARK_THEME_CLASS = 'ngx-mime-dark-theme';
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly viewerPage: ViewerPage;

  constructor(parameters: ParameterType, page: Page, viewerPage: ViewerPage) {
    this.page = page;
    this.parameters = parameters;
    this.viewerPage = viewerPage;
  }

  async open(manifestName?: string) {
    let uri = `${this.parameters.appUrl}/index-elements.html`;

    if (manifestName) {
      uri += '?manifestUri=' + this.viewerPage.getBookShelfUrl(manifestName);
    }

    await this.page.goto(uri);
  }

  async setDarkMode() {
    await this.page.evaluate(
      `return document.body.classList.add("${ElementsPage.DARK_THEME_CLASS}");`
    );
  }

  async setLightMode() {
    await this.page.evaluate(
      `return document.body.classList.remove("${ElementsPage.DARK_THEME_CLASS}");`
    );
  }
}

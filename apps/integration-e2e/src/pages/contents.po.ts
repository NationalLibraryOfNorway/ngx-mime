import { Locator, Page } from 'playwright';
import { Utils } from '../helpers/utils';
import { ParameterType } from '../support/ParameterType';
import { ViewerPage } from './viewer.po';

export class ContentsPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly viewerPage: ViewerPage;
  readonly dialog: Locator;
  readonly utils: Utils;

  constructor(parameters: ParameterType, page: Page, viewerPage: ViewerPage) {
    this.page = page;
    this.parameters = parameters;
    this.viewerPage = viewerPage;
    this.utils = new Utils(this.page);
    this.dialog = page.locator('mime-contents');
  }

  async isOpen(): Promise<boolean> {
    await this.utils.waitForAnimation();
    return this.dialog.isVisible();
  }
}

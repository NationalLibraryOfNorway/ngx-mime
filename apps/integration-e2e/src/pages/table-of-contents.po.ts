import { Locator, Page } from 'playwright';

export class TableOfContentsPage {
  readonly tocLink: Locator;

  constructor(page: Page) {
    this.tocLink = page.locator('.toc-link');
  }
}

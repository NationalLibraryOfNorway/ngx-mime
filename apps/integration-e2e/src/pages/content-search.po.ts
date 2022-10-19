import { Locator, Page } from 'playwright';
import { Utils } from '../helpers/utils';
import { ViewerPage } from './viewer.po';

export class ContentSearchPage {
  readonly utils: Utils;
  readonly viewerPage!: ViewerPage;
  readonly contentSearchInputEl: Locator;
  readonly closeContentSearchDialogButtonEl: Locator;
  readonly numberOfHitsEl: Locator;
  readonly mimeSearchEl: Locator;
  readonly contentSearchNavigatorToolbarEl: Locator;
  readonly clearSearchButtonEl: Locator;
  readonly footerNavigateCloseHitsButtonEl: Locator;
  readonly footerNavigatePreviousHitButtonEl: Locator;
  readonly footerNavigateNextHitButtonEl: Locator;
  readonly contentSearchContainerEl: Locator;
  readonly contentSearchHitsEls: Locator;
  readonly highlightedEls: Locator;

  constructor(private page: Page, viewerPage: ViewerPage) {
    this.viewerPage = viewerPage;
    this.utils = new Utils(this.page);

    this.contentSearchInputEl = page.locator('input.content-search-input');
    this.closeContentSearchDialogButtonEl = page.locator(
      '.close-content-search-dialog-button'
    );
    this.numberOfHitsEl = page.locator('.numberOfHits');
    this.mimeSearchEl = page.locator('mime-search');
    this.contentSearchNavigatorToolbarEl = page.locator(
      '.content-search-navigator-toolbar'
    );
    this.clearSearchButtonEl = page.locator('.clearSearchButton');
    this.footerNavigateCloseHitsButtonEl = page.locator(
      '#footerNavigateCloseHitsButton'
    );
    this.footerNavigatePreviousHitButtonEl = page.locator(
      '#footerNavigatePreviousHitButton'
    );
    this.footerNavigateNextHitButtonEl = page.locator(
      '#footerNavigateNextHitButton'
    );
    this.contentSearchContainerEl = page.locator('.content-search-container');
    this.contentSearchHitsEls = page.locator('.content-search-container .hit');
    this.highlightedEls = page.locator('.openseadragon-canvas .hit');
  }

  async isOpen() {
    return this.mimeSearchEl.isVisible();
  }

  async closeButton(): Promise<Locator> {
    return this.closeContentSearchDialogButtonEl;
  }

  async setSearchTerm(term: string): Promise<void> {
    const el = await this.contentSearchInput();
    await el.fill(term);
    await el.press('Enter');
  }

  async searchTerm() {
    const el: Locator = await this.contentSearchInput();
    return await el.inputValue();
  }

  async getNumberOfHits() {
    const value = await this.numberOfHitsEl.inputValue();
    return value ? parseInt(value, 10) : -1;
  }

  getHits(): Locator {
    return this.contentSearchHitsEls;
  }

  getHit(index: number) {
    return this.getHits().nth(index);
  }

  contentSearchNavigatorToolbar() {
    return this.contentSearchNavigatorToolbarEl;
  }

  clearInputButton() {
    return this.clearSearchButtonEl;
  }

  clearButton() {
    return this.footerNavigateCloseHitsButtonEl;
  }

  previousButton() {
    return this.footerNavigatePreviousHitButtonEl;
  }

  nextButton() {
    return this.footerNavigateNextHitButtonEl;
  }

  async isContentSearchDialogOpen() {
    return this.contentSearchContainerEl.isVisible();
  }

  async isContentSearchDialogClosed() {
    return this.contentSearchContainerEl.isHidden();
  }

  async isSelected(index: number) {
    try {
      await this.page
        .locator(`.openseadragon-canvas .hit.selected[mimeHitIndex="${index}"]`)
        .waitFor();
      return true;
    } catch (e) {
      return false;
    }
  }

  async hitIsSelected(index: number): Promise<boolean> {
    const el: Locator = this.getHit(index);
    const classes = await el.getAttribute('class');
    return classes ? classes.indexOf('mat-accent') !== -1 : false;
  }

  async hitIsVisible(index: number): Promise<boolean> {
    const el = this.getHit(index);
    return await el.isVisible();
  }

  async getHighlighted() {
    return this.highlightedEls;
  }

  private async contentSearchInput(): Promise<Locator> {
    return this.contentSearchInputEl;
  }

  async search(term: string) {
    await this.viewerPage.openContentSearchDialog();
    await this.setSearchTerm(term);
  }

  async selectHit(hit: string): Promise<number> {
    const selected = await this.hitStringToHitIndex(hit);
    const hits = this.getHits();
    const first = hits.nth(selected);
    await first.click();
    await this.utils.waitForAnimation(1000);
    return selected;
  }

  async hitStringToHitIndex(hit: string): Promise<number> {
    let index: number;
    if ('first' === hit) {
      index = 0;
    } else if ('second' === hit) {
      index = 1;
    } else if ('last' === hit) {
      const hits = this.getHits();
      index = (await hits.count()) - 1;
    } else if ('fifth' === hit) {
      index = 4;
    } else if ('sixth' === hit) {
      index = 5;
    } else {
      try {
        index = parseInt(hit, 10);
      } catch (e) {
        throw new Error(`Unrecognized value "${hit}`);
      }
    }
    return index;
  }
}

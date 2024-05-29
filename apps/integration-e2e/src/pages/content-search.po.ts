import { Locator, Page } from 'playwright';
import { Animations } from '../helpers/animations';
import { ViewerPage } from './viewer.po';

export class ContentSearchPage {
  readonly searchInput: Locator;
  readonly closeButton: Locator;
  readonly numberOfHits: Locator;
  readonly contentSearchDialog: Locator;
  readonly navigatorToolbar: Locator;
  readonly clearSearchButton: Locator;
  readonly navigateCloseHitsButton: Locator;
  readonly navigatePreviousHitButton: Locator;
  readonly navigateNextHitButton: Locator;
  readonly container: Locator;
  readonly hits: Locator;
  readonly highlighted: Locator;
  readonly resultsFoundLabel: Locator;
  readonly nothingFoundLabel: Locator;


  constructor(
    private page: Page,
    private viewerPage: ViewerPage,
    private animations: Animations
  ) {
    this.searchInput = page.locator('input.content-search-input');
    this.closeButton = page.locator('.close-content-search-dialog-button');
    this.numberOfHits = page.locator('.numberOfHits');
    this.contentSearchDialog = page.locator('mime-search');
    this.navigatorToolbar = page.locator('.content-search-navigator-toolbar');
    this.clearSearchButton = page.locator('.clearSearchButton');
    this.navigateCloseHitsButton = page.getByTestId(
      'footerNavigateCloseHitsButton'
    );
    this.navigatePreviousHitButton = page.getByTestId(
      'footerNavigatePreviousHitButton'
    );
    this.navigateNextHitButton = page.getByTestId(
      'footerNavigateNextHitButton'
    );
    this.container = page.locator('.content-search-container');
    this.hits = page.locator('.content-search-container .hit');
    this.highlighted = page.locator('.openseadragon-canvas .hit');
    this.resultsFoundLabel = page.getByTestId('resultsFoundLabel');
    this.nothingFoundLabel = page.getByTestId('nothingFoundLabel');
  }

  async setSearchTerm(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
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
    const el: Locator = this.hits.nth(index);
    const classes = await el.getAttribute('class');
    return classes ? classes.indexOf('mat-accent') !== -1 : false;
  }

  async search(term: string) {
    await this.viewerPage.openContentSearchDialog();
    await this.setSearchTerm(term);
  }

  async selectHit(hit: string): Promise<number> {
    const selected = await this.hitStringToHitIndex(hit);
    await this.hits.nth(selected).click();
    await this.animations.waitFor(1000);
    return selected;
  }

  private async hitStringToHitIndex(hit: string): Promise<number> {
    let index: number;
    if ('first' === hit) {
      index = 0;
    } else if ('second' === hit) {
      index = 1;
    } else if ('last' === hit) {
      index = (await this.hits.count()) - 1;
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

import { protractor } from 'protractor/built';
import { browser, element, ElementFinder, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentSearchPage {
  async isOpen() {
    // Wait for dialog animation
    await browser.sleep(1000);
    const el: ElementFinder = element(by.css('mime-search'));
    return el.isPresent();
  }

  closeButton(): Promise<ElementFinder> {
    return utils.waitForElement(
      element(by.css('#close-content-search-dialog-button'))
    );
  }

  async setSearchTerm(term: string) {
    const el: ElementFinder = await utils.waitForElement(
      element(by.css('.content-search-input'))
    );
    await el.clear();
    await el.sendKeys(term);
    await el.sendKeys(protractor.Key.ENTER);
  }

  async searchTerm(): Promise<string> {
    const el = await utils.waitForElement(
      element(by.css('.content-search-input'))
    );
    return el.getText();
  }

  async getNumberOfHits() {
    const el: ElementFinder = await utils.waitForPresenceOf(
      element(by.css('#numberOfHits'))
    );
    const numberOfHits = await el.getAttribute('value');
    return parseInt(numberOfHits, 8);
  }

  async getHits(): Promise<any> {
    return element.all(by.css('.content-search-container .hit'));
  }

  async getHit(index: number): Promise<ElementFinder> {
    const canvasGroupIndexes = await element.all(
      by.css('.content-search-container .hit')
    );
    return canvasGroupIndexes[index];
  }

  contentSearchNavigatorToolbar() {
    return element(by.css('#content-search-navigator-toolbar'));
  }

  clearInputButton() {
    return utils.waitForElement(element(by.id('clearSearchButton')));
  }

  clearButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigateCloseHitsButton'))
    );
  }

  previousButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigatePreviousHitButton'))
    );
  }

  nextButton() {
    return utils.waitForElement(
      element(by.css('#footerNavigateNextHitButton'))
    );
  }

  async isContentSearchDialogOpen() {
    return await utils.isElementVisible(
      element(by.css('.content-search-container'))
    );
  }

  async isContentSearchDialogClosed() {
    return await utils.isElementInvisible(
      element(by.css('.content-search-container'))
    );
  }

  async isSelected(index: number) {
    try {
      await utils.waitForElement(
        element(
          by.css(
            `.openseadragon-canvas [mimeHitIndex="${index}"][.hit.selected]`
          )
        )
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async hitIsSelected(index: number) {
    const el: ElementFinder = await this.getHit(index);
    const classes = await el.getAttribute('class');
    return classes.indexOf('mat-accent') !== -1;
  }

  async hitIsVisible(index: number): Promise<boolean> {
    const el = await this.getHit(index);
    return await utils.isElementVisible(el);
  }

  async getHighlighted() {
    return element.all(by.css('.openseadragon-canvas .hit'));
  }
}

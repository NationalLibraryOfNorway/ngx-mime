import { browser, element, ElementFinder, by, By, protractor, ElementArrayFinder } from 'protractor';
import { promise, WebElement } from 'selenium-webdriver';
import { isUndefined } from 'util';
import { Utils } from '../helpers/utils';


const bookShelf = {
  'a-ltr-book': 'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest',
  'a-ltr-10-pages-book': 'http://localhost:4040/catalog/v1/iiif/a-ltr-10-pages-book/manifest',
  'a-individuals-manifest': 'http://localhost:4040/catalog/v1/iiif/a-individuals-manifest/manifest',
};

const utils = new Utils();
export class ViewerPage {
  private thumbStartPosition = { x: 600, y: 300 };
  private pointerPosition1 = { x: 650, y: 275 };
  private pointerPosition2 = { x: 750, y: 200 };

  async open(manifestName?: string) {
    let uri = '/';
    if (manifestName) {
      uri += '?manifestUri=' + bookShelf[manifestName];
    }
    await browser.get(uri);
    await browser.sleep(1000);
  }
  async goToPage(pageNumber: number) {
    const isPageMode = this.isPageMode();
    const isDashboardMode = this.isDashboardMode();
    if (await isPageMode) {
      await this.navigateToPage(pageNumber);
    } else if (await isDashboardMode) {
      await this.slideToPage(pageNumber);
    }
  }

  async slideToPage(pageNumber: number) {
    const slider = await utils.waitForElement(element(by.css('#navigationSlider')));
    const isTwoPageView = this.isTwoPageView();
    if (await isTwoPageView && pageNumber > 1) {
      pageNumber = Math.floor(pageNumber / 2);
    }
    for (let i = 0; i < pageNumber; i++) {
      await slider.sendKeys(protractor.Key.ARROW_RIGHT);
    }
    await this.waitForAnimation();
  }

  async navigateToPage(pageNumber: number) {
    const isTwoPageView = this.isTwoPageView();
    if (await isTwoPageView && pageNumber > 1) {
      pageNumber = Math.floor(pageNumber / 2);
    }
    for (let i = 0; i < pageNumber; i++) {
      await this.clickNextButton();
    }
    await this.waitForAnimation();
  }

  async getCurrentPageString() {
    // The footer might be hidden, but the pagenumber is still updated, so use
    // waitForPresenceOf insted of waitForElement.
    const el = await utils.waitForPresenceOf(element(by.css('#currentPageNumber')));
    // Not using el.getText() as it don't seem to work when element is not visible
    const currentPageNumber = await el.getAttribute('textContent');
    // return parseInt(currentPageNumber, 10);
    return currentPageNumber;
  }

  async openContentsDialog() {
    await element(by.css('#contentsDialogButton')).click();
    await utils.waitForElement(element(by.css('.contents-container')));
  }

  async openTableOfContentsTab() {
    await element.all(by.css('.mat-tab-label')).get(1).click();
    await utils.waitForElement(element(by.css('.toc-container')));
  }

  async openContentSearchDialog() {
    await element(by.css('#contentSearchDialogButton')).click();
    await utils.waitForElement(element(by.css('.content-search-container')));
  }

  fullscreenButton(): ElementFinder {
    return element(by.css('#fullscreenButton'));
  }

  exitFullscreenButton(): ElementFinder {
    return element(by.css('#exitFullscreenButton'));
  }

  openSeadragonElement() {
    const el = element(by.css('.openseadragon-container'));
    return utils.waitForElement(el);
  }

  getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    return utils.waitForElement(el);
  }

  isFullscreen(): promise.Promise<boolean> {
    return browser.executeScript('return (document.fullscreenElement'
      + ' || document.mozFullScreenElement'
      + ' || document.webkitFullscreenElement'
      + ' || document.msFullscreenElement) != null');
  }

  getHeader() {
    const el = element(by.css('mime-viewer-header'));
    return utils.waitForElement(el);
  }

  getFooter() {
    const el = element(by.css('mime-viewer-footer'));
    return utils.waitForElement(el);
  }

  getSVGElement() {
    const el = element(by.css('#openseadragon svg'));
    return utils.waitForElement(el);
  }

  getFirstPageInFirstGroupOverlay() {
    const el = element(by.css('#openseadragon svg g.page-group:first-child rect:first-child'));
    return utils.waitForElement(el);
  }

  getSecondPageInFirstGroupOverlay() {
    const el = element(by.css('#openseadragon svg g.page-group:nth-child(2)')).element(by.css('rect:first-child'));
    return utils.waitForElement(el);
  }

  getAllPageOverlays() {
    const el = element.all(by.css('#openseadragon svg g.page-group rect'));
    return el;
  }

  getLeftPageMask() {
    const el = element(by.css('#openseadragon svg g#page-mask rect:first-child'));
    return utils.waitForElement(el);
  }

  getRightPageMask() {
    const el = element(by.css('#openseadragon svg g#page-mask rect:nth-child(2)'));
    return utils.waitForElement(el);
  }

  getFirstPageOverlay() {
    const el = element.all(by.css('#openseadragon svg g rect')).first();
    return utils.waitForElement(el);
  }

  async getOnePageButton() {
    const el = element(by.css('#toggleSinglePageViewButton'));
    if (await el.isPresent() && el.isDisplayed()) {
      return el;
    } else {
      return false;
    }
  }

  async getTwoPageButton() {
    const el = element(by.css('#toggleTwoPageViewButton'));
    if (await el.isPresent() && el.isDisplayed()) {
      return el;
    } else {
      return false;
    }
  }

  getAnimationTime(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.animationTime;');
  }

  getZoomLevel(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getZoom(true);');
  }

  getMinZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getMinZoom();');
  }

  getMaxZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getMaxZoom();');
  }

  getCenter(): promise.Promise<Point> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getCenter(false);');
  }

  async swipe(startPoint: Point, endPoint: Point): Promise<void> {
    await browser.touchActions()
      .tapAndHold(startPoint)
      .release(endPoint)
      .perform();
  }

  async pinchOut(): Promise<void> {
    await browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition1)
      .move(this.pointerPosition2)
      .perform();
  }

  async pinchIn(): Promise<void> {
    await browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition2)
      .move(this.pointerPosition1)
      .perform();
  }

  pan(point: Point): promise.Promise<any> {
    return browser.executeScript(`window.openSeadragonViewer.viewport.panTo({x: ${point.x}, y: ${point.y}});`);
  }

  async zoomIn(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) * 2;
    await browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
  }

  async zoomOut(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) / 2;
    await browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
  }

  async dblClick(): Promise<void> {
    await browser.findElement(By.css('.openseadragon-canvas > canvas')).then((canvas: WebElement) => {
      return browser.actions()
        .click(canvas)
        .click(canvas)
        .perform();
    });
  }

  async dblTap(): Promise<void> {
    await browser.findElement(By.css('.openseadragon-canvas > canvas')).then((canvas: WebElement) => {
      return browser.touchActions()
        .tap(canvas)
        .tap(canvas)
        .perform();
    });
  }

  async clickZoomInButton(): Promise<void> {
    await this.clickNavigationButton('zoomInButton');
  }

  async clickZoomOutButton(): Promise<void> {
    await this.clickNavigationButton('zoomOutButton');
  }

  async clickZoomHomeButton(): Promise<void> {
    await this.clickNavigationButton('homeButton');
  }

  async clickNextButton(): Promise<void> {
    await this.clickDisableableNavigationButton('navigateNextButton');
    await this.waitForAnimation(500);
  }

  async clickPreviousButton(): Promise<void> {
    await this.clickDisableableNavigationButton('navigateBeforeButton');
    await this.waitForAnimation(500);
  }

  async clickNavigationButton(buttonId: string): Promise<void> {
    const button = await utils.waitForElement(element(by.id(buttonId)));
    await utils.clickElement(button);
  }

  async clickDisableableNavigationButton(buttonId: string): Promise<void> {
    const button: ElementFinder = await utils.waitForElement(element(by.id(buttonId)));
    if (await button.isEnabled()) {
      await utils.clickElement(button);
    }
  }

  async waitForAnimation(animationTime?: number): Promise<void> {
    if (isUndefined(animationTime)) {
      animationTime = await this.getAnimationTime() * 1000;
    }
    await browser.sleep(animationTime);
  }

  async isDashboardMode(): Promise<boolean> {
    const header = await this.getHeader();
    const footer = await this.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisPresent = (await headerDisplay) === 'block';
    const footerisPresent = (await footerDisplay) === 'block';
    return (headerisPresent && headerisPresent);
  }

  async isPageMode(): Promise<boolean> {
    const header = await this.getHeader();
    const footer = await this.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisHidden = (await headerDisplay) === 'none';
    const footerisHidden = (await footerDisplay) === 'none';
    return (headerisHidden && footerisHidden);
  }

  async isTwoPageView(): Promise<boolean> {
    const btn = await this.getOnePageButton();
    return (btn) ? true : false;
  }

  async isOnePageView(): Promise<boolean> {
    const btn = await this.getTwoPageButton();
    return (btn) ? true : false;
  }

  async isCurrentPageFittedViewport(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstPageOverlay();

    const svgParentDimensions = await svgParent.getSize();
    const overlayDimensions = await overlay.getSize();

    const widthIsFitted = Utils.numbersAreClose(svgParentDimensions.width, overlayDimensions.width, 5);
    const heightIsFitted = Utils.numbersAreClose(svgParentDimensions.height, overlayDimensions.height, 5);

    return widthIsFitted || heightIsFitted;
  }

  async isVerticallyCentered(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstPageOverlay();

    const svgParentDimensions = await svgParent.getSize();
    const overlayDimensions = await overlay.getSize();

    return Math.round(svgParentDimensions.height) === Math.round(overlayDimensions.height);
  }

  async visiblePages(): Promise<Boolean[]> {
    const pages = await this.getAllPageOverlays();

    const [leftPageMask, rightPageMask] = await Promise.all([this.getLeftPageMask(), this.getRightPageMask()]);


    const [leftPageMaskSize, leftPageMaskLoc, rightPageMaskSize, rightPageMaskLoc] =
      await Promise.all([leftPageMask.getSize(), leftPageMask.getLocation(), rightPageMask.getSize(), rightPageMask.getLocation()]);

    const pagesArray = await pages.map((page, i) => page);
    const result = [];

    for  (let i = 0; i < pagesArray.length; i++) {
      console.log('index', i);
      const page = pagesArray[i];
      const isVisible = await this.isElementVisibleInReadersViewport(
        page,
        { size: leftPageMaskSize, location: leftPageMaskLoc },
        { size: rightPageMaskSize, location: rightPageMaskLoc }
      );
      result.push(isVisible);
    }
    return result;
  }

  /**
   * Check if any part of an element is visible in the readers viewport.
   * Note that the test will not confirm that the whole element is inside the viewport.
   *
   * @param element
   * @param leftPageMask
   * @param rightPageMask
   */
  async isElementVisibleInReadersViewport(
    element: any,
    leftPageMask: { size: any, location: any },
    rightPageMask: { size: any, location: any }): Promise<boolean> {

      let lastEvent: string;
      try {
        lastEvent = 'getSize()';
        const elementSize = await element.getSize();
        lastEvent = 'getLocation()';
        const elementLocation = await element.getLocation();
        lastEvent = 'elementCalculatedLocastion';
        const elementCalculatedLocastion = {
          left: elementLocation.x,
          right: elementLocation.x + elementSize.width,
        }
        lastEvent = 'return';
        return (
            elementCalculatedLocastion.right >= leftPageMask.size.width &&
            elementCalculatedLocastion.left <= rightPageMask.location.x
          );
      } catch (e) {
        console.log(`Ooups, this should not happen. Last event is ${lastEvent}`, e);
      }
      return false;
  }

}


export interface Point {
  x: number;
  y: number;
}

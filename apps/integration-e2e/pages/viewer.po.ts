import {
  browser,
  by,
  By,
  element,
  ElementFinder,
  protractor
} from 'protractor';
import { Key, promise, WebElement } from 'selenium-webdriver';
import { Utils } from '../helpers/utils';

const utils = new Utils();
const thumbStartPosition = <any>{ x: 600, y: 300 };
const pointerPosition1 = <any>{ x: 650, y: 275 };
const pointerPosition2 = <any>{ x: 750, y: 200 };
export class ViewerPage {
  public static readonly bookShelf = {
    'a-ltr-book': 'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest',
    'a-rtl-book': 'http://localhost:4040/catalog/v1/iiif/a-rtl-book/manifest',
    'a-ltr-10-pages-book':
      'http://localhost:4040/catalog/v1/iiif/a-ltr-10-pages-book/manifest',
    'a-rtl-10-pages-book':
      'http://localhost:4040/catalog/v1/iiif/a-rtl-10-pages-book/manifest',
    'a-individuals-manifest':
      'http://localhost:4040/catalog/v1/iiif/a-individuals-manifest/manifest',
    'a-non-attribution-manifest':
      'http://localhost:4040/catalog/v1/iiif/a-non-attribution-manifest/manifest',
  };

  private isElements = false;

  async setDashboardMode(): Promise<void> {
    const isDashboardMode = await this.isDashboardMode();

    if (!isDashboardMode) {
      const overlay = await this.getSVGElement();
      await overlay.click();
      await this.waitForAnimation(1000);
    }
  }

  async setPageMode(): Promise<void> {
    const isPageMode = await this.isPageMode();

    if (!isPageMode) {
      const overlay = await this.getSVGElement();
      await utils.clickElement(overlay);
      await this.waitForAnimation(1000);
    }
  }

  async setOnePageView() {
    const btn = await this.getOnePageButton();
    // Button is present, so switch to one-page
    if (btn) {
      await btn.click();
      await this.waitForAnimation();
    }
  }

  async setTwoPageView() {
    const btn = await this.getTwoPageButton();
    // Button is present, so click to switch to two-page
    if (btn) {
      await btn.click();
      await this.waitForAnimation();
    }
  }

  setTestCustomElements(isElements: boolean) {
    this.isElements = isElements;
  }

  async open(manifestName?: string) {
    let uri = this.isElements ? '/viewer/elements' : '/viewer/components';
    if (manifestName) {
      uri += '?manifestUri=' + ViewerPage.bookShelf[manifestName];
    }

    await browser.get(uri);
    await this.setFocusOnViewer();
    await this.waitForAnimation();
  }

  async goToCanvasGroup(canvasGroupIndex: number) {
    const isPageMode = await this.isPageMode();
    const isDashboardMode = this.isDashboardMode();
    if (isPageMode) {
      await this.navigateToCanvasGroup(canvasGroupIndex);
    } else if (await isDashboardMode) {
      await this.slideToCanvasGroup(canvasGroupIndex);
    }
  }

  async slideToCanvasGroup(canvasGroupIndex: number) {
    const slider = await utils.waitForElement(
      element(by.css('.navigation-slider'))
    );
    const isTwoPageView = this.isTwoPageView();
    if ((await isTwoPageView) && canvasGroupIndex > 1) {
      canvasGroupIndex = Math.floor(canvasGroupIndex / 2);
    }
    for (let i = 0; i < canvasGroupIndex; i++) {
      await slider.sendKeys(protractor.Key.ARROW_RIGHT);
      await this.waitForAnimation();
    }
  }

  async goToCanvasGroupWithDialog(canvasGroupIndex: number) {
    const goToCanvasGroupButton = await utils.waitForElement(
      element(by.css('button.canvasGroups'))
    );
    await goToCanvasGroupButton.click();
    const isTwoPageView = this.isTwoPageView();
    const input = await utils.waitForElement(
      element(by.css('.go-to-canvas-group-input'))
    );
    await input.sendKeys(canvasGroupIndex);
    await input.sendKeys(protractor.Key.ENTER);
    await this.waitForAnimation();
  }

  async navigateToCanvasGroup(canvasGroupIndex: number) {
    const isTwoPageView = this.isTwoPageView();
    if ((await isTwoPageView) && canvasGroupIndex > 1) {
      canvasGroupIndex = Math.floor(canvasGroupIndex / 2);
    }
    for (let i = 0; i < canvasGroupIndex; i++) {
      await this.clickNextButton();
    }
    await this.waitForAnimation();
  }

  async getCurrentCanvasGroupLabel() {
    // The footer might be hidden, but the pagenumber is still updated, so use
    // waitForPresenceOf insted of waitForElement.
    const el = await utils.waitForPresenceOf(
      element(by.css('#currentCanvasGroupLabel'))
    );
    // Not using el.getText() as it don't seem to work when element is not visible
    const currentCanvasGroupLabel = await el.getAttribute('textContent');
    // return parseInt(currentPageNumber, 10);
    return currentCanvasGroupLabel;
  }

  async getNumberOfCanvasGroups() {
    // The footer might be hidden, but the pagenumber is still updated, so use
    // waitForPresenceOf insted of waitForElement.
    const el = await utils.waitForPresenceOf(
      element(by.css('#numOfCanvasGroups'))
    );
    // Not using el.getText() as it don't seem to work when element is not visible
    const numberOfCanvasGroups = await el.getAttribute('textContent');
    return parseInt(numberOfCanvasGroups, 10);
  }

  async openContentsDialog() {
    await element(by.css('#ngx-mimeContentsDialogButton')).click();
    await utils.waitForElement(element(by.css('.contents-container')));
    await browser.sleep(2000);
  }

  async openHelpDialog() {
    await element(by.css('#ngx-mimeHelpDialogButton')).click();
    await utils.waitForElement(element(by.css('.help-container')));
    await browser.sleep(2000);
  }

  async openTableOfContentsTab() {
    await element.all(by.css('.mat-tab-label')).get(1).click();
    await utils.waitForElement(element(by.css('.ngx-mime-toc-container')));
    await this.waitForAnimation();
  }

  async openContentSearchDialog() {
    const ngxmimeContentSearchDialogButton: ElementFinder = await utils.waitForElement(
      element(by.css('#ngx-mimeContentSearchDialogButton'))
    );
    await ngxmimeContentSearchDialogButton.click();
    await utils.waitForElement(
      element(by.css('.content-search-box button[type="submit"]'))
    );
    await this.waitForAnimation();
  }

  async fullscreenButton(): Promise<ElementFinder> {
    const ngxmimeFullscreenButton: ElementFinder = await utils.waitForElement(
      element(by.css('#ngx-mimeFullscreenButton'))
    );
    return ngxmimeFullscreenButton;
  }

  openSeadragonElement() {
    const el = element(by.css('.openseadragon-container'));
    return utils.waitForElement(el);
  }

  getAttribution() {
    const el = element(by.css('.attribution-container > .mat-dialog-content'));
    return utils.waitForElement(el);
  }

  async isFullscreen() {
    await browser.sleep(2000);
    const isFullscreen = await browser.executeScript(
      'return (document.fullscreenElement' +
        ' || document.mozFullScreenElement' +
        ' || document.webkitFullscreenElement' +
        ' || document.msFullscreenElement) != null'
    );
    return isFullscreen;
  }

  async getHeader() {
    const el = element(by.css('mime-viewer-header'));
    return utils.waitForPresenceOf(el);
  }

  async getFooter() {
    const el = element(by.css('mime-viewer-footer'));
    return utils.waitForPresenceOf(el);
  }

  async getSVGElement() {
    const el = element(by.css('#openseadragon svg'));
    return await utils.waitForElement(el);
  }

  async getFirstCanvasGroupInFirstGroupOverlay() {
    const el = element(
      by.css('#openseadragon svg g.page-group:first-child rect:first-child')
    );
    return utils.waitForElement(el);
  }

  async getSecondCanvasGroupInFirstGroupOverlay() {
    const el = element(
      by.css('#openseadragon svg g.page-group:nth-child(2)')
    ).element(by.css('rect:first-child'));
    return utils.waitForElement(el);
  }

  async getAllCanvasGroupOverlays() {
    const el = await element.all(
      by.css('#openseadragon svg g.page-group rect')
    );
    return el;
  }

  async getLeftCanvasGroupMask() {
    const el = element(
      by.css('#openseadragon svg g#page-mask rect:first-child')
    );
    return utils.waitForElement(el);
  }

  async getRightCanvasGroupMask() {
    const el = element(
      by.css('#openseadragon svg g#page-mask rect:nth-child(2)')
    );
    return utils.waitForElement(el);
  }

  async getFirstCanvasGroupOverlay() {
    const el = element.all(by.css('#openseadragon svg g rect')).first();
    return utils.waitForElement(el);
  }

  async getOnePageButton() {
    const el = element(by.css('#toggleSinglePageViewButton'));
    if ((await el.isPresent()) && (await el.isDisplayed())) {
      return el;
    } else {
      return false;
    }
  }

  async getTwoPageButton() {
    const el = element(by.css('#toggleTwoPageViewButton'));
    if ((await el.isPresent()) && (await el.isDisplayed())) {
      return el;
    } else {
      return false;
    }
  }

  getAnimationTimeInSec(): promise.Promise<number> {
    return browser.executeScript(
      'return window.openSeadragonViewer.animationTime;'
    );
  }

  getAnimationTimeInMs(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getAnimationTimeInSec().then((time) => {
        resolve(time * 1000);
      });
    });
  }

  getZoomLevel(): promise.Promise<number> {
    return browser.executeScript(
      'return window.openSeadragonViewer.viewport.getZoom(true);'
    );
  }

  getMinZoom(): promise.Promise<number> {
    return browser.executeScript(
      'return window.openSeadragonViewer.viewport.getMinZoom();'
    );
  }

  getMaxZoom(): promise.Promise<number> {
    return browser.executeScript(
      'return window.openSeadragonViewer.viewport.getMaxZoom();'
    );
  }

  getCenter(): promise.Promise<Point> {
    return browser.executeScript(
      'return window.openSeadragonViewer.viewport.getCenter(false);'
    );
  }

  async swipe(startPoint: Point, endPoint: Point): Promise<void> {
    await browser
      .touchActions()
      .tapAndHold(startPoint)
      .release(endPoint)
      .perform();
  }

  async pinchOut(): Promise<void> {
    await browser
      .touchActions()
      .tapAndHold(thumbStartPosition)
      .tapAndHold(pointerPosition1)
      .move(pointerPosition2)
      .perform();
  }

  async pinchIn(): Promise<void> {
    await browser
      .touchActions()
      .tapAndHold(thumbStartPosition)
      .tapAndHold(pointerPosition2)
      .move(pointerPosition1)
      .perform();
  }

  pan(point: Point): promise.Promise<any> {
    return browser.executeScript(
      `window.openSeadragonViewer.viewport.panTo({x: ${point.x}, y: ${point.y}});`
    );
  }

  async zoomIn(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) * 2;
    await browser.executeScript(
      'window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');'
    );
  }

  async zoomOut(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) / 2;
    await browser.executeScript(
      'window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');'
    );
  }

  async dblClick(): Promise<void> {
    const el: WebElement = await browser.driver.switchTo().activeElement();
    el.click();
    el.click();
  }

  async dblTap(): Promise<void> {
    await browser
      .findElement(By.css('.openseadragon-canvas > canvas'))
      .then((canvas: WebElement) => {
        return browser.touchActions().tap(canvas).tap(canvas).perform();
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
    const button: ElementFinder = await utils.waitForElement(
      element(by.id(buttonId))
    );
    if (await button.isEnabled()) {
      await utils.clickElement(button);
    }
  }

  async waitForAnimation(animationTime?: number): Promise<void> {
    if (animationTime === undefined) {
      animationTime = await this.getAnimationTimeInMs();
    }
    await browser.sleep(animationTime);
  }

  async isDashboardMode(): Promise<boolean> {
    await this.waitForAnimation(1000);
    return element(by.css('.mode-dashboard')).isPresent();
  }

  async isPageMode(): Promise<boolean> {
    await this.waitForAnimation(1000);
    return element(by.css('.mode-page')).isPresent();
  }

  async isTwoPageView(): Promise<boolean> {
    const btn = await this.getOnePageButton();
    return btn ? true : false;
  }

  async isOnePageView(): Promise<boolean> {
    const btn = await this.getTwoPageButton();
    return btn ? true : false;
  }

  async isCurrentCanvasGroupFittedViewport(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.getSize();
    const overlayDimensions = await overlay.getSize();

    const widthIsFitted = Utils.numbersAreClose(
      svgParentDimensions.width,
      overlayDimensions.width,
      5
    );
    const heightIsFitted = Utils.numbersAreClose(
      svgParentDimensions.height,
      overlayDimensions.height,
      5
    );

    return widthIsFitted || heightIsFitted;
  }

  async isVerticallyCentered(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.getSize();
    const overlayDimensions = await overlay.getSize();

    return (
      Math.round(svgParentDimensions.height) ===
      Math.round(overlayDimensions.height)
    );
  }

  async sendKeyboardEvent(key: string): Promise<void> {
    let iKey: string = null;
    if (key === 'PageDown') {
      iKey = Key.PAGE_DOWN;
    } else if (key === 'ArrowRight') {
      iKey = Key.ARROW_RIGHT;
    } else if (key === 'ArrowUp') {
      iKey = Key.ARROW_UP;
    } else if (key === 'n') {
      iKey = Key.chord('n');
    } else if (key === 'PageUp') {
      iKey = Key.PAGE_UP;
    } else if (key === 'ArrowLeft') {
      iKey = Key.ARROW_LEFT;
    } else if (key === 'p') {
      iKey = Key.chord('p');
    } else if (key === 'Home') {
      iKey = Key.HOME;
    } else if (key === 'End') {
      iKey = Key.END;
    } else if (key === '+') {
      iKey = Key.ADD;
    } else if (key === '-') {
      iKey = Key.SUBTRACT;
    } else if (key === '0') {
      iKey = Key.chord('0');
    } else if (key === 's') {
      iKey = Key.chord('s');
    } else if (key === 'c') {
      iKey = Key.chord('c');
    } else if (key === 'Esc') {
      iKey = Key.ESCAPE;
    }

    await this.setFocusOnViewer();
    const el = await browser.driver.switchTo().activeElement();
    await el.sendKeys(iKey);
    return this.waitForAnimation();
  }

  async visibleCanvasGroups(): Promise<Boolean[]> {
    const canvasGroupsArray = await this.getAllCanvasGroupOverlays();

    const [leftCanvasGroupMask, rightCanvasGroupMask] = await Promise.all([
      this.getLeftCanvasGroupMask(),
      this.getRightCanvasGroupMask(),
    ]);

    const leftCanvasGroupMaskSize = await leftCanvasGroupMask.getSize();
    const leftCanvasGroupMaskLoc = await leftCanvasGroupMask.getLocation();
    const rightCanvasGroupMaskSize = await rightCanvasGroupMask.getSize();
    const rightCanvasGroupMaskLoc = await rightCanvasGroupMask.getLocation();

    const result = [];
    for (let i = 0; i < canvasGroupsArray.length; i++) {
      const canvasGroup = canvasGroupsArray[i];
      const isVisible = await this.isElementVisibleInReadersViewport(
        canvasGroup,
        { size: leftCanvasGroupMaskSize, location: leftCanvasGroupMaskLoc },
        { size: rightCanvasGroupMaskSize, location: rightCanvasGroupMaskLoc }
      );
      result.push(isVisible);
    }
    return result;
  }

  /**
   * Check if any part of an element is visible in the readers viewport.
   * Note that the test will not confirm that the whole element is inside the viewport.
   *
   * @param el
   * @param leftPageMask
   * @param rightCanvasGroupMask
   */
  async isElementVisibleInReadersViewport(
    el: any,
    leftCanvasGroupMask: { size: any; location: any },
    rightCanvasGroupMask: { size: any; location: any }
  ): Promise<boolean> {
    let lastEvent: string;
    try {
      lastEvent = 'getSize()';
      const elementSize = await el.getSize();
      lastEvent = 'getLocation()';
      const elementLocation = await el.getLocation();
      lastEvent = 'elementCalculatedLocastion';
      const elementCalculatedLocastion = {
        left: elementLocation.x,
        right: elementLocation.x + elementSize.width,
      };
      lastEvent = 'return';
      return (
        elementCalculatedLocastion.right >= leftCanvasGroupMask.size.width &&
        elementCalculatedLocastion.left <= rightCanvasGroupMask.location.x
      );
    } catch (e) {
      console.log(
        `Ooups, this should not happen. Last event is ${lastEvent}`,
        e
      );
    }
    return false;
  }

  async setFocusOnViewer() {
    await utils.waitForElement(
      element(by.css('.openseadragon-canvas > canvas'))
    );
    await browser.executeScript(
      `document.querySelector('.openseadragon-canvas').focus();`
    );
  }
}

export interface Point {
  x: number;
  y: number;
}

import {
  browser,
  by,
  By,
  element,
  ElementArrayFinder,
  ElementFinder,
  protractor,
} from 'protractor';
import { Key, promise, WebElement } from 'selenium-webdriver';
import { Utils } from '../helpers/utils';

const utils = new Utils();
const thumbStartPosition = <any>{ x: 600, y: 300 };
const pointerPosition1 = <any>{ x: 650, y: 275 };
const pointerPosition2 = <any>{ x: 750, y: 200 };
export class ViewerPage {
  public static readonly bookShelf = [
    {
      manifestName: 'a-ltr-book',
      url: 'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest',
    },
    {
      manifestName: 'a-rtl-book',
      url: 'http://localhost:4040/catalog/v1/iiif/a-rtl-book/manifest',
    },
    {
      manifestName: 'a-ltr-10-pages-book',
      url: 'http://localhost:4040/catalog/v1/iiif/a-ltr-10-pages-book/manifest',
    },
    {
      manifestName: 'a-rtl-10-pages-book',
      url: 'http://localhost:4040/catalog/v1/iiif/a-rtl-10-pages-book/manifest',
    },
    {
      manifestName: 'a-individuals-manifest',
      url: 'http://localhost:4040/catalog/v1/iiif/a-individuals-manifest/manifest',
    },
    {
      manifestName: 'a-non-attribution-manifest',
      url: 'http://localhost:4040/catalog/v1/iiif/a-non-attribution-manifest/manifest',
    },
    {
      manifestName: 'a-recognized-text-book',
      url: 'http://localhost:4040/catalog/v1/iiif/a-recognized-text-book/manifest',
    },
  ];
  private isElements = false;
  private navigationSliderEl: ElementFinder;
  private canvasGroupsButtonEl: ElementFinder;
  private canvasGroupInputEl: ElementFinder;
  private currentCanvasGroupLabelEl: ElementFinder;
  private numOfCanvasGroupsEl: ElementFinder;
  private contentsDialogButton: ElementFinder;
  private contentsContainer: ElementFinder;
  private helpContainer: ElementFinder;
  private tabsEls: ElementArrayFinder;
  private tocContainerEl: ElementFinder;
  private helpDialogButtonEl: ElementFinder;
  private contentSearchDialogButtonEl: ElementFinder;
  private contentSearchSubmitButtonEl: ElementFinder;
  private fullscreenButtonEl: ElementFinder;
  private openseadragonContainer: ElementFinder;
  private attributionEl: ElementFinder;
  private headerEl: ElementFinder;
  private footerEl: ElementFinder;
  private svgEl: ElementFinder;
  private firstCanvasGroupInFirstGroupOverlayEl: ElementFinder;
  private secondCanvasGroupInFirstGroupOverlayEl: ElementFinder;
  private canvasGroupOverlaysEls: ElementArrayFinder;
  private leftCanvasGroupMaskEl: ElementFinder;
  private rightCanvasGroupMaskEl: ElementFinder;
  private canvasGroupOverlayEls: ElementArrayFinder;
  private singlePageViewButtonEl: ElementFinder;
  private twoPageViewButtonEl: ElementFinder;
  private modeDashboardEl: ElementFinder;
  private modePageEl: ElementFinder;
  private openseadragonCanvasEl: ElementFinder;
  private recognizedTextContentSplitViewButtonEl: ElementFinder;
  private recognizedTextContentOnlyButtonEl: ElementFinder;
  private recognizedTextContentCloseButtonEl: ElementFinder;
  private firstCanvasRecognizedTextContentEl: ElementFinder;
  private secondCanvasRecognizedTextContentEl: ElementFinder;
  private recognizedTextContentHitsEls: ElementArrayFinder;
  private recognizedTextContentContainerEl: ElementFinder;
  private viewMenuButtonEl: ElementFinder;
  private viewMenuDialogEl: ElementFinder;

  constructor() {
    this.navigationSliderEl = element(by.css('.navigation-slider'));
    this.canvasGroupsButtonEl = element(by.css('button.canvasGroups'));
    this.canvasGroupInputEl = element(by.css('.go-to-canvas-group-input'));
    this.currentCanvasGroupLabelEl = element(
      by.css('#currentCanvasGroupLabel')
    );
    this.numOfCanvasGroupsEl = element(by.css('#numOfCanvasGroups'));
    this.contentsDialogButton = element(
      by.css('#ngx-mimeContentsDialogButton')
    );
    this.contentsContainer = element(by.css('.contents-container'));
    this.helpContainer = element(by.css('.help-container'));
    this.tabsEls = element.all(by.css('.mat-tab-label'));
    this.tocContainerEl = element(by.css('.ngx-mime-toc-container'));
    this.helpDialogButtonEl = element(by.css('#ngx-mimeHelpDialogButton'));
    this.contentSearchDialogButtonEl = element(
      by.css('#ngx-mimeContentSearchDialogButton')
    );
    this.contentSearchSubmitButtonEl = element(
      by.css('.content-search-box button[type="submit"]')
    );
    this.fullscreenButtonEl = element(by.css('#ngx-mimeFullscreenButton'));
    this.openseadragonContainer = element(by.css('.openseadragon-container'));
    this.attributionEl = element(
      by.css('.attribution-container > .mat-dialog-content')
    );
    this.headerEl = element(by.css('mime-viewer-header'));
    this.footerEl = element(by.css('mime-viewer-footer'));
    this.svgEl = element(by.css('#openseadragon svg'));
    this.firstCanvasGroupInFirstGroupOverlayEl = element(
      by.css('#openseadragon svg g.page-group:first-child rect:first-child')
    );
    this.secondCanvasGroupInFirstGroupOverlayEl = element(
      by.css('#openseadragon svg g.page-group:nth-child(2)')
    ).element(by.css('rect:first-child'));
    this.canvasGroupOverlaysEls = element.all(
      by.css('#openseadragon svg g.page-group rect')
    );
    this.leftCanvasGroupMaskEl = element(
      by.css('#openseadragon svg g#page-mask rect:first-child')
    );
    this.rightCanvasGroupMaskEl = element(
      by.css('#openseadragon svg g#page-mask rect:nth-child(2)')
    );
    this.canvasGroupOverlayEls = element.all(
      by.css('#openseadragon svg g rect')
    );
    this.singlePageViewButtonEl = element(
      by.css(
        'mat-button-toggle[data-test-id="ngx-mime-single-page-view-button"]'
      )
    );
    this.twoPageViewButtonEl = element(
      by.css('mat-button-toggle[data-test-id="ngx-mime-two-page-view-button"]')
    );
    this.recognizedTextContentSplitViewButtonEl = element(
      by.css(
        'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-split-view-button"]'
      )
    );
    this.recognizedTextContentOnlyButtonEl = element(
      by.css(
        'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-only-button"]'
      )
    );
    this.recognizedTextContentCloseButtonEl = element(
      by.css(
        'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-close-button"]'
      )
    );
    this.modeDashboardEl = element(by.css('.mode-dashboard'));
    this.modePageEl = element(by.css('.mode-page'));
    this.openseadragonCanvasEl = element(
      by.css('.openseadragon-canvas > canvas')
    );
    this.firstCanvasRecognizedTextContentEl = element(
      by.css('div[data-test-id="firstCanvasRecognizedTextContent"]')
    );
    this.secondCanvasRecognizedTextContentEl = element(
      by.css('div[data-test-id="secondCanvasRecognizedTextContent"]')
    );
    this.recognizedTextContentHitsEls = element.all(
      by.css('.recognized-text-content-container mark')
    );
    this.recognizedTextContentContainerEl = element(
      by.css(
        'mat-drawer[data-test-id="ngx-mime-recognized-text-content-container"]'
      )
    );
    this.viewMenuButtonEl = element(by.css('#ngx-mime-view-menu-button'));
    this.viewMenuDialogEl = element(by.css('mime-view-dialog'));
  }

  getBookShelfUrl(manifestName: string): string {
    const manifest = ViewerPage.bookShelf.find(
      (b) => b.manifestName === manifestName
    );
    if (manifest) {
      return manifest.url;
    } else {
      throw new Error('Manifest url not found');
    }
  }

  async isRecognizedTextContentButtonsPresent(): Promise<boolean> {
    return (
      (await utils.isPresentAndDisplayed(
        this.recognizedTextContentSplitViewButtonEl
      )) &&
      (await utils.isPresentAndDisplayed(
        this.recognizedTextContentOnlyButtonEl
      )) &&
      (await utils.isPresentAndDisplayed(
        this.recognizedTextContentCloseButtonEl
      ))
    );
  }

  async showRecognizedTextContentInSplitView(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentSplitViewButtonEl);
  }

  async showOnlyRecognizedTextContent(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentOnlyButtonEl);
  }

  async closeRecognizedTextContent(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentCloseButtonEl);
  }

  async getRecognizedTextContent(): Promise<string | undefined> {
    let text = undefined;
    if (
      await utils.isPresentAndDisplayed(this.firstCanvasRecognizedTextContentEl)
    ) {
      text = await this.firstCanvasRecognizedTextContentEl.getText();
    }
    if (
      await utils.isPresentAndDisplayed(
        this.secondCanvasRecognizedTextContentEl
      )
    ) {
      text += await this.secondCanvasRecognizedTextContentEl.getText();
    }
    return text;
  }

  async isRecognizedTextContentInSplitView(): Promise<boolean> {
    return utils.containClass(this.recognizedTextContentContainerEl, 'split');
  }

  async isRecognizedTextContentOnly() {
    return utils.containClass(this.recognizedTextContentContainerEl, 'only');
  }

  async setDashboardMode(): Promise<void> {
    const isDashboardMode = await this.isDashboardMode();

    if (!isDashboardMode) {
      const overlay = await this.getSVGElement();
      await utils.clickElement(overlay);
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
    await this.checkViewMenuToggle(this.singlePageViewButtonEl);
  }

  async setTwoPageView() {
    await this.checkViewMenuToggle(this.twoPageViewButtonEl);
  }

  setTestCustomElements(isElements: boolean) {
    this.isElements = isElements;
  }

  async open(manifestName?: string) {
    let uri = this.isElements ? '/viewer/elements' : '/viewer/components';
    if (manifestName) {
      uri += '?manifestUri=' + new ViewerPage().getBookShelfUrl(manifestName);
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
    const slider = await utils.waitForElement(this.navigationSliderEl);
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
      this.canvasGroupsButtonEl
    );
    await goToCanvasGroupButton.click();
    const input = await utils.waitForElement(this.canvasGroupInputEl);
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
    const el = await utils.waitForPresenceOf(this.currentCanvasGroupLabelEl);
    // Not using el.getText() as it don't seem to work when element is not visible
    const currentCanvasGroupLabel = await el.getAttribute('textContent');
    // return parseInt(currentPageNumber, 10);
    return currentCanvasGroupLabel;
  }

  async getNumberOfCanvasGroups() {
    // The footer might be hidden, but the pagenumber is still updated, so use
    // waitForPresenceOf insted of waitForElement.
    const el = await utils.waitForPresenceOf(this.numOfCanvasGroupsEl);
    // Not using el.getText() as it don't seem to work when element is not visible
    const numberOfCanvasGroups = await el.getAttribute('textContent');
    return parseInt(numberOfCanvasGroups, 10);
  }

  async openContentsDialog() {
    await this.contentsDialogButton.click();
    await utils.waitForElement(this.contentsContainer);
    await browser.sleep(2000);
  }

  async openHelpDialog() {
    await this.helpDialogButtonEl.click();
    await utils.waitForElement(this.helpContainer);
    await browser.sleep(2000);
  }

  async openTableOfContentsTab() {
    await this.tabsEls.get(1).click();
    await utils.waitForElement(this.tocContainerEl);
    await this.waitForAnimation();
  }

  async openContentSearchDialog() {
    const ngxmimeContentSearchDialogButton: ElementFinder =
      await utils.waitForElement(this.contentSearchDialogButtonEl);
    await ngxmimeContentSearchDialogButton.click();
    await utils.waitForElement(this.contentSearchSubmitButtonEl);
    await this.waitForAnimation();
  }

  async fullscreenButton() {
    return utils.promisify(async () =>
      utils.waitForElement(this.fullscreenButtonEl)
    );
  }

  async openSeadragonElement() {
    return utils.promisify(async () =>
      utils.waitForElement(this.openseadragonContainer)
    );
  }

  async getAttribution() {
    return utils.promisify(async () =>
      utils.waitForElement(this.attributionEl)
    );
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
    return utils.waitForPresenceOf(this.headerEl);
  }

  async getFooter() {
    return utils.waitForPresenceOf(this.footerEl);
  }

  async getSVGElement() {
    return utils.promisify(async () => utils.waitForElement(this.svgEl));
  }

  async getFirstCanvasGroupInFirstGroupOverlay() {
    return utils.promisify(async () =>
      utils.waitForElement(this.firstCanvasGroupInFirstGroupOverlayEl)
    );
  }

  async getSecondCanvasGroupInFirstGroupOverlay() {
    return utils.promisify(async () =>
      utils.waitForElement(this.secondCanvasGroupInFirstGroupOverlayEl)
    );
  }

  getAllCanvasGroupOverlays() {
    return this.canvasGroupOverlaysEls;
  }

  async getLeftCanvasGroupMask() {
    return utils.promisify(async () =>
      utils.waitForElement(this.leftCanvasGroupMaskEl)
    );
  }

  async getRightCanvasGroupMask() {
    return utils.promisify(async () =>
      utils.waitForElement(this.rightCanvasGroupMaskEl)
    );
  }

  async getFirstCanvasGroupOverlay() {
    return utils.promisify(async () =>
      utils.waitForElement(this.canvasGroupOverlayEls.first())
    );
  }

  async openViewMenu(): Promise<void> {
    const isOpen = await this.isViewDialogOpen();
    if (isOpen) {
      return;
    }

    const isPresentAndDisplayed: boolean = await utils.isPresentAndDisplayed(
      this.viewMenuButtonEl
    );
    if (isPresentAndDisplayed) {
      await this.viewMenuButtonEl.click();
      await this.waitForAnimation();
    } else {
      throw new Error('View menu button not found');
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

  getRecognizedContentHits(): ElementArrayFinder {
    return this.recognizedTextContentHitsEls;
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
    return this.modeDashboardEl.isPresent();
  }

  async isPageMode(): Promise<boolean> {
    await this.waitForAnimation(1000);
    return this.modePageEl.isPresent();
  }

  async isTwoPageView(): Promise<boolean> {
    const secondPageGroupCount = await element
      .all(by.css('.page-group'))
      .get(1)
      .all(by.css('rect'))
      .count();
    return secondPageGroupCount === 2;
  }

  async isViewDialogOpen(): Promise<boolean> {
    return utils.isPresentAndDisplayed(this.viewMenuDialogEl);
  }

  async isOnePageView(): Promise<boolean> {
    const singlePageGroupCount = await element
      .all(by.css('.page-group'))
      .count();
    return singlePageGroupCount === 1;
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
    let iKey: string | null = null;
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
    } else if (key === 't') {
      iKey = Key.chord('t');
    } else if (key === 'Esc') {
      iKey = Key.ESCAPE;
    } else if (key === 'Shift+S') {
      iKey = Key.chord(Key.SHIFT, 'S');
    }

    await this.setFocusOnViewer();
    const el = await browser.driver.switchTo().activeElement();
    if (iKey) {
      await el.sendKeys(iKey);
    }
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
    let lastEvent = 'getSize()';
    try {
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
    await utils.waitForElement(this.openseadragonCanvasEl);
    await browser.executeScript(
      `document.querySelector('.openseadragon-canvas').focus();`
    );
  }

  private async checkViewMenuToggle(el: ElementFinder): Promise<void> {
    await this.openViewMenu();

    const isSelected = await utils.containClass(el, 'mat-button-toggle-checked');
    if (!isSelected) {
      await el.click();
      await this.waitForAnimation();
    }
  }
}

export interface Point {
  x: number;
  y: number;
}

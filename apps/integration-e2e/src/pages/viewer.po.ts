import { Locator, Page } from 'playwright';
import { Utils } from '../helpers/utils';
import { ParameterType } from '../support/ParameterType';

const thumbStartPosition = <any>{ x: 600, y: 300 };
const pointerPosition1 = <any>{ x: 650, y: 275 };
const pointerPosition2 = <any>{ x: 750, y: 200 };

export class ViewerPage {
  readonly page: Page;
  readonly parameters: ParameterType;
  readonly utils: Utils;

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
  private navigationSliderEl: Locator;
  private canvasGroupsButtonEl: Locator;
  private canvasGroupInputEl: Locator;
  private currentCanvasGroupLabelEl: Locator;
  private numOfCanvasGroupsEl: Locator;
  private contentsDialogButton: Locator;
  private contentsContainer: Locator;
  private helpContainer: Locator;
  private tabsEls: Locator;
  private tocContainerEl: Locator;
  private helpDialogButtonEl: Locator;
  private contentSearchDialogButtonEl: Locator;
  private contentSearchSubmitButtonEl: Locator;
  private fullscreenButtonEl: Locator;
  private openseadragonContainer: Locator;

  readonly attributionEl: Locator;

  private headerEl: Locator;
  private footerEl: Locator;
  private svgEl: Locator;
  private firstCanvasGroupInFirstGroupOverlayEl: Locator;
  private secondCanvasGroupInFirstGroupOverlayEl: Locator;
  private canvasGroupOverlaysEls: Locator;
  private leftCanvasGroupMaskEl: Locator;
  private rightCanvasGroupMaskEl: Locator;
  private canvasGroupOverlayEls: Locator;
  private singlePageViewButtonEl: Locator;
  private twoPageViewButtonEl: Locator;
  private modeDashboardEl: Locator;
  private modePageEl: Locator;
  private openseadragonCanvasEl: Locator;
  private recognizedTextContentSplitViewButtonEl: Locator;
  private recognizedTextContentOnlyButtonEl: Locator;
  private recognizedTextContentCloseButtonEl: Locator;
  private firstCanvasRecognizedTextContentEl: Locator;
  private secondCanvasRecognizedTextContentEl: Locator;
  private recognizedTextContentHitsEls: Locator;
  private recognizedTextContentContainerEl: Locator;
  private viewMenuButtonEl: Locator;
  private viewMenuCloseButtonEl: Locator;
  private viewMenuDialogEl: Locator;
  private pageGroupEl: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.utils = new Utils(this.page);
    this.navigationSliderEl = this.page.locator('.navigation-slider');
    this.canvasGroupsButtonEl = this.page.locator('button.canvasGroups');
    this.canvasGroupInputEl = this.page.locator('.go-to-canvas-group-input');
    this.currentCanvasGroupLabelEl = this.page.locator(
      '#currentCanvasGroupLabel'
    );
    this.numOfCanvasGroupsEl = this.page.locator('#numOfCanvasGroups');
    this.contentsDialogButton = this.page.locator(
      '#ngx-mimeContentsDialogButton'
    );
    this.contentsContainer = this.page.locator('.contents-container');
    this.helpContainer = this.page.locator('.help-container');
    this.tabsEls = this.page.locator('.mat-tab-label');
    this.tocContainerEl = this.page.locator('.ngx-mime-toc-container');
    this.helpDialogButtonEl = this.page.locator('#ngx-mimeHelpDialogButton');
    this.contentSearchDialogButtonEl = this.page.locator(
      '#ngx-mimeContentSearchDialogButton'
    );
    this.contentSearchSubmitButtonEl = this.page.locator(
      '.content-search-box button[type="submit"]'
    );
    this.fullscreenButtonEl = this.page.locator('#ngx-mimeFullscreenButton');
    this.openseadragonContainer = this.page.locator('.openseadragon-container');
    this.attributionEl = this.page.locator(
      '.attribution-container > .mat-dialog-content'
    );
    this.headerEl = this.page.locator('mime-viewer-header');
    this.footerEl = this.page.locator('mime-viewer-footer');
    this.svgEl = this.page.locator('#openseadragon svg');
    this.firstCanvasGroupInFirstGroupOverlayEl = this.page.locator(
      '#openseadragon svg g.page-group:first-child rect:first-child'
    );
    this.secondCanvasGroupInFirstGroupOverlayEl = this.page
      .locator('#openseadragon svg g.page-group:nth-child(2)')
      .locator('rect:first-child');
    this.canvasGroupOverlaysEls = this.page.locator(
      '#openseadragon svg g.page-group rect'
    );
    this.leftCanvasGroupMaskEl = this.page.locator(
      '#openseadragon svg g#page-mask rect:first-child'
    );
    this.rightCanvasGroupMaskEl = this.page.locator(
      '#openseadragon svg g#page-mask rect:nth-child(2)'
    );
    this.canvasGroupOverlayEls = this.page.locator('#openseadragon svg g rect');
    this.singlePageViewButtonEl = this.page.locator(
      'mat-button-toggle[data-test-id="ngx-mime-single-page-view-button"]'
    );
    this.twoPageViewButtonEl = this.page.locator(
      'mat-button-toggle[data-test-id="ngx-mime-two-page-view-button"]'
    );
    this.recognizedTextContentSplitViewButtonEl = this.page.locator(
      'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-split-view-button"]'
    );
    this.recognizedTextContentOnlyButtonEl = this.page.locator(
      'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-only-button"]'
    );
    this.recognizedTextContentCloseButtonEl = this.page.locator(
      'mat-button-toggle[data-test-id="ngx-mime-recognized-text-content-close-button"]'
    );
    this.modeDashboardEl = this.page.locator('.mode-dashboard');
    this.modePageEl = this.page.locator('.mode-page');
    this.openseadragonCanvasEl = this.page.locator(
      '.openseadragon-canvas > canvas'
    );
    this.firstCanvasRecognizedTextContentEl = this.page.locator(
      'div[data-test-id="firstCanvasRecognizedTextContent"]'
    );
    this.secondCanvasRecognizedTextContentEl = this.page.locator(
      'div[data-test-id="secondCanvasRecognizedTextContent"]'
    );
    this.recognizedTextContentHitsEls = this.page.locator(
      '.recognized-text-content-container mark'
    );
    this.recognizedTextContentContainerEl = this.page.locator(
      'mat-drawer[data-test-id="ngx-mime-recognized-text-content-container"]'
    );
    this.viewMenuButtonEl = this.page.locator(
      '[data-test-id="ngx-mime-view-menu-button"]'
    );
    this.viewMenuCloseButtonEl = this.page.locator(
      '[data-test-id="ngx-mime-view-dialog-close-button"]'
    );
    this.viewMenuDialogEl = this.page.locator('mime-view-dialog');
    this.pageGroupEl = this.page.locator('.page-group');
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
      (await this.recognizedTextContentSplitViewButtonEl.isVisible()) &&
      (await this.recognizedTextContentOnlyButtonEl.isVisible()) &&
      (await this.recognizedTextContentCloseButtonEl.isVisible())
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

  async getRecognizedTextContent(): Promise<string> {
    let text = '';
    if (await this.firstCanvasRecognizedTextContentEl.isVisible()) {
      const firstCanvasRecognizedText =
        await this.firstCanvasRecognizedTextContentEl.textContent();
      if (firstCanvasRecognizedText) {
        text += firstCanvasRecognizedText;
      }
    }
    if (await this.secondCanvasRecognizedTextContentEl.isVisible()) {
      const secondCanvasRecognizedText =
        await this.secondCanvasRecognizedTextContentEl.textContent();
      if (secondCanvasRecognizedText) {
        text += secondCanvasRecognizedText;
      }
    }
    return text;
  }

  async isRecognizedTextContentInSplitView(): Promise<boolean> {
    return this.containClass(this.recognizedTextContentContainerEl, 'split');
  }

  async isRecognizedTextContentOnly() {
    return this.containClass(this.recognizedTextContentContainerEl, 'only');
  }

  async setDashboardMode(): Promise<void> {
    const isDashboardMode = await this.isDashboardMode();

    if (!isDashboardMode) {
      const overlay = await this.getSVGElement();
      await overlay.click();
      await this.utils.waitForAnimation(1000);
    }
  }

  async setPageMode(): Promise<void> {
    const isPageMode = await this.isPageMode();

    if (!isPageMode) {
      const overlay = await this.getSVGElement();
      await overlay.click();
      await this.utils.waitForAnimation(1000);
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

  async open(manifestName?: string, canvasIndex?: number) {
    let uri = this.isElements ? '/viewer/elements' : '/viewer/components';
    const params: string[] = [];
    if (manifestName) {
      params.push('manifestUri=' + this.getBookShelfUrl(manifestName));
    }
    if (canvasIndex) {
      params.push(`canvasIndex=${canvasIndex}`);
    }
    await this.page.goto(`${this.parameters.appUrl}?${params.join('&')}`);
    await this.setFocusOnViewer();
    await this.utils.waitForAnimation();
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
    const isTwoPageView = this.isTwoPageView();
    if ((await isTwoPageView) && canvasGroupIndex > 1) {
      canvasGroupIndex = Math.floor(canvasGroupIndex / 2);
    }
    for (let i = 0; i < canvasGroupIndex; i++) {
      await this.navigationSliderEl.press('ArrowRight');
      await this.utils.waitForAnimation();
    }
  }

  async goToCanvasGroupWithDialog(canvasGroupIndex: number) {
    await this.canvasGroupsButtonEl.click();
    await this.canvasGroupInputEl.fill(`${canvasGroupIndex}`);
    await this.canvasGroupInputEl.press('Enter');
    await this.utils.waitForAnimation();
  }

  async navigateToCanvasGroup(canvasGroupIndex: number) {
    const isTwoPageView = this.isTwoPageView();
    if ((await isTwoPageView) && canvasGroupIndex > 1) {
      canvasGroupIndex = Math.floor(canvasGroupIndex / 2);
    }
    for (let i = 0; i < canvasGroupIndex; i++) {
      await this.clickNextButton();
    }
    await this.utils.waitForAnimation();
  }

  async getCurrentCanvasGroupLabel(): Promise<string> {
    const currentCanvasGroupLabel =
      await this.currentCanvasGroupLabelEl.textContent();
    return currentCanvasGroupLabel ? currentCanvasGroupLabel : '';
  }

  async getNumberOfCanvasGroups() {
    const numberOfCanvasGroups = await this.numOfCanvasGroupsEl.textContent();
    return numberOfCanvasGroups ? parseInt(numberOfCanvasGroups, 10) : -1;
  }

  async openContentsDialog() {
    await this.contentsDialogButton.click();
    await this.contentsContainer.waitFor();
  }

  async openHelpDialog() {
    await this.helpDialogButtonEl.click();
    await this.utils.waitForAnimation();
  }

  async openTableOfContentsTab() {
    await this.tabsEls.nth(1).click();
    await this.utils.waitForAnimation();
  }

  async openContentSearchDialog() {
    await this.contentSearchDialogButtonEl.click();
    await this.contentSearchSubmitButtonEl.waitFor();
    await this.utils.waitForAnimation();
  }

  async fullscreenButton() {
    await this.fullscreenButtonEl.waitFor();
    return this.fullscreenButtonEl;
  }

  async openSeadragonElement() {
    await this.openseadragonContainer.waitFor();
    return this.openseadragonContainer;
  }

  /*
  async getAttribution() {
    return utils.promisify(async () =>
      utils.waitForElement(this.attributionEl)
    );
  }
*/

  async isFullscreen() {
    const isFullscreen = await this.page.evaluate(
      '(document.fullscreenElement != null' +
        ' || document.mozFullScreenElement != null' +
        ' || document.webkitFullscreenElement != null' +
        ' || document.msFullscreenElement != null)'
    );
    return isFullscreen;
  }
  /*
  async getHeader() {
    return utils.waitForPresenceOf(this.headerEl);
  }

  async getFooter() {
    return utils.waitForPresenceOf(this.footerEl);
  }
*/
  async getSVGElement() {
    this.svgEl.waitFor();
    return this.svgEl;
  }
  /*
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
*/
  getAllCanvasGroupOverlays() {
    return this.canvasGroupOverlaysEls;
  }

  async getLeftCanvasGroupMask() {
    return this.leftCanvasGroupMaskEl;
  }

  async getRightCanvasGroupMask() {
    return this.rightCanvasGroupMaskEl;
  }

  async getFirstCanvasGroupOverlay() {
    const first = this.canvasGroupOverlayEls.first();
    await first.waitFor();
    return first;
  }

  async openViewMenu(): Promise<void> {
    const isOpen = await this.isViewDialogOpen();
    if (!isOpen) {
      await this.clickOnViewMenuButton();
    }
  }

  async closeViewMenu(): Promise<void> {
    const isOpen = await this.isViewDialogOpen();
    if (isOpen) {
      await this.viewMenuCloseButtonEl.click();
      await this.utils.waitForAnimation();
    }
  }

  async clickOnViewMenuButton(): Promise<void> {
    const isPresentAndDisplayed: boolean =
      await this.viewMenuButtonEl.isVisible();
    if (isPresentAndDisplayed) {
      await this.viewMenuButtonEl.click();
      await this.utils.waitForAnimation();
    } else {
      throw new Error('View menu button not found');
    }
  }

  getZoomLevel(): Promise<number> {
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.getZoom(true)'
    );
  }

  getMinZoom(): Promise<number> {
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.getMinZoom()'
    );
  }

  getMaxZoom(): Promise<number> {
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.getMaxZoom()'
    );
  }

  getCenter(): Promise<Point> {
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.getCenter(false)'
    );
  }

  getRecognizedContentHit(index: number): Promise<string | null> {
    return this.recognizedTextContentHitsEls.first().innerHTML();
  }

  async swipe(startPoint: Point, endPoint: Point): Promise<void> {
    // https://github.com/microsoft/playwright/issues/2903
    // await browser
    //   .touchActions()
    //   .tapAndHold(startPoint)
    //   .release(endPoint)
    //   .perform();
  }

  async pinchOut(): Promise<void> {
    // https://github.com/microsoft/playwright/issues/2903
    // await browser
    //   .touchActions()
    //   .tapAndHold(thumbStartPosition)
    //   .tapAndHold(pointerPosition1)
    //   .move(pointerPosition2)
    //   .perform();
  }

  async pinchIn(): Promise<void> {
    // https://github.com/microsoft/playwright/issues/2903
    // await browser
    //   .touchActions()
    //   .tapAndHold(thumbStartPosition)
    //   .tapAndHold(pointerPosition2)
    //   .move(pointerPosition1)
    //   .perform();
  }

  pan(point: Point): Promise<any> {
    return this.page.evaluate(
      `window.openSeadragonViewer.viewport.panTo({x: ${point.x}, y: ${point.y}});`
    );
  }

  async zoomIn(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) * 2;
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');'
    );
  }

  async zoomOut(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) / 2;
    return this.page.evaluate(
      'window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');'
    );
  }

  async dblClick(): Promise<void> {
    await (await this.openSeadragonElement()).dblclick();
  }

  async dblTap(): Promise<void> {
    // https://github.com/microsoft/playwright/issues/2903
    // await browser
    //   .findthis.page.locator('.openseadragon-canvas > canvas'))
    //   .then((canvas: WebElement) => {
    //     return browser.touchActions().tap(canvas).tap(canvas).perform();
    //   });
  }

  async clickZoomInButton(): Promise<void> {
    await this.clickNavigationButton('#zoomInButton');
  }

  async clickZoomOutButton(): Promise<void> {
    await this.clickNavigationButton('#zoomOutButton');
  }

  async clickZoomHomeButton(): Promise<void> {
    await this.clickNavigationButton('#homeButton');
  }

  async clickNextButton(): Promise<void> {
    await this.clickDisableableNavigationButton('#navigateNextButton');
    await this.utils.waitForAnimation(500);
  }

  async clickPreviousButton(): Promise<void> {
    await this.clickDisableableNavigationButton('#navigateBeforeButton');
    await this.utils.waitForAnimation(500);
  }

  async clickNavigationButton(buttonId: string): Promise<void> {
    await this.page.locator(buttonId).click();
  }

  async clickDisableableNavigationButton(buttonId: string): Promise<void> {
    const button: Locator = this.page.locator(buttonId);

    if (await button.isEnabled()) {
      await button.click();
    }
  }

  async isDashboardMode(): Promise<boolean> {
    return (await this.modeDashboardEl.count()) > 0;
  }

  async isPageMode(): Promise<boolean> {
    return (await this.modePageEl.count()) > 0;
  }

  async isTwoPageView(): Promise<boolean> {
    const secondPageGroupCount = await this.page
      .locator('.page-group')
      .nth(1)
      .locator('rect')
      .count();
    return secondPageGroupCount === 2;
  }

  async isViewDialogOpen(): Promise<boolean> {
    return this.viewMenuDialogEl.isVisible();
  }

  async isOnePageView(): Promise<boolean> {
    const singlePageGroupCount = await this.pageGroupEl.count();
    return singlePageGroupCount === 1;
  }

  async isCurrentCanvasGroupFittedViewport(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.boundingBox();
    const overlayDimensions = await overlay.boundingBox();

    const widthIsFitted = this.numbersAreClose(
      svgParentDimensions!.width,
      overlayDimensions!.width,
      5
    );
    const heightIsFitted = this.numbersAreClose(
      svgParentDimensions!.height,
      overlayDimensions!.height,
      5
    );

    return widthIsFitted || heightIsFitted;
  }

  async isVerticallyCentered(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.boundingBox();
    const overlayDimensions = await overlay.boundingBox();

    return (
      Math.round(svgParentDimensions!.height) ===
      Math.round(overlayDimensions!.height)
    );
  }

  async sendKeyboardEvent(key: string): Promise<void> {
    await this.setFocusOnViewer();
    await this.page.keyboard.press(key);
    return this.utils.waitForAnimation();
  }

  async visibleCanvasGroups(): Promise<Boolean[]> {
    const canvasGroupsArray = this.getAllCanvasGroupOverlays();

    const [leftCanvasGroupMask, rightCanvasGroupMask] = await Promise.all([
      this.getLeftCanvasGroupMask(),
      this.getRightCanvasGroupMask(),
    ]);

    const leftCanvasGroupMaskSize = await leftCanvasGroupMask.boundingBox();
    const rightCanvasGroupMaskSize = await rightCanvasGroupMask.boundingBox();

    const result = [];
    for (let i = 0; i < (await canvasGroupsArray.count()); i++) {
      const canvasGroup = canvasGroupsArray.nth(i);
      const isVisible = await this.isElementVisibleInReadersViewport(
        canvasGroup,
        leftCanvasGroupMaskSize,
        rightCanvasGroupMaskSize
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
    el: Locator,
    leftCanvasGroupMask: any,
    rightCanvasGroupMask: any
  ): Promise<boolean> {
    try {
      const elementSize = await el.boundingBox();
      if (elementSize) {
        const elementCalculatedLocastion = {
          left: elementSize.x,
          right: elementSize.x + elementSize.width,
        };
        return (
          elementCalculatedLocastion.right >= leftCanvasGroupMask.width &&
          elementCalculatedLocastion.left <= rightCanvasGroupMask.x
        );
      }
    } catch (e) {
      console.log(`Ooups, this should not happen!`, e);
    }
    return false;
  }

  async setFocusOnViewer() {
    await this.openseadragonCanvasEl.waitFor();
    await this.page.evaluate(
      `document.querySelector('.openseadragon-canvas').focus();`
    );
  }

  private async checkViewMenuToggle(l: Locator): Promise<void> {
    await this.openViewMenu();

    const isSelected = await this.containClass(l, 'mat-button-toggle-checked');
    if (!isSelected) {
      await l.click();
      await this.utils.waitForAnimation();
    }
    await this.closeViewMenu();
  }

  private async containClass(l: Locator, className: string): Promise<boolean> {
    const classes: string | null = await l.getAttribute('class');

    return classes !== null && classes.split(' ').includes(className);
  }

  private numbersAreClose(
    thing: number,
    realThing: number,
    epsilon: number
  ): boolean {
    return Math.abs(thing - realThing) <= epsilon;
  }
}

export interface Point {
  x: number;
  y: number;
}

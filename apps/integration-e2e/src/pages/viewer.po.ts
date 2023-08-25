import { Locator, Page } from 'playwright';
import { Animations } from '../helpers/animations';
import { ParameterType } from '../support/ParameterType';

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

  readonly viewer: Locator;
  readonly fullscreenButton: Locator;
  readonly openseadragonContainer: Locator;
  readonly attribution: Locator;
  private isElements = false;
  private navigationSlider: Locator;
  private canvasGroupsButton: Locator;
  private canvasGroupInput: Locator;
  private currentCanvasGroupLabel: Locator;
  private numOfCanvasGroups: Locator;
  private informationDialogButton: Locator;
  private informationContainer: Locator;
  private tabs: Locator;
  private helpDialogButton: Locator;
  private contentSearchDialogButton: Locator;
  private contentSearchSubmitButton: Locator;
  private svg: Locator;
  private canvasGroupOverlays: Locator;
  private leftCanvasGroupMask: Locator;
  private rightCanvasGroupMask: Locator;
  private canvasGroupOverlay: Locator;
  private singlePageViewButton: Locator;
  private twoPageViewButton: Locator;
  private modeDashboard: Locator;
  private modePage: Locator;
  private openseadragonCanvas: Locator;
  private recognizedTextContentSplitViewButton: Locator;
  private recognizedTextContentOnlyButton: Locator;
  private recognizedTextContentCloseButton: Locator;
  private firstCanvasRecognizedTextContent: Locator;
  private secondCanvasRecognizedTextContent: Locator;
  private recognizedTextContentHits: Locator;
  private recognizedTextContentContainer: Locator;
  private viewMenuButton: Locator;
  private viewMenuCloseButton: Locator;
  private viewMenuDialog: Locator;
  private pageGroup: Locator;
  private navigationSliderContainer: Locator;

  constructor(
    private parameters: ParameterType,
    private page: Page,
    private animations: Animations
  ) {
    this.viewer = this.page.locator('mime-viewer');
    this.navigationSlider = this.page.locator('.navigation-slider');
    this.navigationSliderContainer = this.page.getByTestId(
      'navigation-slider-container'
    );
    this.canvasGroupsButton = this.page.locator('button.canvasGroups');
    this.canvasGroupInput = this.page.locator('.go-to-canvas-group-input');
    this.currentCanvasGroupLabel = this.page.getByTestId(
      'currentCanvasGroupLabel'
    );
    this.numOfCanvasGroups = this.page.getByTestId('numOfCanvasGroups');
    this.informationDialogButton = this.page.getByTestId(
      'ngx-mimeInformationDialogButton'
    );
    this.informationContainer = this.page.locator('.information-container');
    this.tabs = this.page.locator('.mat-mdc-tab');
    this.helpDialogButton = this.page.getByTestId('ngx-mimeHelpDialogButton');
    this.contentSearchDialogButton = this.page.getByTestId(
      'ngx-mimeContentSearchDialogButton'
    );
    this.contentSearchSubmitButton = this.page.locator(
      '.content-search-box button[type="submit"]'
    );
    this.fullscreenButton = this.page.getByTestId('ngx-mimeFullscreenButton');
    this.openseadragonContainer = this.page.locator('.openseadragon-container');
    this.attribution = this.page.locator(
      '.attribution-container > .mat-mdc-dialog-content'
    );
    this.svg = this.page.locator('.openseadragon svg');
    this.canvasGroupOverlays = this.page.locator(
      '.openseadragon svg g.page-group rect'
    );
    this.leftCanvasGroupMask = this.page.getByTestId('mime-left-page-mask');
    this.rightCanvasGroupMask = this.page.getByTestId('mime-right-page-mask');
    this.canvasGroupOverlay = this.page.locator('.openseadragon svg g rect');
    this.singlePageViewButton = this.page.getByTestId(
      'ngx-mime-single-page-view-button'
    );
    this.twoPageViewButton = this.page.getByTestId(
      'ngx-mime-two-page-view-button'
    );
    this.recognizedTextContentSplitViewButton = this.page.getByTestId(
      'ngx-mime-recognized-text-content-split-view-button'
    );
    this.recognizedTextContentOnlyButton = this.page.getByTestId(
      'ngx-mime-recognized-text-content-only-button'
    );
    this.recognizedTextContentCloseButton = this.page.getByTestId(
      'ngx-mime-recognized-text-content-close-button'
    );
    this.modeDashboard = this.page.locator('.mode-dashboard');
    this.modePage = this.page.locator('.mode-page');
    this.openseadragonCanvas = this.page.locator(
      '.openseadragon-canvas>>nth=0'
    );
    this.firstCanvasRecognizedTextContent = this.page.getByTestId(
      'firstCanvasRecognizedTextContent'
    );
    this.secondCanvasRecognizedTextContent = this.page.getByTestId(
      'secondCanvasRecognizedTextContent'
    );
    this.recognizedTextContentHits = this.page.locator(
      '.recognized-text-content-container mark'
    );
    this.recognizedTextContentContainer = this.page.getByTestId(
      'ngx-mime-recognized-text-content-container'
    );
    this.viewMenuButton = this.page.getByTestId('ngx-mime-view-menu-button');
    this.viewMenuCloseButton = this.page.getByTestId(
      'ngx-mime-view-dialog-close-button'
    );
    this.viewMenuDialog = this.page.locator('mime-view-dialog');
    this.pageGroup = this.page.locator('.page-group');
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
      (await this.recognizedTextContentSplitViewButton.isVisible()) &&
      (await this.recognizedTextContentOnlyButton.isVisible()) &&
      (await this.recognizedTextContentCloseButton.isVisible())
    );
  }

  async showRecognizedTextContentInSplitView(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentSplitViewButton);
  }

  async showOnlyRecognizedTextContent(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentOnlyButton);
  }

  async closeRecognizedTextContent(): Promise<void> {
    await this.checkViewMenuToggle(this.recognizedTextContentCloseButton);
  }

  async getRecognizedTextContent(): Promise<string> {
    let text = '';
    if (await this.firstCanvasRecognizedTextContent.isVisible()) {
      const firstCanvasRecognizedText =
        await this.firstCanvasRecognizedTextContent.textContent();
      if (firstCanvasRecognizedText) {
        text += firstCanvasRecognizedText;
      }
    }
    if (await this.secondCanvasRecognizedTextContent.isVisible()) {
      const secondCanvasRecognizedText =
        await this.secondCanvasRecognizedTextContent.textContent();
      if (secondCanvasRecognizedText) {
        text += secondCanvasRecognizedText;
      }
    }
    return text;
  }

  async isRecognizedTextContentInSplitView(): Promise<boolean> {
    return this.containClass(this.recognizedTextContentContainer, 'split');
  }

  async isRecognizedTextContentOnly() {
    return this.containClass(this.recognizedTextContentContainer, 'only');
  }

  async setDashboardMode(): Promise<void> {
    const isDashboardMode = await this.isDashboardMode();

    if (!isDashboardMode) {
      const overlay = await this.getSVGElement();
      await overlay.click();
      await this.animations.waitFor(1000);
    }
  }

  async setPageMode(): Promise<void> {
    const isPageMode = await this.isPageMode();

    if (!isPageMode) {
      const overlay = await this.getSVGElement();
      await overlay.click();
      await this.animations.waitFor(1000);
    }
  }

  async setOnePageView() {
    await this.checkViewMenuToggle(this.singlePageViewButton);
  }

  async setTwoPageView() {
    await this.checkViewMenuToggle(this.twoPageViewButton);
  }

  setTestCustomElements(isElements: boolean) {
    this.isElements = isElements;
  }

  async open(manifestNames?: string[], canvasIndex?: number) {
    let uri = this.isElements ? '/viewer/elements' : '/viewer/components';
    const params: string[] = [];
    if (manifestNames) {
      manifestNames.forEach((manifestName) => {
        params.push(
          'manifestUri=' +
            encodeURIComponent(this.getBookShelfUrl(manifestName))
        );
      });
    }
    if (canvasIndex) {
      params.push(`canvasIndex=${canvasIndex}`);
    }

    for (let i = 0; i < 5; i++) {
      const url = `${this.parameters.appUrl}${uri}${
        params.length > 0 ? `?${params.join('&')}` : ''
      }`;
      try {
        await this.page.goto(url);
        break;
      } catch (e) {
        console.warn('Error connecting to', e);
        if (i === 2) {
          console.warn('Giving up', e);
          throw e;
        } else {
          console.warn(`Retry ${i}`);
        }
        await this.page.waitForTimeout(5000);
      }
    }
    await this.animations.waitFor(1000);
    await this.setFocusOnViewer();
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

    const dir = await this.navigationSliderContainer.getAttribute('dir');
    const pressDirection = dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft';
    for (let i = 0; i < canvasGroupIndex; i++) {
      await this.navigationSlider.press(pressDirection);
      await this.animations.waitFor();
    }
  }

  async goToCanvasGroupWithDialog(canvasGroupIndex: number) {
    await this.canvasGroupsButton.click();
    await this.canvasGroupInput.fill(`${canvasGroupIndex}`);
    await this.canvasGroupInput.press('Enter');
    await this.animations.waitFor();
  }

  async navigateToCanvasGroup(canvasGroupIndex: number) {
    const isTwoPageView = this.isTwoPageView();
    if ((await isTwoPageView) && canvasGroupIndex > 1) {
      canvasGroupIndex = Math.floor(canvasGroupIndex / 2);
    }
    for (let i = 0; i < canvasGroupIndex; i++) {
      await this.clickNextButton();
    }
    await this.animations.waitFor();
  }

  async getCurrentCanvasGroupLabel(): Promise<string> {
    const currentCanvasGroupLabel =
      await this.currentCanvasGroupLabel.textContent();
    return currentCanvasGroupLabel ? currentCanvasGroupLabel : '';
  }

  async getNumberOfCanvasGroups() {
    const numberOfCanvasGroups = await this.numOfCanvasGroups.textContent();
    return numberOfCanvasGroups ? parseInt(numberOfCanvasGroups, 10) : -1;
  }

  async openInformationDialog() {
    await this.informationDialogButton.click();
    await this.informationContainer.waitFor();
  }

  async openHelpDialog() {
    await this.helpDialogButton.click();
    await this.animations.waitFor();
  }

  async openTableOfContentsTab() {
    await this.tabs.nth(1).click();
    await this.animations.waitFor();
  }

  async openContentSearchDialog() {
    await this.contentSearchDialogButton.click();
    await this.contentSearchSubmitButton.waitFor();
  }

  async isFullscreen() {
    await this.page.waitForTimeout(1000);
    return await this.page.evaluate(
      '(document.fullscreenElement != null' +
        ' || document.mozFullScreenElement != null' +
        ' || document.webkitFullscreenElement != null' +
        ' || document.msFullscreenElement != null)'
    );
  }
  async getSVGElement() {
    await this.svg.waitFor();
    return this.svg;
  }

  getAllCanvasGroupOverlays() {
    return this.canvasGroupOverlays;
  }

  async getLeftCanvasGroupMask() {
    return this.leftCanvasGroupMask;
  }

  async getRightCanvasGroupMask() {
    return this.rightCanvasGroupMask;
  }

  async getFirstCanvasGroupOverlay() {
    const first = this.canvasGroupOverlay.first();
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
      await this.viewMenuCloseButton.click();
      await this.animations.waitFor();
    }
  }

  async clickOnViewMenuButton(): Promise<void> {
    const isPresentAndDisplayed: boolean =
      await this.viewMenuButton.isVisible();
    if (isPresentAndDisplayed) {
      await this.viewMenuButton.click();
      await this.animations.waitFor();
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
    return this.recognizedTextContentHits.first().innerHTML();
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
    await this.openseadragonContainer.dblclick();
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
    await this.animations.waitFor(500);
  }

  async clickPreviousButton(): Promise<void> {
    await this.clickDisableableNavigationButton('navigateBeforeButton');
    await this.animations.waitFor(500);
  }

  async clickNavigationButton(buttonId: string): Promise<void> {
    await this.page.getByTestId(buttonId).click();
  }

  async clickDisableableNavigationButton(buttonId: string): Promise<void> {
    const button: Locator = this.page.getByTestId(buttonId);

    if (await button.isEnabled()) {
      await button.click();
    }
  }

  async isDashboardMode(): Promise<boolean> {
    return (await this.modeDashboard.count()) > 0;
  }

  async isPageMode(): Promise<boolean> {
    return (await this.modePage.count()) > 0;
  }

  async isTwoPageView(): Promise<boolean> {
    const secondPageGroupCount = await this.pageGroup
      .nth(1)
      .locator('rect')
      .count();
    return secondPageGroupCount === 2;
  }

  async isViewDialogOpen(): Promise<boolean> {
    return this.viewMenuDialog.isVisible();
  }

  async isOnePageView(): Promise<boolean> {
    const singlePageGroupCount = await this.pageGroup.count();
    return singlePageGroupCount === 1;
  }

  async isCurrentCanvasGroupFittedViewport(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.boundingBox();
    const overlayDimensions = await overlay.boundingBox();

    if (svgParentDimensions && overlayDimensions) {
      const widthIsFitted = this.numbersAreClose(
        svgParentDimensions.width,
        overlayDimensions.width,
        5
      );
      const heightIsFitted = this.numbersAreClose(
        svgParentDimensions.height,
        overlayDimensions.height,
        5
      );

      return widthIsFitted || heightIsFitted;
    } else {
      throw new Error('Error finding bounding box');
    }
  }

  async isVerticallyCentered(): Promise<boolean> {
    const svgParent = await this.getSVGElement();
    const overlay = await this.getFirstCanvasGroupOverlay();

    const svgParentDimensions = await svgParent.boundingBox();
    const overlayDimensions = await overlay.boundingBox();

    if (svgParentDimensions && overlayDimensions) {
      return (
        Math.round(svgParentDimensions.height) ===
        Math.round(overlayDimensions.height)
      );
    } else {
      throw new Error('Error finding bounding box');
    }
  }

  async sendKeyboardEvent(key: string): Promise<void> {
    await this.setFocusOnViewer();
    await this.page.keyboard.press(key);
    return this.animations.waitFor();
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
    await this.openseadragonCanvas.waitFor();
    await this.page.evaluate(
      `document.querySelectorAll('.openseadragon-canvas')[0].focus();`
    );
  }

  private async checkViewMenuToggle(l: Locator): Promise<void> {
    await this.openViewMenu();

    const isSelected = await this.containClass(l, 'mat-button-toggle-checked');
    if (!isSelected) {
      await l.click();
      await this.animations.waitFor();
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

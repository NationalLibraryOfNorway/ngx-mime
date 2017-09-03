import { browser, element, by, ElementFinder, By } from 'protractor';
import { Utils } from '../helpers/utils';
import { promise, WebElement } from 'selenium-webdriver';

const utils = new Utils();
export class ViewerPage {
  private thumbStartPosition = {x: 600, y: 300};
  private pointerPosition1 = {x: 650, y: 275};
  private pointerPosition2 = {x: 750, y: 200};

  open() {
    return browser.get('');
  }

  contentsDialogButton() {
    return element(by.css('#contentsDialogButton'));
  }

  openSeadragonElement(): ElementFinder {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }

  getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    utils.waitForElement(el);
    return el;
  }

  getAnimationTime(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.animationTime;');
  }

  getHomeZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getHomeZoom();');
  }

  setHomeZoom(): promise.Promise<any> {
    return browser.executeScript('window.openSeadragonViewer.viewport.goHome(true);');
  }

  getZoomLevel(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getZoom(true);');
  }

  setZoomLevel(level: number): promise.Promise<any> {
    return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + level + ');');
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

  getBounds(): promise.Promise<any> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getBounds(true);');
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
    await browser.findElement(By.css('.openseadragon-canvas')).then((canvas: WebElement) => {
      return browser.actions()
        .mouseMove(canvas)
        .doubleClick()
        .perform();
    });
  }

  async dblTap(): Promise<void> {
    await browser.findElement(By.css('.openseadragon-canvas')).then((canvas: WebElement) => {
      return browser.touchActions()
        .doubleTap(canvas)
        .perform();
    });
  }

  async clickZoomInButton(): Promise<void> {
    await this.clickNavigationButton('zoomInButton');
  }

  async clickZoomOutButton(): Promise<void> {
    await this.clickNavigationButton('zoomOutButton');
  }

  async clickNavigationButton(buttonId: string): Promise<void> {
    const button = element(by.id(buttonId));
    utils.waitForElement(button);
    await utils.clickElement(button);
  }

  async waitForAnimation(): Promise<void> {
    await browser.sleep((await this.getAnimationTime()) * 100);
  }
}

export interface Point {
  x: number;
  y: number;
}

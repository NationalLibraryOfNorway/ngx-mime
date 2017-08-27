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

  /*
  Getters & Setters
   */
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

  /*
  Actions
   */
  pinchOut(): promise.Promise<void> {
    return browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition1)
      .move(this.pointerPosition2)
      .perform();
  }

  pinchIn(): promise.Promise<void> {
    return browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition2)
      .move(this.pointerPosition1)
      .perform();
  }

  pan(point) {
    return browser.executeScript(`window.openSeadragonViewer.viewport.panTo({x: ${point.x}, y: ${point.y}});`);
  }

  zoomIn(): promise.Promise<boolean> {
    return this.getZoomLevel().then((currentZoomLevel: number) => {
      const newZoomLevel = currentZoomLevel + 2;
      return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
    });
  }

  zoomOut(): promise.Promise<boolean> {
    return this.getZoomLevel().then((currentZoomLevel: number) => {
      const newZoomLevel = currentZoomLevel - 2;
      return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
    });
  }

  dblClick(): promise.Promise<void> {
    return browser.findElement(By.css('.openseadragon-canvas')).then((canvas: WebElement) => {
      return browser.actions()
        .mouseMove(canvas)
        .doubleClick()
        .perform();
    });
  }

  clickZoomInButton(): Promise<boolean> {
    return this.clickActionButton('Zoom in');
  }

  clickZoomOutButton(): Promise<boolean> {
    return this.clickActionButton('Zoom out');
  }

  clickActionButton(actionButtonTitle: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const divs = element.all(by.css('.openseadragon-container div'));
      utils.waitForElement(divs.first());
      divs.each((div: ElementFinder, index: number) => {
        div.getAttribute('title').then((title: string) => {
          if (title === actionButtonTitle) {
            return divs.get(index).click().then(() => resolve(true));
          }
        });
      });
    });
  }

  waitForAnimation(): promise.Promise<void> {
    return this.getAnimationTime().then(browser.sleep);
  }
}

export interface Point {
  x: number;
  y: number;
}

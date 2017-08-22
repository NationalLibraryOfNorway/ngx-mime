import { browser, element, by, ElementFinder } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {
  private thumbStartPosition = {x: 200, y: 450};
  private pointerPosition1 = {x: 220, y: 400};
  private pointerPosition2 = {x: 500, y: 150};
  open() {
    return browser.get('');
  }

  contentsDialogButton() {
    return element(by.css('#contentsDialogButton'));
  }

  getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }

  setHomeZoomLevel() {
    browser.executeScript('return window.openSeadragonViewer.viewport.getHomeZoom();')
      .then((homeZoom: number) => {
        return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + homeZoom + ');');
      });
  }

  pinchOut() {
    return browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition1)
      .move(this.pointerPosition2)
      .perform();
  }

  pinchIn() {
    return browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition2)
      .move(this.pointerPosition1)
      .perform();
  }

  zoomIn() {
    return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(2);');
  }

  zoomOut() {
    return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(0.5);');
  }

  getZoomLevel() {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getZoom(true);');
  }

  clickZoomInButton() {
    return this.clickActionButton('Zoom in');
  }

  clickZoomOutButton() {
    return this.clickActionButton('Zoom out');
  }

  clickActionButton(action: string) {
    const divs = element.all(by.css('.openseadragon-container div'));
    utils.waitForElement(divs.first());
    divs.each((div: ElementFinder, index: number) => {
      div.getAttribute('title').then((title: string) => {
        if (title === action) {
          return divs.get(index).click();
        }
      });
    });
  }
}

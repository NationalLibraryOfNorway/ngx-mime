import { browser, element, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {

  open() {
    return browser.get('');
  }

  getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }

  zoomOut() {
    browser.touchActions()
      .tapAndHold({x: 10, y: 10})
      .tapAndHold({x: 50, y: 50})
      .move({x: 100, y: 75})
      .perform();
  }

  getZoomLevel() {
    return browser.executeScript('return window.OpenSeadragon.Viewport.getZoom(true);');
  }
}

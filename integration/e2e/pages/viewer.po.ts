import { browser, element, ElementFinder, by } from 'protractor';
import { promise, WebElement } from 'selenium-webdriver';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {

  async open() {
    await browser.restart();
    await browser.manage().window().maximize();
    return browser.get('');
  }

  contentsDialogButton() {
    return element(by.css('#contentsDialogButton'));
  }

  fullscreenButton(): ElementFinder {
    return element(by.css('#fullscreenButton'));
  }

  exitFullscreenButton(): ElementFinder {
    return element(by.css('#exitFullscreenButton'));
  }

  getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }

  getAttribution(): ElementFinder {
    const el = element(by.css('#attribution-container > .contents'));
    utils.waitForElement(el);
    return el;
  }

  isFullscreen(): promise.Promise<boolean> {
    return browser.executeScript('return !window.screenTop && !window.screenY');
  }

}

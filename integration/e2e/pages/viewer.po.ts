import { browser, element, by } from 'protractor';
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

  getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }

  getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    utils.waitForElement(el);
    return el;
  }
}

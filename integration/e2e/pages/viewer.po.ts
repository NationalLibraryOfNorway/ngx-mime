import { browser, element, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {

  async open() {
    await browser.restart();
    return browser.get('');
  }

  contentsDialogButton() {
    return element(by.css('#contentsDialogButton'));
  }

  async getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    await utils.waitForElement(el);
    return el;
  }

  async getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    await utils.waitForElement(el);
    return el.getText();
  }
}

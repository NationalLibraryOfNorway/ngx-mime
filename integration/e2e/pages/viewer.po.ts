import { ElementFinder } from 'protractor/built';
import { browser, element, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {

  async open() {
    await browser.restart();
    return browser.get('');
  }

  async openContentsDialog() {
    await element(by.css('#contentsDialogButton')).click();
    await utils.waitForElement(element(by.css('.contents-container')));
  }

  async getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    await utils.waitForElement(el);
    return el;
  }

  async getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    await utils.waitForElement(el);
    return el;
  }
}

import { browser, element, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {

  static open() {
    return browser.get('');
  }

  static getOpenSeadragon() {
    const el = element(by.css('.openseadragon-container'));
    utils.waitForElement(el);
    return el;
  }
}

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
}

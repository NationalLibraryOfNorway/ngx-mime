import { element, by } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ContentsDialogPage {
  async isOpen() {
    return await utils.isElementVisible(element(by.css('.contents-container')));
  }

  async isClosed() {
    return await utils.isElementInvisible(
      element(by.css('.contents-container'))
    );
  }
}

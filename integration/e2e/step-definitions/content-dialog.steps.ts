import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();

  Given(/^the viewer is in metadata view$/, async () => {
    await page.contentsDialogButton().click();
  });

  Then(/^descriptive metadata are displayed to the user$/, async () => {

  });

});

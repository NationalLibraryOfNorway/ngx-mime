import { Given, Then } from 'cucumber';
import { HelpDialogPage } from '../pages/help-dialog.po';
import { ViewerPage } from '../pages/viewer.po';
const { expect } = require('chai');

const page = new ViewerPage();
const help = new HelpDialogPage();

Given('the help dialog is open', async () => {
  await page.openHelpDialog();
});

Then('help is displayed to the user', async () => {
  const isOpen = await help.isOpen();
  expect(isOpen).to.equal(true);
});

Then('the Help dialog should be {word}', async (state) => {
  const isOpen = await help.isOpen();
  const expectedState = state === 'closed' ? false : true;
  expect(isOpen).to.equal(expectedState);
});

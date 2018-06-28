const { Given, Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from '../pages/viewer.po';
import { browser } from 'protractor';
import { ContentSearchPage } from '../pages/content-search.po';
import { ContentsDialogPage } from '../pages/contents-dialog.po';

const page = new ViewerPage();
const contentSearchPage = new ContentSearchPage();
const contentsDialogPage = new ContentsDialogPage();
let previousCanvasGroupLabel = 1;

Given(/^the viewer is on page (.*)$/, async (canvasGroupIndex: number) => {
  await page.goToCanvasGroup(canvasGroupIndex);
});

Given(/^the user hits key (.*)$/, async (key: string) => {
  previousCanvasGroupLabel = parseInt(
    await page.getCurrentCanvasGroupLabel(),
    10
  );
  await page.sendKeyboardEvent(key);
});

Given(/^the content search dialog is open$/, async () => {
  await page.sendKeyboardEvent('s');
});

Given(/^the contents dialog is open$/, async () => {
  await page.sendKeyboardEvent('c');
});

Then(/^the viewer should go to next page$/, async () => {
  expect(parseInt(await page.getCurrentCanvasGroupLabel(), 10)).to.equal(
    previousCanvasGroupLabel + 1
  );
});

Then(/^the viewer should go to previous page$/, async () => {
  expect(parseInt(await page.getCurrentCanvasGroupLabel(), 10)).to.equal(
    previousCanvasGroupLabel - 1
  );
});

Then(/^the viewer should go to last page$/, async () => {
  expect(parseInt(await page.getCurrentCanvasGroupLabel(), 10)).to.equal(
    await page.getNumberOfCanvasGroups()
  );
});

Then(/^the viewer should go to first page$/, async () => {
  expect(parseInt(await page.getCurrentCanvasGroupLabel(), 10)).to.equal(1);
});

Then(/^the viewer should not change page$/, async () => {
  expect(parseInt(await page.getCurrentCanvasGroupLabel(), 10)).to.equal(
    previousCanvasGroupLabel
  );
});

Then(/^the content search dialog should open$/, async () => {
  expect(await contentSearchPage.isContentSearchDialogOpen()).to.equal(true);
});

Then(/^the content search dialog should close$/, async () => {
  expect(await contentSearchPage.isContentSearchDialogClosed()).to.equal(true);
});

Then(/^the contents dialog should open$/, async () => {
  expect(await contentsDialogPage.isOpen()).to.equal(true);
});

Then(/^the contents dialog should close$/, async () => {
  expect(await contentsDialogPage.isClosed()).to.equal(true);
});

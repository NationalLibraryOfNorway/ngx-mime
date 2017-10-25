import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';
import { browser } from 'protractor';
import { ContentSearchPage } from '../pages/content-search.po';
import { ContentsDialogPage } from '../pages/contents-dialog.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const contentSearchPage = new ContentSearchPage();
  const contentsDialogPage = new ContentsDialogPage();
  let previousPage = 1;

  Given(/^the viewer is on page (.*)$/, async (pageNumber: number) => {
    await page.goToPage(pageNumber);
  });

  Given(/^the user hits key (.*)$/, async (key: string) => {
    previousPage = parseInt(await page.getCurrentPageString(), 10);
    await page.sendKeyboardEvent(key);
  });

  Given(/^the content search dialog is open$/, async () => {
    await page.sendKeyboardEvent('s');
  });

  Given(/^the contents dialog is open$/, async () => {
    await page.sendKeyboardEvent('c');
  });

  Given(/^the user has performed a search$/, async () => {
    await contentSearchPage.setSearchTerm('Gjallarhorn');
    await page.waitForAnimation();
  });

  Then(/^the viewer should go to next page$/, async () => {
    expect(parseInt(await page.getCurrentPageString(), 10)).to.equal(previousPage + 1);
  });

  Then(/^the viewer should go to previous page$/, async () => {
    expect(parseInt(await page.getCurrentPageString(), 10)).to.equal(previousPage - 1);
  });

  Then(/^the viewer should go to last page$/, async () => {
    await browser.sleep(1000);
    expect(parseInt(await page.getCurrentPageString(), 10)).to.equal(await page.getNumberOfPages());
  });

  Then(/^the viewer should go to first page$/, async () => {
    expect(parseInt(await page.getCurrentPageString(), 10)).to.equal(1);
  });

  Then(/^the viewer should not change page$/, async () => {
    expect(parseInt(await page.getCurrentPageString(), 10)).to.equal(previousPage);
  });

  Then(/^the content search dialog should open$/, async () => {
    expect(await contentSearchPage.isOpen()).to.equal(true);
  });

  Then(/^the content search dialog should close$/, async () => {
    expect(await contentSearchPage.isClosed()).to.equal(true);
  });

  Then(/^the contents dialog should open$/, async () => {
    expect(await contentsDialogPage.isOpen()).to.equal(true);
  });

  Then(/^the contents dialog should close$/, async () => {
    expect(await contentsDialogPage.isClosed()).to.equal(true);
  });
});

import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();

  Given(/^the viewer is opened with a publication$/, async () => {
    await page.open();
    expect(await(await page.openSeadragonElement()).isPresent()).to.equal(true);
  });

  Given(/^the viewer is opened with a publication with attribution labels$/, async () => {
    await page.open();
  });

  Given(/^the viewer is opened with a publication with licenses associated with it$/, async () => {
    await page.open();
  });

  Given(/^the viewer is opened with a publication which include a table of contents$/, async () => {
    await page.open();
  });

  Given(/^a (.*) publication with 10 pages$/, async (viewingDirection: string) => {
    if (viewingDirection === 'left-to-right') {
      await page.open('a-ltr-10-pages-book');
    } else if (viewingDirection === 'right-to-left') {
      pending();
    }
  });

  Given(/^the viewer is opened with a publication with the word "Gjallarhorn" 5 times inside$/, async () => {
    await page.open();
  });

  Given(/^the viewer is opened with a publication without the word "Heimdall"$/, async () => {
    await page.open();
  });

  Given(/^the user is on page (.*)$/, async (pageNumber: number) => {
    await page.goToPage(pageNumber - 1);
  });

  Given(/^the viewer is opened with a publication with viewing hint "paged"$/, async () => {
    await page.open('a-ltr-10-pages-book');
  });

  Given(/^the viewer is opened with a publication with viewing hint "individuals"$/, async () => {
    await page.open('a-individuals-manifest');
  });

});

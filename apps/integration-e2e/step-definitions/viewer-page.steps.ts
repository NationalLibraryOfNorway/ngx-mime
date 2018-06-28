const { Given } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from '../pages/viewer.po';

const page = new ViewerPage();

Given('the viewer is opened with a publication', async () => {
  await page.open();
  expect(await (await page.openSeadragonElement()).isPresent()).to.equal(true);
});

Given(
  'the viewer is opened with a publication with attribution labels',
  async () => {
    await page.open();
  }
);

Given(
  'the viewer is opened with a publication with licenses associated with it',
  async () => {
    await page.open();
  }
);

Given(
  'the viewer is opened with a publication which include a table of contents',
  async () => {
    await page.open();
  }
);

Given('a left-to-right publication with {int} pages', async (pages: number) => {
  await page.open('a-ltr-10-pages-book');
});

Given(
  'the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside',
  async () => {
    await page.open();
  }
);

Given(
  'the viewer is opened with a publication without the word "Heimdall"',
  async () => {
    await page.open();
  }
);

Given('the user is on page {int}', async (pageNumber: number) => {
  await page.goToCanvasGroup(pageNumber - 1);
});

Given(
  'the viewer is opened with a publication with viewing hint "paged"',
  async () => {
    await page.open('a-ltr-10-pages-book');
  }
);

Given(
  'the viewer is opened with a publication with viewing hint "individuals"',
  async () => {
    await page.open('a-individuals-manifest');
  }
);

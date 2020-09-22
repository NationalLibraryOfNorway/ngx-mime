const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from '../pages/viewer.po';
import { ElementsPage } from '../pages/elements.po';

const viewerPage = new ViewerPage();
const elementsPage = new ElementsPage();

Given('the viewer is packed as custom elements', async () => {
  viewerPage.setTestCustomElements(true);
});

Given('the viewer is opened with a publication', async () => {
  await viewerPage.open();
  expect(await (await viewerPage.openSeadragonElement()).isPresent()).to.equal(
    true
  );
});

Given(
  'the viewer is opened with a publication with attribution labels',
  async () => {
    await viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication without attribution labels',
  async () => {
    await viewerPage.open('a-non-attribution-manifest');
  }
);

Given(
  'the viewer is opened with a publication with licenses associated with it',
  async () => {
    await viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication which include a table of contents',
  async () => {
    await viewerPage.open();
  }
);

Given('a left-to-right publication with {int} pages', async (pages: number) => {
  await viewerPage.open(`a-ltr-${pages}-pages-book`);
});

Given('a right-to-left publication with {int} pages', async (pages: number) => {
  await viewerPage.open(`a-rtl-${pages}-pages-book`);
});

Given(
  'the viewer is opened with a publication with the word "Gjallarhorn" 45 times inside',
  async () => {
    await viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication without the word "Heimdall"',
  async () => {
    await viewerPage.open();
  }
);

Given('the user is on page {int}', async (pageNumber: number) => {
  await viewerPage.goToCanvasGroup(pageNumber - 1);
});

Given(
  'the viewer is opened with a publication with viewing hint "paged"',
  async () => {
    await viewerPage.open('a-ltr-10-pages-book');
  }
);

Given(
  'the viewer is opened with a publication with viewing hint "individuals"',
  async () => {
    await viewerPage.open('a-individuals-manifest');
  }
);

When('the viewer is opened with a publication in Angular', async () => {
  await viewerPage.open();
});

When('the viewer is opened with a publication in HTML', async () => {
  await elementsPage.open();
});

Then('it should be displayed', async () => {
  expect(await (await viewerPage.openSeadragonElement()).isPresent()).to.equal(
    true
  );
});

const { Given, When, Then } = require('cucumber');
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

const page = new ViewerPage();

When('the user swipe (.*) and the velocity is between (.*)', async (direction: string, velocity: string) => {
  if (direction === 'left-to-right') {
    const start = {
      x: 200,
      y: 0
    };
    const end = {
      x: 0,
      y: 0
    };
    await page.swipe(start, end);
  }
});

When('the user swipe (.*) and the velocity is equal or greater than (.*)', async (direction: string, velocity: string) => {
  return 'pending';
});

When('the user swipe (.*) but the velocity is less than (.*)', async (direction: string, velocity: string) => {
  return 'pending';
});

When('the user drags the page slider to page (.*)', async (pageNumber: number) => {
  await page.slideToPage(pageNumber - 1);
});

Then('page (.*) is displayed', async (pageNumber: string) => {
  const currentPageString = await page.getCurrentPageString();
  expect(currentPageString.includes(pageNumber)).to.eql(true);
});


When('the user click the (.*) button', async (navigationButton: string) => {
  if (navigationButton === 'next') {
    await page.clickNextButton();
  } else if (navigationButton === 'previous') {
    await page.clickPreviousButton();
  }
});

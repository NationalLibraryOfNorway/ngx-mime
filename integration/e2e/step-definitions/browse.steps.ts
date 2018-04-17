const { When, Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

const page = new ViewerPage();

When('the user swipe {string} and the velocity is between {string}', async (direction: string, velocity: string) => {
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

When('the user swipe {string} and the velocity is equal or greater than {string}', async (direction: string, velocity: string) => {
  return 'pending';
});

When('the user swipe {string} but the velocity is less than {string}', async (direction: string, velocity: string) => {
  return 'pending';
});

When('the user drags the page slider to page {int}', async (canvasGroupIndex: number) => {
  await page.slideToCanvasGroup(canvasGroupIndex - 1);
});

When('the user enters {int} in the page dialog', async (canvasGroupIndex: number) => {
  await page.goToCanvasGroupWithDialog(canvasGroupIndex);
});

Then('page {word} is displayed', async (canvasGroupIndex: string) => {
  const currentCanvasGroupString = await page.getCurrentCanvasGroupLabel();
  expect(currentCanvasGroupString.includes(canvasGroupIndex)).to.eql(true);
});

When('the user click the {word} button', async (navigationButton: string) => {
  if (navigationButton === 'next') {
    await page.clickNextButton();
  } else if (navigationButton === 'previous') {
    await page.clickPreviousButton();
  }
});

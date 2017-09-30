import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();

  When(/^the user swipe (.*) and the velocity is between (.*)$/, async (direction: string, velocity: string) => {
    console.log('direction', direction);
    console.log('velocity', velocity);
    if (direction === 'left-to-right') {
      const start = {
        x: 200,
        y: 0
      };
      const end = {
        x: 0,
        y: 0
      };
      page.swipe(start, end);
    }
  });

  When(/^the user swipe (.*) and the velocity is equal or greater than (.*)$/, async (direction: string, velocity: string) => {
    pending();
  });
  When(/^the user swipe (.*) but the velocity is less than (.*)$/, async (direction: string, velocity: string) => {
    pending();
  });

  When(/^the user drags the page slider to page (.*)$/, async (pageNumber: number) => {
    await page.slideToPage(pageNumber - 1);
  });

  Then(/^the content of the page (.*) is displayed$/, async (pageNumber: string) => {
    const currentPageNumber = await page.getCurrentPageNumber();
    expect(currentPageNumber).to.eql(parseInt(pageNumber, 10));
  });


  When(/^the user click the (.*) button$/, async (navigationButton: string,) => {
    if (navigationButton === 'next') {
      await page.clickNextButton();
    } else if (navigationButton === 'previous') {
      await page.clickPreviousButton();
    }
  });
});

import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { ViewerPage } from '../pages/viewer.po';

const page = new ViewerPage();
const zoomLevels = new Set();

When('the user navigates between the pages', async () => {
  for (let i = 0; i < 2; i++) {
    await page.slideToCanvasGroup(i);
    await page.waitForAnimation();
    zoomLevels.add(await page.getZoomLevel());
  }
});

Then(
  "the current page's size should be zoomed to fill the viewer",
  async () => {
    expect(zoomLevels.size).to.equal(2);
  }
);

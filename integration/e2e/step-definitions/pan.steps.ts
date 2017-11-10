import { defineSupportCode } from 'cucumber';
import { expect } from 'chai';

import { ViewerPage, Point } from '../pages/viewer.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  let previousCenter: Point;

  When('the user is dragging', async () => {
    previousCenter = await page.getCenter();
    await page.pan({ x: previousCenter.x + 150, y: 0 });
    await page.waitForAnimation();
  });

  Then('the image is moved inside the view', async () => {
    expect((await page.getCenter()).x).to.be.greaterThan(previousCenter.x);
  });

});

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

  When('the user hits ArrowUp', async () => {
    previousCenter = await page.getCenter();
    await page.sendKeyboardEvent('ArrowUp');
  });

  When('the user hits ArrowRight', async () => {
    previousCenter = await page.getCenter();
    await page.sendKeyboardEvent('ArrowRight');
  });

  Then('the image is moved inside the view', async () => {
    expect((await page.getCenter()).x).not.to.be.equal(previousCenter.x);
  });

  Then('the image is not moved inside the view', async () => {
    expect((await page.getCenter()).y).to.be.equal(previousCenter.y);
  });

});

const { Given, When, Then } = require('cucumber');

import { ViewerPage, Point } from '../pages/viewer.po';
import { expect } from '../helpers/chai-imports';

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

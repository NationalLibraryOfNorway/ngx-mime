import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

const zoomLevels = new Set();

When(
  'the user navigates between the pages',
  async function (this: CustomWorld) {
    for (let i = 0; i < 2; i++) {
      await this.viewerPage.slideToCanvasGroup(i);
      await this.animations.waitFor();
      zoomLevels.add(await this.viewerPage.getZoomLevel());
    }
  }
);

Then(
  "the current page's size should be zoomed to fill the viewer",
  async function (this: CustomWorld) {
    expect(zoomLevels.size).toEqual(2);
  }
);

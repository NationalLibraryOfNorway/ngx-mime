import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { Given, Then, When } from '../support/fixtures';

// 300ms is the time the animation is set up to use but we need some extra time
const switchAnimationTime = 1700;

Given('the viewer is in dashboard view', async function (this: CustomWorld) {
  await this.viewerPage.setDashboardMode();
  await expect(this.viewerPage.modeDashboard).toBeVisible();
});

Given('the viewer is in page view', async function (this: CustomWorld) {
  await this.viewerPage.setPageMode();
  await expect(this.viewerPage.modePage).toBeVisible();
});

When('the user click in the viewer', async function (this: CustomWorld) {
  // TODO click page.getSVGElement() insted of first overlay
  // to be able to switch view mode when firste page is out of view
  const overlay = await this.viewerPage.getSVGElement();
  await overlay.click();
  await this.animations.waitFor(switchAnimationTime);
});

Then(
  'the viewer should change to page view',
  async function (this: CustomWorld) {
    await expect(this.viewerPage.modePage).toBeVisible();
  },
);

Given('the viewer should be in page view', async function (this: CustomWorld) {
  await expect(this.viewerPage.modePage).toBeVisible();
});

Then(
  'the viewer should change to dashboard view',
  async function (this: CustomWorld) {
    await expect(this.viewerPage.modeDashboard).toBeVisible();
  },
);

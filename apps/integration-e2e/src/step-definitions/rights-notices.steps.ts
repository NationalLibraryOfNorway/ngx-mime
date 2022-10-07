import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Then('the attribution must be shown', async function (this: CustomWorld) {
  await expect(this.viewerPage.attributionEl).toContainText(
    'This is a test attribution'
  );

  await this.viewerPage.openContentsDialog();
  await expect(this.metadataPage.attributionEl).toContainText(
    'This is a test attribution'
  );
});

Then(
  'the license must be shown as hyperlinks',
  async function (this: CustomWorld) {
    await this.viewerPage.openContentsDialog();
    await expect(this.metadataPage.licenseEl).toContainText(
      'https://beta.nb.no/lisens/cc0'
    );
  }
);

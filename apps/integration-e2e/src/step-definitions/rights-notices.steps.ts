import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Then('the attribution must be shown', async function (this: CustomWorld) {
  await expect(this.viewerPage.attribution).toContainText(
    'This is a test attribution'
  );

  await this.viewerPage.openInformationDialog();
  await expect(this.metadataPage.attribution).toContainText(
    'This is a test attribution'
  );
});

Then(
  'the license must be shown as hyperlinks',
  async function (this: CustomWorld) {
    await this.viewerPage.openInformationDialog();
    await expect(this.metadataPage.license).toContainText(
      'https://beta.nb.no/lisens/cc0'
    );
  }
);

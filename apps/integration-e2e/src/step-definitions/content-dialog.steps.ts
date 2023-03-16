import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('the viewer is in metadata view', async function (this: CustomWorld) {
  await this.viewerPage.openInformationDialog();
});

Given(
  'the viewer is in table of contents view',
  async function (this: CustomWorld) {
    await this.viewerPage.openInformationDialog();
    await this.viewerPage.openTableOfContentsTab();
  }
);

When('the user selects "Tittelside"', async function (this: CustomWorld) {
  this.tocPage.tocLink.nth(1).click();
  await this.animations.waitFor();
});

Then(
  'descriptive metadata are displayed to the user',
  async function (this: CustomWorld) {
    await expect(this.metadataPage.metadata).toHaveCount(7);
  }
);

Then(
  'table of contents are displayed to the user',
  async function (this: CustomWorld) {
    await expect(this.tocPage.tocLink).toHaveCount(3);
  }
);

Then(
  'the viewer should go to page {word}',
  async function (this: CustomWorld, pageNumber: string) {
    const currentCanvasGroupString =
      await this.viewerPage.getCurrentCanvasGroupLabel();
    expect(currentCanvasGroupString.includes(pageNumber)).toBeTruthy();
  }
);

Then(
  'the Contents dialog should be {word}',
  async function (this: CustomWorld, state: string) {
    if (state === 'closed') {
      await expect(this.informationDialogPage.container).toBeHidden();
    } else {
      await expect(this.informationDialogPage.container).toBeVisible();
    }
  }
);

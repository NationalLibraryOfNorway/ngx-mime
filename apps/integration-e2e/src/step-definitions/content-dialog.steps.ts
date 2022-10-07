import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('the viewer is in metadata view', async function (this: CustomWorld) {
  await this.viewerPage.openContentsDialog();
});

Given(
  'the viewer is in table of contents view',
  async function (this: CustomWorld) {
    await this.viewerPage.openContentsDialog();
    await this.utils.waitForAnimation();
    await this.viewerPage.openTableOfContentsTab();
    await this.utils.waitForAnimation();
  }
);

When('the user selects "Tittelside"', async function (this: CustomWorld) {
  await this.tocPage.clickToc(1);
  await this.utils.waitForAnimation();
});

Then(
  'descriptive metadata are displayed to the user',
  async function (this: CustomWorld) {
    const metadatas = await this.metadataPage.getAll();
    expect(metadatas.length).toEqual(7);
  }
);

Then(
  'table of contents are displayed to the user',
  async function (this: CustomWorld) {
    const tocs = await this.tocPage.getAll();
    expect(tocs.length).toEqual(3);
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
    const isOpen = await this.contentsPage.isOpen();
    const expectedState = state === 'closed' ? false : true;
    expect(isOpen).toEqual(expectedState);
  }
);

import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given(
  'the viewer is packed as custom elements',
  async function (this: CustomWorld) {
    this.viewerPage.setTestCustomElements(true);
  }
);

Given(
  'the viewer is opened with a publication',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
    expect(
      await (await this.viewerPage.openSeadragonElement()).isVisible()
    ).toBeTruthy();
  }
);

Given(
  'the viewer is opened with a publication with attribution labels',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication without attribution labels',
  async function (this: CustomWorld) {
    await this.viewerPage.open('a-non-attribution-manifest');
  }
);

Given(
  'the viewer is opened with a publication with licenses associated with it',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication which include a table of contents',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

Given(
  'a {word} publication with {int} pages',
  async function (this: CustomWorld, direction: string, pages: number) {
    const readingDirection = direction === 'left-to-right' ? 'ltr' : 'rtl';
    await this.viewerPage.open(
      `a-${readingDirection}-${pages}-pages-book`
    );
  }
);

Given(
  'the viewer is opened with a publication with the word "africa" 7 times inside',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

Given(
  'the viewer is opened with a publication without the word "Heimdall"',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

Given(
  'the user is on page {int}',
  async function (this: CustomWorld, pageNumber: number) {
    await this.viewerPage.goToCanvasGroup(pageNumber - 1);
  }
);

Given(
  'the viewer is opened with a publication with viewing hint {string}',
  async function (this: CustomWorld, viewingHint: string) {
    const manifest =
      viewingHint === 'paged'
        ? 'a-ltr-10-pages-book'
        : 'a-individuals-manifest';
    await this.viewerPage.open(manifest);
  }
);

Given(
  'the viewer is opened with a publication with viewing hint {string} on page {int}',
  async function (this: CustomWorld, viewingHint: string, canvasIndex: number) {
    const manifest =
      viewingHint === 'paged'
        ? 'a-ltr-10-pages-book'
        : 'a-individuals-manifest';

    await this.viewerPage.open(manifest, canvasIndex);
  }
);

Given(
  'the viewer is in {word} mode',
  async function (this: CustomWorld, mode: string) {
    mode === 'dark'
      ? this.elementsPage.setDarkMode()
      : this.elementsPage.setLightMode();
  }
);

When(
  'the viewer is opened with a publication in Angular',
  async function (this: CustomWorld) {
    await this.viewerPage.open();
  }
);

When(
  'the viewer is opened with a publication in HTML',
  async function (this: CustomWorld) {
    await this.elementsPage.open();
  }
);

When(
  'the viewer is opened with a publication in HTML with attribution labels',
  async function (this: CustomWorld) {
    await this.elementsPage.open();
  }
);

Then('it should be displayed', async function (this: CustomWorld) {
  await expect(await this.viewerPage.openSeadragonElement()).toBeVisible();
});

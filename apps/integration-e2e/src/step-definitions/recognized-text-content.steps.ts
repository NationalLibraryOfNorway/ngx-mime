import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given(
  'the viewer is opened with a publication with recognized text content',
  async function (this: CustomWorld) {
    await this.viewerPage.open(['a-recognized-text-book']);
  },
);

Given(
  'the user has enabled recognized text content only',
  async function (this: CustomWorld) {
    await this.viewerPage.showOnlyRecognizedTextContent();
  },
);

When(
  'the user enables recognized text content in split view',
  async function (this: CustomWorld) {
    await this.viewerPage.showRecognizedTextContentInSplitView();
  },
);

When(
  'the user enables recognized text content only',
  async function (this: CustomWorld) {
    await this.viewerPage.showOnlyRecognizedTextContent();
  },
);

When(
  'the user closes the recognized text content',
  async function (this: CustomWorld) {
    await this.viewerPage.closeRecognizedTextContent();
  },
);

Then(
  'the user should be able to enable recognized text content',
  async function (this: CustomWorld) {
    await this.viewerPage.openViewMenu();

    expect(
      await this.viewerPage.isRecognizedTextContentButtonsPresent(),
    ).toBeTruthy();
  },
);

Then(
  'both the digital pages and the recognized text content should be shown',
  async function (this: CustomWorld) {
    const recognizedTextContent =
      await this.viewerPage.getRecognizedTextContent();
    const isRecognizedTextContentInSplitView =
      await this.viewerPage.isRecognizedTextContentInSplitView();

    expect(isRecognizedTextContentInSplitView).toBeTruthy();
    expect(recognizedTextContent.length).toBeGreaterThan(0);
  },
);

Then(
  'only the recognized text content should be shown',
  async function (this: CustomWorld) {
    const recognizedTextContent =
      await this.viewerPage.getRecognizedTextContent();
    const isRecognizedTextContentOnly =
      await this.viewerPage.isRecognizedTextContentOnly();

    expect(isRecognizedTextContentOnly).toBeTruthy();
    expect(recognizedTextContent.length).toBeGreaterThan(0);
  },
);

Then(
  'the recognized text content should be hidden',
  async function (this: CustomWorld) {
    const recognizedTextContent =
      await this.viewerPage.getRecognizedTextContent();

    expect(recognizedTextContent).toBeFalsy();
  },
);

Then(
  'the word {string} should be highlighted in the recognized text',
  async function (this: CustomWorld, term: string) {
    const firstHit = await this.viewerPage.getRecognizedContentHit(0);
    expect(firstHit).toContain(`${term}`);
  },
);

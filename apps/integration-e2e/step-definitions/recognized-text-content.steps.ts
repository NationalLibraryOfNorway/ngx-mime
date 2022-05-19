import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { ViewerPage } from '../pages/viewer.po';

const viewerPage = new ViewerPage();

Given(
  'the viewer is opened with a publication with recognized text content',
  async () => {
    await viewerPage.open('a-recognized-text-book');
  }
);

Given('the user has enabled recognized text content only', async () => {
  await viewerPage.showOnlyRecognizedTextContent();
});

When('the user enables recognized text content in split view', async () => {
  await viewerPage.showRecognizedTextContentInSplitView();
});

When('the user enables recognized text content only', async () => {
  await viewerPage.showOnlyRecognizedTextContent();
});

When('the user closes the recognized text content', async () => {
  await viewerPage.closeRecognizedTextContent();
});

Then('the user should be able to enable recognized text content', async () => {
  await viewerPage.openViewMenu();

  expect(await viewerPage.isRecognizedTextContentButtonsPresent()).to.be.true;
});

Then(
  'both the digital pages and the recognized text content should be shown',
  async () => {
    const recognizedTextContent = await viewerPage.getRecognizedTextContent();
    const isRecognizedTextContentInSplitView =
      await viewerPage.isRecognizedTextContentInSplitView();

    expect(isRecognizedTextContentInSplitView).to.be.true;
    expect(recognizedTextContent).not.to.be.undefined;
    expect(recognizedTextContent).to.have.length.above(0);
  }
);

Then('only the recognized text content should be shown', async () => {
  const recognizedTextContent = await viewerPage.getRecognizedTextContent();
  const isRecognizedTextContentOnly =
    await viewerPage.isRecognizedTextContentOnly();

  expect(isRecognizedTextContentOnly).to.be.true;
  expect(recognizedTextContent).not.to.be.undefined;
  expect(recognizedTextContent).to.have.length.above(0);
});

Then('the recognized text content should be hidden', async () => {
  const recognizedTextContent = await viewerPage.getRecognizedTextContent();

  expect(recognizedTextContent).to.be.undefined;
});

Then(
  'the word {string} should be highlighted in the recognized text',
  async (term: string) => {
    const hits = await viewerPage.getRecognizedContentHits();
    const firstHit = await hits[0].getAttribute('innerHTML');
    expect(firstHit).to.contains(`${term}`);
  }
);

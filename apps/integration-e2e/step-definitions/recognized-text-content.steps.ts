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

When('the user enables recognized text content in sidenav', async () => {
  await viewerPage.enableRecognizedTextContentInSideContent();
});

When('the user enables recognized text content in main', async () => {
  await viewerPage.enableRecognizedTextContentInMainContent();
});

When('the user closes the recognized text content', async () => {
  await viewerPage.enableRecognizedTextContentClose();
});

Then('the user should be able to enable recognized text content', async () => {
  expect(await viewerPage.isRecognizedTextContentButtonsPresent()).to.be.true;
});

Then('the recognized text content should be shown in sidenav', async () => {
  const recognizedTextContent = await viewerPage.getRecognizedTextContent();
  const isRecognizedTextContentInSideContent =
    await viewerPage.isRecognizedTextContentInSideContent();

  expect(isRecognizedTextContentInSideContent).to.be.true;
  expect(recognizedTextContent).not.to.be.undefined;
  expect(recognizedTextContent).to.have.length.above(0);
});

Then('the recognized text content should be shown in main', async () => {
  const text = await viewerPage.getRecognizedTextContent();
  const isRecognizedTextContentInMainContent =
    await viewerPage.isRecognizedTextContentInMain();

  expect(isRecognizedTextContentInMainContent).to.be.true;
  expect(text).not.to.be.undefined;
  expect(text).to.have.length.above(0);
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

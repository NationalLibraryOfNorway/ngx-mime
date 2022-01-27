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

When('the user enables recognized text content', async () => {
  await viewerPage.enableRecognizedTextContent();
});

Then('the user should be able to enable recognized text content', async () => {
  expect(await viewerPage.isRecognizedTextContentButtonPresent()).to.be.true;
});

Then('the recognized text content should be shown', async () => {
  const text = await viewerPage.getRecognizedTextContent();

  expect(text).not.to.be.undefined;
  expect(text).to.have.length.above(0);
});

Then('the word {string} should be highlighted in the recognized text', async (term: string) => {
  const hits = await viewerPage.getRecognizedContentHits();
  const firstHit = await hits[0].getAttribute('innerHTML');
  expect(firstHit).to.contains(`${term}`);
});
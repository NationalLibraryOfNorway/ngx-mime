import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { ViewerPage } from '../pages/viewer.po';

const viewerPage = new ViewerPage();

Given(
  'the viewer is opened with a publication with recognized text',
  async () => {
    await viewerPage.open('a-recognized-text-book');
  }
);

When('the user enables text content display', async () => {
  await viewerPage.enableRecognizedTextDisplay();
});

Then('the user should be able to enable text content display', async () => {
  expect(await viewerPage.haveRecognizedTextToggle()).to.be.true;
});

Then('the text content should be shown', async () => {
  const text = await viewerPage.getRecognizedText();

  expect(text).not.to.be.undefined;
  expect(text).to.have.length.above(0);
});

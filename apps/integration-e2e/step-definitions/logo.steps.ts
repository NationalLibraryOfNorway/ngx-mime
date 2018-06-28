const { Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

const viewer = new ViewerPage();
const metadata = new MetadataPage();

Then(
  'the logo associated with the resource are displayed to the user',
  async () => {
    expect(await metadata.isLogoDisplayed()).to.equal(true);
  }
);

import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, Then }) {
  const viewer = new ViewerPage();
  const metadata = new MetadataPage();

  Then(/the attribution must be shown$/, async () => {
    const pageAttribution = await viewer.getAttribution();
    await viewer.openContentsDialog();
    const metadataAttribution = await metadata.getAttribution();

    expect(pageAttribution.getText()).to.eventually.equal('This is a test attribution');
    expect(metadataAttribution.getText()).to.eventually.equal('This is a test attribution');
  });

  Then(/the license must be shown as hyperlinks$/, async () => {
    await viewer.openContentsDialog();
    const license = await metadata.getLicense();

    expect(license.getText()).to.eventually.equal('https://beta.nb.no/lisens/copyright');
  });

});

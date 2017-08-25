import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, Then }) {
  const viewer = new ViewerPage();
  const metadata = new MetadataPage();

  Then(/the attribution must be shown$/, async () => {
    const pageAttribution = viewer.getAttribution();
    await viewer.contentsDialogButton().click();
    const metadataAttribution = metadata.getAttribution();

    expect(await pageAttribution.getText()).to.equal('This is a test attribution');
    expect(await metadataAttribution.getText()).to.equal('This is a test attribution');
  });

  Then(/the license must be shown as hyperlinks$/, async () => {
    await viewer.contentsDialogButton().click();
    const license = metadata.getLicense();

    expect(await license.getText()).to.equal('https://beta.nb.no/lisens/copyright');
  });

});

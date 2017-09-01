import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();
  const metadata = new MetadataPage();

  Given(/^the viewer is in metadata view$/, async () => {
    await page.openContentsDialog();
  });

  Then(/^descriptive metadata are displayed to the user$/, async () => {
    const metadatas = await metadata.getAll();
    expect(metadatas.length).to.equal(10);
  });

});

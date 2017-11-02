import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser } from 'protractor';

import { ViewerPage } from '../pages/viewer.po';
import { MetadataPage } from '../pages/metadata.po';
import { TableOfContentsPage } from '../pages/table-of-contents.po';

defineSupportCode(function ({ Given, Then, When }) {
  const page = new ViewerPage();
  const metadata = new MetadataPage();
  const toc = new TableOfContentsPage();

  Given(/^the viewer is in metadata view$/, async () => {
    await page.openContentsDialog();
  });

  Given(/^the viewer is in table of contents view$/, async () => {
    await page.openContentsDialog();
    await page.openTableOfContentsTab();
  });

  When(/^the user selects "Tittelside"$/, async () => {
    await toc.clickToc(1);
    await browser.sleep(2000); // Waiting for animation to complete. page.getAnimationTimeInSec() wasn't enough.
  });

  Then(/^descriptive metadata are displayed to the user$/, async () => {
    const metadatas = await metadata.getAll();
    expect(metadatas.length).to.equal(7);
  });

  Then(/^table of contents are displayed to the user$/, async () => {
    const tocs = await toc.getAll();
    expect(tocs.length).to.equal(3);
  });

  Then(/^the viewer should go to page (.*)$/, async (pageNumber: string) => {
    const currentPageString = await page.getCurrentPageString();
    expect(currentPageString.includes(pageNumber)).to.eql(true);
  });
});

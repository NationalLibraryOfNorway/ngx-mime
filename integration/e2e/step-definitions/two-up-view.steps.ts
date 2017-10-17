import { ViewerPage } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { browser, by } from 'protractor';
import { Utils } from '../helpers/utils';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();
  const utils = new Utils();
  // 300ms is the time the animation is set up to use but we need some extra time
  const switchAnimationTime = 1700;

  Then(/^only the cover page is displayed/, async () => {
    const visiblePages = await page.visiblePages();
    // Firste page visible
    expect(visiblePages[0]).to.equal(true);
    // Rest of the pages should not be visible
    visiblePages.splice(0, 1);
    expect(visiblePages).to.not.include(true);
  });

  Then(/^page 2 and 3 are displayed/, async () => {
    const visiblePages = await page.visiblePages();
    // Second and third pages visible
    expect(visiblePages[1]).to.equal(true);
    expect(visiblePages[2]).to.equal(true);

    // Rest of the pages should not be visible
    visiblePages.splice(1, 2);
    expect(visiblePages).to.not.include(true);
  });

  Then(/^only page 2 is displayed/, async () => {
    const visiblePages = await page.visiblePages();
    // Second page visible
    expect(visiblePages[1]).to.equal(true);

    // Rest of the pages should not be visible
    visiblePages.splice(1, 2);
    expect(visiblePages).to.not.include(true);
  });

});

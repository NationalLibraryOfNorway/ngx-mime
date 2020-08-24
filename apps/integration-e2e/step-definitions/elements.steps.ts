import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { ViewerPage } from '../pages/viewer.po';

const page = new ViewerPage();

When(
  'the viewer packed as custom elements is opened with a publication',
  async () => {
    page.setTestCustomElements(true);
    await page.open();
  }
);

Then('it should be displayed', async state => {
  expect(await (await page.openSeadragonElement()).isPresent()).to.equal(true);
  expect(await (await page.customElements()).isPresent()).to.equal(true);
});

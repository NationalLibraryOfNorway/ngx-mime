import { ElementsPage } from './elements.po';

describe('workspace-project Elements', () => {
  let page: ElementsPage;

  beforeEach(() => {
    page = new ElementsPage();
  });

  it('should ha a app-mime-viewer', async () => {
    await page.navigateTo();
    const isPresent = await page.getViewer().isPresent();
    console.log(isPresent);

    expect(isPresent).toBe(true);
  });
});

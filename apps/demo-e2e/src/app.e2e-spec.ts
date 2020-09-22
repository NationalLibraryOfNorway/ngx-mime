import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should hava a h1', async () => {
    page.navigateTo();
    expect(await page.getHeadingText()).toEqual('DemoWeb');
  });
});

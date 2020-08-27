import { ElementsPage } from './elements.po';

describe('workspace-project App', () => {
  let page: ElementsPage;

  beforeEach(() => {
    page = new ElementsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('MANIFEST');
  });
});

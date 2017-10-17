import { element, by } from 'protractor';

export class TableOfContentsPage {
  async getAll() {
    const tocs: TOC[] = [];
    const tocLinks = element.all(by.css('.toc-link'));
    const count = await tocLinks.count();
    for (let i = 0; i < count; i++) {
      const toc = tocLinks.get(i);
      const label = await toc.element(by.css('.label')).getText();
      const pageNumber = await toc.element(by.css('.pageNumber')).getText();
      tocs.push(new TOC({label: label, canvasIndex: Number(pageNumber)}));
    }

    return tocs;
  }

  async clickToc(index: number) {
    await element.all(by.css('.toc-link')).get(index).click();
  }

  async getTocElement(index: number) {
    return await element.all(by.css('.toc-link')).get(index);
  }
}

export class TOC {
  public label?: string;
  public canvasIndex?: number;

  constructor(public fields?: {
    label?: string;
    canvasIndex?: number;
  }) {
    if (fields) {
      this.label = fields.label || this.label;
      this.canvasIndex = fields.canvasIndex;
    }
  }
}

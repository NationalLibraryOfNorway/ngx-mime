import { by, element } from 'protractor';

export class TOC {
  public label?: string;
  public canvasIndex?: number;

  constructor(
    public fields?: {
      label?: string;
      canvasIndex?: number;
    }
  ) {
    if (fields) {
      this.label = fields.label || this.label;
      this.canvasIndex = fields.canvasIndex;
    }
  }
}

export class TableOfContentsPage {
  async getAll() {
    const tocs: TOC[] = [];
    const tocLinks = element.all(by.css('.toc-link'));
    const count = await tocLinks.count();
    for (let i = 0; i < count; i++) {
      const toc = tocLinks.get(i);
      const label = await toc.element(by.css('.label')).getText();
      const canvasGroupIndex = await toc
        .element(by.css('.canvasGroupIndex'))
        .getText();
      tocs.push(
        new TOC({ label: label, canvasIndex: Number(canvasGroupIndex) })
      );
    }

    return tocs;
  }

  async clickToc(index: number) {
    const el = await element.all(by.css('.toc-link')).get(index);
    await el.click();
  }

  async getTocElement(index: number) {
    return await element.all(by.css('.toc-link')).get(index);
  }
}

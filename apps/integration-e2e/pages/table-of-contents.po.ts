import { by, element, ElementArrayFinder } from 'protractor';

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
  private tocLinkEls: ElementArrayFinder;

  constructor() {
    this.tocLinkEls = element.all(by.css('.toc-link'));
  }

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
    const el = this.getTocElement(index);
    if (el) {
      return el.click();
    } else {
      throw new Error('Toc link not found');
    }
  }

  getTocElement(index: number) {
    return this.tocLinkEls.get(index);
  }
}

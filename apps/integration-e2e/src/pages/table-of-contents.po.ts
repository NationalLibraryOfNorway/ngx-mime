import { Locator, Page } from 'playwright';
import { ParameterType } from '../support/ParameterType';

export class TOC {
  public label?: string | null;
  public canvasIndex?: number;

  constructor(
    public fields?: {
      label?: string | null;
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
  readonly page: Page;
  readonly parameters: ParameterType;
  private tocLinkEls: Locator;

  constructor(parameters: ParameterType, page: Page) {
    this.page = page;
    this.parameters = parameters;
    this.tocLinkEls = page.locator('.toc-link');
  }

  async getAll() {
    const tocs: TOC[] = [];
    const count = await this.tocLinkEls.count();
    for (let i = 0; i < count; i++) {
      const toc = this.tocLinkEls.nth(i);
      const label = await toc.locator('.label').textContent();
      const canvasGroupIndex = await toc
        .locator('.canvasGroupIndex')
        .textContent();
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
    return this.tocLinkEls.nth(index);
  }
}

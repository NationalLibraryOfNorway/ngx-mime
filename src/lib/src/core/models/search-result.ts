import { Rect } from './rect';

export class SearchResult {
  public q: string;
  public hits: Hit[] = [];

  constructor(
    fields?: {
      q?: string;
      hits?: Hit[];
    }
  ) {
    if (fields) {
      this.q = fields.q || this.q;
      this.hits = fields.hits || this.hits;
    }
  }

  public add(hit: Hit): void {
    this.hits.push(hit);
  }

  public size(): number {
    return this.hits.length;
  }
}

export class Hit {
  public index = 0;
  public label: string;
  public match: string;
  public before: string;
  public after: string;
  public rect: Rect;

  constructor(
    fields?: {
      index?: number;
      label?: string;
      match?: string;
      before?: string;
      after?: string;
      rect?: Rect;
    }
  ) {
    if (fields) {
      this.index = fields.index || this.index;
      this.label = fields.label || this.label;
      this.match = fields.match || this.match;
      this.before = fields.before || this.before;
      this.after = fields.after || this.after;
      this.rect = fields.rect || this.rect;
    }
  }
}

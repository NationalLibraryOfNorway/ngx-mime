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

  public get(index: number): Hit {
    return new Hit({
      ...this.hits[index]
    });
  }

  public size(): number {
    return this.hits.length;
  }

  public last(): Hit {
    return this.get(this.size() - 1);
  }
}

export class Hit {
  public id = 0;
  public index = 0;
  public label: string;
  public match: string;
  public before: string;
  public after: string;
  public rects: Rect[];

  constructor(
    fields?: {
      id?: number;
      index?: number;
      label?: string;
      match?: string;
      before?: string;
      after?: string;
      rects?: Rect[];
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.index = fields.index || this.index;
      this.label = fields.label || this.label;
      this.match = fields.match || this.match;
      this.before = fields.before || this.before;
      this.after = fields.after || this.after;
      this.rects = fields.rects || this.rects;
    }
  }
}

export class SearchResult {
  public hits: Hit[] = [];

  constructor(
    fields?: {
      hits?: Hit[]
    }
  ) {
    if (fields) {
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

  constructor(
    fields?: {
      index?: number;
      label?: string;
      match?: string;
      before?: string;
      after?: string;
    }
  ) {
    if (fields) {
      this.index = fields.index || this.index;
      this.label = fields.label || this.label;
      this.match = fields.match || this.match;
      this.before = fields.before || this.before;
      this.after = fields.after || this.after;
    }
  }
}

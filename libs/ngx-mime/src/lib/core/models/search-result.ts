import { Hit } from './hit';

export class SearchResult {
  public q = '';
  public hits: Hit[] = [];

  constructor(fields?: { q?: string; hits?: Hit[] }) {
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
      ...this.hits[index],
    });
  }

  public size(): number {
    return this.hits.length;
  }

  public last(): Hit {
    return this.get(this.size() - 1);
  }
}

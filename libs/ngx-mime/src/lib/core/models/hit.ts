import { Rect } from './rect';

export class Hit {
  public id = 0;
  public index = 0;
  public label = '';
  public match = '';
  public before = '';
  public after = '';
  public rects: Rect[] = [];

  constructor(fields?: {
    id?: number;
    index?: number;
    label?: string;
    match?: string;
    before?: string;
    after?: string;
    rects?: Rect[];
  }) {
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

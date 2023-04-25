import { HighlightRect } from './highlight-rect';

export class Hit {
  public id = 0;
  public index = 0;
  public label = '';
  public match = '';
  public before = '';
  public after = '';
  public highlightRects: HighlightRect[] = [];

  constructor(fields?: {
    id?: number;
    index?: number;
    label?: string;
    match?: string;
    before?: string;
    after?: string;
    highlightRects?: HighlightRect[];
  }) {
    if (fields) {
      this.id = fields.id || this.id;
      this.index = fields.index || this.index;
      this.label = fields.label || this.label;
      this.match = fields.match || this.match;
      this.before = fields.before || this.before;
      this.after = fields.after || this.after;
      this.highlightRects = fields.highlightRects || this.highlightRects;
    }
  }
}

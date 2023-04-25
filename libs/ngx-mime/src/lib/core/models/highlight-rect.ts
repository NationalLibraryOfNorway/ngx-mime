import { Rect } from './rect';

export class HighlightRect extends Rect {
  public canvasIndex = 0;

  constructor(fields?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    canvasIndex?: number;
  }) {
    super();
    if (fields) {
      this.x = fields.x || this.x;
      this.y = fields.y || this.y;
      this.width = fields.width || this.width;
      this.height = fields.height || this.height;
      this.centerX = this.x + this.width / 2;
      this.centerY = this.y + this.height / 2;
      this.canvasIndex = fields.canvasIndex || this.canvasIndex;
    }
  }
}

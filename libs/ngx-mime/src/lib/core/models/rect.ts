export class Rect {
  public x? = 0;
  public y? = 0;
  public width? = 0;
  public height? = 0;
  public centerX? = 0;
  public centerY? = 0;

  constructor(fields?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }) {
    if (fields) {
      this.x = fields.x || this.x;
      this.y = fields.y || this.y;
      this.width = fields.width || this.width;
      this.height = fields.height || this.height;
      this.centerX = this.x + this.width / 2;
      this.centerY = this.y + this.height / 2;
    }
  }
}

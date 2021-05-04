export class Dimensions {
  bottom = 0;
  height = 0;
  left = 0;
  right = 0;
  top = 0;
  width = 0;

  constructor(fields?: {
    bottom?: number;
    height?: number;
    left?: number;
    right?: number;
    top?: number;
    width?: number;
  }) {
    if (fields) {
      this.bottom = fields.bottom || this.bottom;
      this.height = fields.height || this.height;
      this.left = fields.left || this.left;
      this.right = fields.right || this.right;
      this.top = fields.top || this.top;
      this.width = fields.width || this.width;
    }
  }
}

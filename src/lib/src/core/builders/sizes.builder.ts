import { Size } from '../models/manifest';

export class SizesBuilder {
  constructor(private sizes: any[]) {}

  build(): Size[] {
    const sizes: Size[] = [];
    if (this.sizes) {
      for (let i = 0; i < this.sizes.length; i++) {
        const size = this.sizes[i];
        sizes.push(new Size(size.width, size.height));
      }
    }
    return sizes;
  }
}

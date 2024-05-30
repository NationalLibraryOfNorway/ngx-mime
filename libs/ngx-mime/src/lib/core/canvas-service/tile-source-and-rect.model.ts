import { Rect } from '../models/rect';

export interface CanvasGroup {
  rect: Rect;
  tileSourceAndRects: TileSourceAndRect[];
}

export interface TileSourceAndRect {
  tileSource: any;
  rect: Rect;
}

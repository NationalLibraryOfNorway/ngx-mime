import { Rect } from '../models/rect';

export interface CanvasGroup {
  rect: Rect;
  canvases: TileSourceAndRect[];
}

export interface TileSourceAndRect {
  tileSource: any;
  rect: Rect;
}

import { Rect } from '../models/rect';
import { Service } from '../models/manifest';

export interface CanvasGroupPositionCriteria {
  canvasGroupIndex: number;
  canvasSource: Service;
  previousCanvasGroupPosition?: Rect;
}

export interface CalculateCanvasGroupPositionStrategy {
  calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria): Rect;
}

import { Service } from '../models/manifest';
import { Rect } from '../models/rect';
import { ViewingDirection } from '../models/viewing-direction';

export interface CanvasGroupPositionCriteria {
  canvasGroupIndex: number;
  canvasSource: Service;
  previousCanvasGroupPosition?: Rect;
  viewingDirection: ViewingDirection;
}

export interface CalculateCanvasGroupPositionStrategy {
  calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria, rotation: number): Rect;
}

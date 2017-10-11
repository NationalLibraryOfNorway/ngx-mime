import { Rect } from '../models/rect';
import { Service } from '../models/manifest';
export interface PagePositionCriteria {
  pageIndex: number;
  pageSource: Service;
  previousPagePosition?: Rect;
}

export interface CalculatePagePositionStrategy {
  calculatePagePosition(criteria: PagePositionCriteria): Rect;
}

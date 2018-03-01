import { Direction } from '../models/direction';

export interface NextCanvasGroupCriteria {
  speed?: number;
  pageEndHitCountReached?: boolean;
  direction: Direction;
  currentCanvasGroupIndex: number;
  currentCanvasGroupCenter: number;
}

export interface CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number;
}

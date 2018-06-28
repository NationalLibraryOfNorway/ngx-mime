import { Direction } from '../models/direction';

export interface NextCanvasGroupCriteria {
  speed?: number;
  canvasGroupEndHitCountReached?: boolean;
  direction: Direction;
  currentCanvasGroupIndex: number;
  currentCanvasGroupCenter: number;
}

export interface CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number;
}

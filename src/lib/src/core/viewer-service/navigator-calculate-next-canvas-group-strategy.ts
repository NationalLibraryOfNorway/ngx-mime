import { Direction } from '../models/direction';
import { CalculateNextCanvasGroupStrategy, NextCanvasGroupCriteria } from './calculate-next-canvas-group-strategy';

export class NavigatorCalculateNextPageStrategy implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentCanvasGroupIndex;

    let nextPage = 1;
    nextPage = direction === Direction.NEXT ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return nextPage;
  }
}

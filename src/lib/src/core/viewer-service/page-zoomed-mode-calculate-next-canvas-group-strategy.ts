import { Direction } from '../models/direction';
import { CalculateNextCanvasGroupStrategy, NextCanvasGroupCriteria } from './calculate-next-canvas-group-strategy';

export class PageZoomedModeCalculateNextCanvasGroupStrategy implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const direction = criteria.direction;
    const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
    const pageEndHitCountReached = criteria.pageEndHitCountReached;

    let nextCanvasGroup = pageEndHitCountReached ? 1 : 0;

    nextCanvasGroup = direction === Direction.LEFT ? nextCanvasGroup : nextCanvasGroup * -1;
    nextCanvasGroup = currentCanvasGroupIndex + nextCanvasGroup;
    return nextCanvasGroup;
  }
}

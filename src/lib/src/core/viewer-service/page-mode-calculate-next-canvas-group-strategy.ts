import { Direction } from '../models/direction';
import { CalculateNextCanvasGroupStrategy, NextCanvasGroupCriteria } from './calculate-next-canvas-group-strategy';

export class PageModeCalculateNextCanvasGroupStrategy implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const isNewCanvasGroupInCenter = criteria.currentCanvasGroupIndex !== criteria.currentCanvasGroupCenter;
    const speed = criteria.speed;
    const direction = criteria.direction;

    let nextCanvasGroup = criteria.currentCanvasGroupIndex;
    if (speed >= 200) {
      const diff = direction === Direction.LEFT ? 1 : -1;
      nextCanvasGroup = criteria.currentCanvasGroupIndex + diff;
    } else if (isNewCanvasGroupInCenter) {
      nextCanvasGroup = criteria.currentCanvasGroupCenter;
    }
    return nextCanvasGroup;
  }
}

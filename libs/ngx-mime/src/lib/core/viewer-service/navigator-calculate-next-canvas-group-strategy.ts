import { Direction } from '../models/direction';
import {
  CalculateNextCanvasGroupStrategy,
  NextCanvasGroupCriteria
} from './calculate-next-canvas-group-strategy';

export class NavigatorCalculateNextCanvasGroupStrategy
  implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const direction = criteria.direction;
    const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;

    let nextCanvasGroup = 1;
    nextCanvasGroup =
      direction === Direction.NEXT ? nextCanvasGroup : nextCanvasGroup * -1;
    nextCanvasGroup = currentCanvasGroupIndex + nextCanvasGroup;
    return nextCanvasGroup;
  }
}

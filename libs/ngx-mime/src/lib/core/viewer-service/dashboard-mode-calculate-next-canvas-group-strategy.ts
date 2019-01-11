import { Direction } from '../models/direction';
import { ViewingDirection } from '../models/viewing-direction';
import {
  CalculateNextCanvasGroupStrategy,
  NextCanvasGroupCriteria
} from './calculate-next-canvas-group-strategy';

export class DashboardModeCalculateNextCanvasGroupStrategy
  implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
    const currentCanvasGroupCenter = criteria.currentCanvasGroupCenter;

    let nextCanvasGroup: number;
    let canvasGroupDelta = this.calculateNumberOfCanvasGroupsToGo(speed);
    if (canvasGroupDelta === 0) {
      nextCanvasGroup = currentCanvasGroupCenter;
    } else {
      canvasGroupDelta =
        direction === Direction.LEFT ? canvasGroupDelta : canvasGroupDelta * -1;
      nextCanvasGroup =
        criteria.viewingDirection === ViewingDirection.LTR
          ? currentCanvasGroupIndex + canvasGroupDelta
          : currentCanvasGroupIndex - canvasGroupDelta;
    }

    return nextCanvasGroup;
  }

  private calculateNumberOfCanvasGroupsToGo(speed: number): number {
    if (speed < 500) {
      return 0;
    } else if (speed >= 500 && speed < 1500) {
      return 1;
    } else if (speed >= 1500 && speed < 2500) {
      return 3;
    } else if (speed >= 2500 && speed < 3500) {
      return 5;
    } else {
      return 10;
    }
  }
}

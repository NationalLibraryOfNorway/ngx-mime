import { Direction } from '../models/direction';
import { CalculateNextCanvasGroupStrategy, NextCanvasGroupCriteria } from './calculate-next-canvas-group-strategy';

export class DashboardModeCalculateNextCanvasGroupStrategy implements CalculateNextCanvasGroupStrategy {
  calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentCanvasGroupIndex;
    const currentPageCenter = criteria.currentCanvasGroupCenter;

    let nextPage: number;
    let pageDelta = this.calculateNumberOfCanvasGroupsToGo(speed);
    if (pageDelta === 0) {
      nextPage = currentPageCenter;
    } else {
      pageDelta = direction === Direction.LEFT ? pageDelta : pageDelta * -1;
      nextPage = currentPageIndex + pageDelta;
    }

    return nextPage;
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

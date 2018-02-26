import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class DashboardModeCalculateNextPageStrategy implements CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const currentPageCenter = criteria.currentPageCenter;

    let nextPage: number;
    let pageDelta = this.calculateNumberOfpagesToGo(speed);
    if (pageDelta === 0) {
      nextPage = currentPageCenter;
    } else {
      pageDelta = direction === Direction.LEFT ? pageDelta : pageDelta * -1;
      nextPage = currentPageIndex + pageDelta;
    }

    return nextPage;
  }

  private calculateNumberOfpagesToGo(speed: number): number {
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

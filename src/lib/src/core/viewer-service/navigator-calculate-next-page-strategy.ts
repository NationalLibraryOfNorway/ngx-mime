import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class NavigatorCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;

    let nextPage = 1;
    nextPage = direction === Direction.NEXT ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return nextPage;
  }
}

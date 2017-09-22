import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class NavigatorCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;

    let nextPage = 1;
    nextPage = direction === 'next' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return new PageService().constrainToRange(nextPage);
  }
}

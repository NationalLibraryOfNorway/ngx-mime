import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class PageModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const isPastCenter = criteria.isPastCenter;
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;

    let nextPage = (speed >= 200 || isPastCenter) ? 1 : 0;
    nextPage = direction === 'left' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return new PageService().constrainToRange(nextPage);
  }
}

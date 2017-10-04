import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';


export class PageZoomedModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const pageEndHitCountReached = criteria.pageEndHitCountReached;

    let nextPage = (pageEndHitCountReached && speed >= 50) ? 1 : 0;

    nextPage = direction === Direction.LEFT ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return nextPage;
  }
}

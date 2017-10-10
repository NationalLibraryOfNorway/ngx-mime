import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class PageModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const isNewPageInCenter = (criteria.currentPageIndex !== criteria.currentPageCenter);
    const speed = criteria.speed;
    const direction = criteria.direction;

    const pagesToGo = (speed >= 200 || isNewPageInCenter) ? 1 : 0;
    const diff = direction === Direction.LEFT ? pagesToGo : pagesToGo * -1;
    const nextPage = criteria.currentPageIndex + diff;
    return nextPage;
  }
}

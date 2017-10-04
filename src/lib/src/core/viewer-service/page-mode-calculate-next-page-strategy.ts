import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class PageModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const currentPageIndex = criteria.currentPageIndex;
    console.log('PageModeCalculateNextPageStrategy', currentPageIndex);
    return currentPageIndex;
  }
}

import { Direction } from '../models/direction';
import { PageService } from '../page-service/page-service';
import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class PageModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const isNewPageInCenter = (criteria.currentPageIndex !== criteria.currentPageCenter);
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageCenter = criteria.currentPageCenter;

    console.log("isNewPageInCenter",isNewPageInCenter)
    console.log("direction",direction)

    let pageDelta = (speed >= 200 || isNewPageInCenter) ? 1 : 0;
    pageDelta = direction === Direction.LEFT ? pageDelta : pageDelta * -1;
    const nextPage = criteria.currentPageIndex + pageDelta;
    console.log("nextPage", nextPage)
    return nextPage;
  }
}

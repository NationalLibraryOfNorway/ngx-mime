import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class PageModeCalculateNextPageStrategy extends CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const maxPage = criteria.maxPage;

    let nextPage = (speed >= 200) ? 1 : 0;
    nextPage = direction === 'left' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return super.constrainToRange(nextPage, 0, maxPage);
  }
}

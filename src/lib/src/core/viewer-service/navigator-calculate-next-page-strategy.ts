import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class NavigatorCalculateNextPageStrategy extends CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const maxPage = criteria.maxPage;

    let nextPage = 1;
    nextPage = direction === 'next' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return super.constrainToRange(nextPage, 0, maxPage);
  }
}

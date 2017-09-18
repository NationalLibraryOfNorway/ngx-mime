import { CalculateNextPageStrategy, NextPageCriteria } from './calculate-next-page-strategy';

export class NavigatorCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const maxPage = criteria.maxPage;

    let nextPage = 1;
    nextPage = direction === 'next' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return this.constrainToRange(nextPage, 0, maxPage);
  }

  private constrainToRange(pageIndex: number, min: number, max: number): number {
    if (pageIndex < min) {
      return 0;
    } else if (pageIndex >= max) {
      return max;
    } else {
      return pageIndex;
    }
  }
}

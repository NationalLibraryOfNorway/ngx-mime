export interface NextPageCriteria {
  speed?: number;
  direction: string;
  currentPageIndex: number;
  maxPage: number;
}
export abstract class CalculateNextPageStrategy {
  abstract calculateNextPage(criteria: NextPageCriteria): number;

  constrainToRange(pageIndex: number, min: number, max: number): number {
    if (pageIndex < min) {
      return 0;
    } else if (pageIndex >= max) {
      return max;
    } else {
      return pageIndex;
    }
  }
}

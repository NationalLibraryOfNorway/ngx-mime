export interface NextPageCriteria {
  speed: number;
  direction: string;
  currentPageIndex: number;
  maxPage: number;
}
export interface CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number;
}

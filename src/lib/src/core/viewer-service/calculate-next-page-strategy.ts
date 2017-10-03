import { Direction } from '../models/direction';
export interface NextPageCriteria {
  speed?: number;
  isPastCenter?: boolean;
  pageEndHitCountReached?: boolean;
  direction: Direction;
  currentPageIndex: number;
}

export interface CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number;
}

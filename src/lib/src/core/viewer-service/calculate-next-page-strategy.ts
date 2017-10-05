import { Direction } from '../models/direction';
export interface NextPageCriteria {
  speed?: number;
  pageEndHitCountReached?: boolean;
  direction: Direction;
  currentPageIndex: number;
  currentPageCenter: number;
}

export interface CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number;
}

export interface NextPageCriteria {
  speed: number;
  direction: string;
  currentPageIndex: number;
  maxPage: number;
}
export interface CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number;
}

export class DashboardModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    const speed = criteria.speed;
    const direction = criteria.direction;
    const currentPageIndex = criteria.currentPageIndex;
    const maxPage = criteria.maxPage;

    let nextPage = this.calculateNumberOfpagesToGo(speed);
    nextPage = direction === 'left' ? nextPage : nextPage * -1;
    nextPage = currentPageIndex + nextPage;
    return this.constrainToRange(nextPage, 0, maxPage);
  }

  private calculateNumberOfpagesToGo(speed: number): number {
    if (speed < 500) {
      return 0;
    } else if (speed >= 500 && speed < 1500) {
      return 1;
    } else if (speed >= 1500 && speed < 2500) {
      return 3;
    } else if (speed >= 2500 && speed < 3500) {
      return 5;
    } else {
      return 10;
    }
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

export class PageModeCalculateNextPageStrategy implements CalculateNextPageStrategy {

  calculateNextPage(criteria: NextPageCriteria): number {
    return 0;
  }
}

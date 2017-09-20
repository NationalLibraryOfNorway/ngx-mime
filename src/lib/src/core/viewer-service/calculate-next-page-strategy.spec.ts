import { CalculateNextPageStrategy } from './calculate-next-page-strategy';
import { DashboardModeCalculateNextPageStrategy } from './dashboard-mode-calculate-next-page-strategy';


describe('CalculateNextPageStrategy ', () => {

  it('should return maxPage when next page is larger than maxPage', () => {
    const strategy = new DashboardModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 4000,
      direction: 'left',
      currentPageIndex: 99,
      maxPage: 100
    });
    expect(res).toBe(100);
  });

  it('should not return index lower than 0', () => {
    const strategy = new DashboardModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 4000,
      direction: 'right',
      currentPageIndex: 1,
      maxPage: 10
    });

    expect(res).toBe(0);
  });

});

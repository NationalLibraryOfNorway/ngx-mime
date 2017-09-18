import { DashboardModeCalculateNextPageStrategy } from './dashboard-mode-calculate-next-page-strategy';


describe('DashboardModeCalculateNextPageStrategy ', () => {

  it('should stay on same page when speed is slow', () => {
    const strategy = new DashboardModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 400,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(1);
  });

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

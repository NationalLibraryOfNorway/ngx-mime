import { DashboardModeCalculateNextPageStrategy } from './dashboard-mode-calculate-next-page-strategy';

describe('DashboardModeCalculateNextPageStrategy ', () => {
  let strategy: DashboardModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new DashboardModeCalculateNextPageStrategy();
  });

  it('should stay on same page when speed is slow', () => {
    const res = strategy.calculateNextPage({
      speed: 400,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(1);
  });

});

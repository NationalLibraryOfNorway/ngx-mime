import { PageModeCalculateNextPageStrategy } from './page-mode-calculate-next-page-strategy';

describe('PageModeCalculateNextPageStrategy ', () => {
  let strategy: PageModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new PageModeCalculateNextPageStrategy();
  });

  it('should stay on same page when speed is below 200', () => {
    const res = strategy.calculateNextPage({
      speed: 199,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(1);
  });

  it('should get next page if speed is 200 and direction is left', () => {
    const res = strategy.calculateNextPage({
      speed: 200,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(2);
  });

  it('should get previous page if speed is 200 and direction is right', () => {
    const res = strategy.calculateNextPage({
      speed: 200,
      direction: 'right',
      currentPageIndex: 2,
      maxPage: 100
    });

    expect(res).toBe(1);
  });

});

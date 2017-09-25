import { PageZoomedModeCalculateNextPageStrategy } from './page-zoomed-mode-calculate-next-page-strategy';

describe('PageZoomedModeCalculateNextPageStrategy ', () => {
  let strategy: PageZoomedModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new PageZoomedModeCalculateNextPageStrategy();
  });


  it('should stay on same page when speed is below 50', () => {
    const res = strategy.calculateNextPage({
      speed: 45,
      direction: 'left',
      currentPageIndex: 1,
      forceNextPage: true
    });

    expect(res).toBe(1);
  });

  it('should stay on same page when forceNextPage is false', () => {
    const res = strategy.calculateNextPage({
      speed: 200,
      direction: 'left',
      currentPageIndex: 1,
      forceNextPage: false
    });

    expect(res).toBe(1);
  });

  it('should get next page if speed is 50 and direction is left', () => {
    const res = strategy.calculateNextPage({
      speed: 50,
      direction: 'left',
      currentPageIndex: 1,
      forceNextPage: true
    });

    expect(res).toBe(2);
  });

  it('should get previous page if speed is 50 and direction is right', () => {
    const res = strategy.calculateNextPage({
      speed: 50,
      direction: 'right',
      currentPageIndex: 2,
      forceNextPage: true
    });

    expect(res).toBe(1);
  });

});

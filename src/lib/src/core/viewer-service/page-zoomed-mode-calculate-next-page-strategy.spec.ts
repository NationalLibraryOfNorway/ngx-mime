import { PageZoomedModeCalculateNextPageStrategy } from './page-zoomed-mode-calculate-next-page-strategy';

describe('PageZoomedModeCalculateNextPageStrategy ', () => {

  it('should stay on same page when speed is below 50', () => {
    const strategy = new PageZoomedModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 45,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(1);
  });

  it('should get next page if speed is 50 and direction is left', () => {
    const strategy = new PageZoomedModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 50,
      direction: 'left',
      currentPageIndex: 1,
      maxPage: 100
    });

    expect(res).toBe(2);
  });

  it('should get previous page if speed is 50 and direction is right', () => {
    const strategy = new PageZoomedModeCalculateNextPageStrategy();

    const res = strategy.calculateNextPage({
      speed: 50,
      direction: 'right',
      currentPageIndex: 2,
      maxPage: 100
    });

    expect(res).toBe(1);
  });



});

import { Direction } from '../models/direction';
import { PageModeCalculateNextPageStrategy } from './page-mode-calculate-next-page-strategy';

describe('PageModeCalculateNextPageStrategy ', () => {
  let strategy: PageModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new PageModeCalculateNextPageStrategy();
  });

  it('should stay on same page when drag speed is low and same page is currentPageCenter', () => {
    const res = strategy.calculateNextPage({
      speed: 199,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(1);
  });

  it('should get next page if speed is high and direction is left', () => {
    const res = strategy.calculateNextPage({
      speed: 200,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(2);
  });

  it('should get previous page when speed is high and direction is right', () => {
    const res = strategy.calculateNextPage({
      speed: 200,
      direction: Direction.RIGHT,
      currentPageIndex: 2,
      currentPageCenter: 2
    });

    expect(res).toBe(1);
  });

  it('should get next page when next page is currentPageCenter', () => {
    const res = strategy.calculateNextPage({
      speed: 199,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 2
    });

    expect(res).toBe(2);
  });
});

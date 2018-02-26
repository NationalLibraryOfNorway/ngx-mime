import { Direction } from '../models/direction';
import { PageZoomedModeCalculateNextPageStrategy } from './page-zoomed-mode-calculate-next-page-strategy';

describe('PageZoomedModeCalculateNextPageStrategy ', () => {
  let strategy: PageZoomedModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new PageZoomedModeCalculateNextPageStrategy();
  });

  it('should stay on same page when pageEndHitCountReached is false', () => {
    const res = strategy.calculateNextPage({
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1,
      pageEndHitCountReached: false
    });

    expect(res).toBe(1);
  });

  it('should get next page if direction is left and hitcount is reached', () => {
    const res = strategy.calculateNextPage({
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1,
      pageEndHitCountReached: true
    });

    expect(res).toBe(2);
  });

  it('should get previous page if direction is right and hitcount is reached', () => {
    const res = strategy.calculateNextPage({
      direction: Direction.RIGHT,
      currentPageIndex: 2,
      currentPageCenter: 2,
      pageEndHitCountReached: true
    });

    expect(res).toBe(1);
  });
});

import { Direction } from '../models/direction';
import { DashboardModeCalculateNextPageStrategy } from './dashboard-mode-calculate-next-page-strategy';

describe('DashboardModeCalculateNextPageStrategy ', () => {
  let strategy: DashboardModeCalculateNextPageStrategy;

  beforeEach(() => {
    strategy = new DashboardModeCalculateNextPageStrategy();
  });

  it('should stay on same page when drag speed is low and page is not passed center', () => {
    const res = strategy.calculateNextPage({
      speed: 400,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(1);
  });

  it('should go to next page when drag speed is medium and page is not passed center', () => {
    const res = strategy.calculateNextPage({
      speed: 1000,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(2);
  });

  it('should go forward 3 pages when speed is high and page is not passed center', () => {
    const res = strategy.calculateNextPage({
      speed: 2000,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(4);
  });

  it('should go forward 5 pages when speed is very high and page is not passed center', () => {
    const res = strategy.calculateNextPage({
      speed: 3000,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(6);
  });

  it('should go forward 10 pages when speed is extremt high and page is not passed center', () => {
    const res = strategy.calculateNextPage({
      speed: 4000,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 1
    });

    expect(res).toBe(11);
  });

  it('should go to page 3 when drag speed is low and page 3 is currentPageCenter', () => {
    const res = strategy.calculateNextPage({
      speed: 400,
      direction: Direction.LEFT,
      currentPageIndex: 1,
      currentPageCenter: 3
    });

    expect(res).toBe(3);
  });
});

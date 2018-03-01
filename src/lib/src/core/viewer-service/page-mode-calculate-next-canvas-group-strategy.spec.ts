import { Direction } from '../models/direction';
import { PageModeCalculateNextCanvasGroupStrategy } from './page-mode-calculate-next-canvas-group-strategy';

describe('PageModeCalculateNextPageStrategy ', () => {
  let strategy: PageModeCalculateNextCanvasGroupStrategy;

  beforeEach(() => {
    strategy = new PageModeCalculateNextCanvasGroupStrategy();
  });

  it('should stay on same canvas group when drag speed is low and same page is currentPageCenter', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 199,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(1);
  });

  it('should get next canvas group if speed is high and direction is left', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 200,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(2);
  });

  it('should get previous canvas group when speed is high and direction is right', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 200,
      direction: Direction.RIGHT,
      currentCanvasGroupIndex: 2,
      currentCanvasGroupCenter: 2
    });

    expect(res).toBe(1);
  });

  it('should get next canvas group when next page is currentPageCenter', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 199,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 2
    });

    expect(res).toBe(2);
  });
});

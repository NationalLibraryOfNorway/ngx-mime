import { Direction } from '../models/direction';
import { DashboardModeCalculateNextCanvasGroupStrategy } from './dashboard-mode-calculate-next-canvas-group-strategy';

describe('DashboardModeCalculateNextCanvasGroupStrategy ', () => {
  let strategy: DashboardModeCalculateNextCanvasGroupStrategy;

  beforeEach(() => {
    strategy = new DashboardModeCalculateNextCanvasGroupStrategy();
  });

  it('should stay on same canvas group when drag speed is low and page is not passed center', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 400,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(1);
  });

  it('should go to next canvas group when drag speed is medium and page is not passed center', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 1000,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(2);
  });

  it('should go forward 3 canvas groups when speed is high and page is not passed center', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 2000,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(4);
  });

  it('should go forward 5 canvas groups when speed is very high and page is not passed center', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 3000,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(6);
  });

  it('should go forward 10 canvas groups when speed is extremt high and page is not passed center', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 4000,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1
    });

    expect(res).toBe(11);
  });

  it('should go to canvas group 3 when drag speed is low and page 3 is currentCanvasGroupCenter', () => {
    const res = strategy.calculateNextCanvasGroup({
      speed: 400,
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 3
    });

    expect(res).toBe(3);
  });
});

import { Direction } from '../models/direction';
import { ViewingDirection } from '../models/viewing-direction';
import { PageZoomedModeCalculateNextCanvasGroupStrategy } from './page-zoomed-mode-calculate-next-canvas-group-strategy';

describe('PageZoomedModeCalculateNextCanvasGroupStrategy ', () => {
  let strategy: PageZoomedModeCalculateNextCanvasGroupStrategy;

  beforeEach(() => {
    strategy = new PageZoomedModeCalculateNextCanvasGroupStrategy();
  });

  it('should stay on same canvas group when canvasGroupEndHitCountReached is false', () => {
    const res = strategy.calculateNextCanvasGroup({
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1,
      canvasGroupEndHitCountReached: false,
      viewingDirection: ViewingDirection.LTR
    });

    expect(res).toBe(1);
  });

  it('should get next canvas group if direction is left and hitcount is reached', () => {
    const res = strategy.calculateNextCanvasGroup({
      direction: Direction.LEFT,
      currentCanvasGroupIndex: 1,
      currentCanvasGroupCenter: 1,
      canvasGroupEndHitCountReached: true,
      viewingDirection: ViewingDirection.LTR
    });

    expect(res).toBe(2);
  });

  it('should get previous canvas group if direction is right and hitcount is reached', () => {
    const res = strategy.calculateNextCanvasGroup({
      direction: Direction.RIGHT,
      currentCanvasGroupIndex: 2,
      currentCanvasGroupCenter: 2,
      canvasGroupEndHitCountReached: true,
      viewingDirection: ViewingDirection.LTR
    });

    expect(res).toBe(1);
  });
});

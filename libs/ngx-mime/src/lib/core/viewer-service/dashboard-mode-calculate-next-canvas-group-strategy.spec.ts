import { Direction } from '../models/direction';
import { ViewingDirection } from '../models/viewing-direction';
import { DashboardModeCalculateNextCanvasGroupStrategy } from './dashboard-mode-calculate-next-canvas-group-strategy';

describe('DashboardModeCalculateNextCanvasGroupStrategy', () => {
  let strategy: DashboardModeCalculateNextCanvasGroupStrategy;

  beforeEach(() => {
    strategy = new DashboardModeCalculateNextCanvasGroupStrategy();
  });

  describe('LTR', () => {
    const viewingDirection = ViewingDirection.LTR;

    it('should stay on same canvas group when drag speed zero', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 0,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(1);
    });

    it('should stay on same canvas group when drag speed is low and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 400,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(1);
    });

    it('should go to next canvas group when drag speed is medium and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 1000,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(2);
    });

    it('should go forward 3 canvas groups when speed is high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 2000,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(4);
    });

    it('should go forward 5 canvas groups when speed is very high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 3000,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(6);
    });

    it('should go forward 10 canvas groups when speed is extremt high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 4000,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(11);
    });

    it('should go to canvas group 3 when drag speed is low and canvas group 3 is currentCanvasGroupCenter', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 400,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 3,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(3);
    });
  });

  describe('RTL', () => {
    const viewingDirection = ViewingDirection.RTL;
    it('should stay on same canvas group when drag speed is low and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 400,
        direction: Direction.LEFT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(1);
    });

    it('should go to next canvas group when drag speed is medium and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 1000,
        direction: Direction.RIGHT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(2);
    });

    it('should go forward 3 canvas groups when speed is high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 2000,
        direction: Direction.RIGHT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(4);
    });

    it('should go forward 5 canvas groups when speed is very high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 3000,
        direction: Direction.RIGHT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(6);
    });

    it('should go forward 10 canvas groups when speed is extremt high and canvas group is not passed center', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 4000,
        direction: Direction.RIGHT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 1,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(11);
    });

    it('should go to canvas group 3 when drag speed is low and canvas group 3 is currentCanvasGroupCenter', () => {
      const res = strategy.calculateNextCanvasGroup({
        speed: 400,
        direction: Direction.RIGHT,
        currentCanvasGroupIndex: 1,
        currentCanvasGroupCenter: 3,
        viewingDirection: viewingDirection,
      });

      expect(res).toBe(3);
    });
  });
});

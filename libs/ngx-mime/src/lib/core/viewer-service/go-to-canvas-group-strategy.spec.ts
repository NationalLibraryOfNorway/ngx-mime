import { CanvasService } from '../canvas-service/canvas-service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { ViewingDirection } from '../models/viewing-direction';
import { DefaultGoToCanvasGroupStrategy } from './go-to-canvas-group-strategy';

describe('DefaultGoToCanvasGroupStrategy ', () => {
  let strategy: DefaultGoToCanvasGroupStrategy;
  const viewport: any = {
    getCenter: () => {},
    getBounds: () => {},
    panTo: () => {},
  };
  const viewer: any = {
    viewport: viewport,
    collectionTileMargin: 80,
  };
  const zoomStrategy: any = {};
  let canvasService: CanvasService;
  const modeService = new ModeService();
  const config: any = {};
  let spy: any;

  beforeEach(() => {
    strategy = new DefaultGoToCanvasGroupStrategy(
      viewer,
      zoomStrategy,
      canvasService,
      modeService,
      config,
      ViewingDirection.LTR,
    );
  });

  describe('preserveZoomOnCanvasGroupChange', () => {
    describe('startOnTopOnCanvasGroupChange', () => {
      it('go to previous canvas group when zoomed in should pan to upper left on previous canvas', () => {
        config.preserveZoomOnCanvasGroupChange = true;
        config.startOnTopOnCanvasGroupChange = true;
        canvasService.currentCanvasGroupIndex = 10;
        modeService.mode = ViewerMode.PAGE_ZOOMED;

        spy = jest.spyOn(canvasService, 'constrainToRange').mockReturnValue(9);
        spy = jest.spyOn(canvasService, 'getCanvasGroupRect').mockReturnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = jest.spyOn(viewport, 'getCenter').mockReturnValue({
          x: 50,
          y: 50,
        });
        spy = jest.spyOn(viewport, 'getBounds').mockReturnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = jest.spyOn(viewport, 'panTo');

        const res = strategy.goToCanvasGroup({
          canvasGroupIndex: 9,
          immediately: false,
        });

        const args = spy.mock.calls.pop();
        expect(args[0].x).toEqual(50);
        expect(args[0].y).toEqual(-30);
      });

      it('go to next canvas group when zoomed in should pan to upper left on next canvas', () => {
        config.preserveZoomOnCanvasGroupChange = true;
        config.startOnTopOnCanvasGroupChange = true;
        canvasService.currentCanvasGroupIndex = 10;
        modeService.mode = ViewerMode.PAGE_ZOOMED;

        spy = jest.spyOn(canvasService, 'constrainToRange').mockReturnValue(12);
        spy = jest.spyOn(canvasService, 'getCanvasGroupRect').mockReturnValue({
          x: 100,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = jest.spyOn(viewport, 'getCenter').mockReturnValue({
          x: 50,
          y: 50,
        });
        spy = jest.spyOn(viewport, 'getBounds').mockReturnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = jest.spyOn(viewport, 'panTo');

        const res = strategy.goToCanvasGroup({
          canvasGroupIndex: 12,
          immediately: false,
        });

        const args = spy.mock.calls.pop();
        expect(args[0].x).toEqual(150);
        expect(args[0].y).toEqual(-30);
      });
    });
  });
});

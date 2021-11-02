import { CanvasService } from '../canvas-service/canvas-service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { ViewingDirection } from '../models/viewing-direction';
import { DefaultGoToCanvasGroupStrategy } from './go-to-canvas-group-strategy';

describe('DefaultGoToCanvasGroupStrategy ', () => {
  let strategy: DefaultGoToCanvasGroupStrategy;
  const viewport: any = {
    getCenter: {},
    getBounds: {},
    panTo: {},
  };
  const viewer: any = {
    viewport: viewport,
    collectionTileMargin: 80,
  };
  const zoomStrategy: any = {};
  const canvasService: CanvasService = new CanvasService();
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
      ViewingDirection.LTR
    );
  });

  describe('preserveZoomOnCanvasGroupChange', () => {
    describe('startOnTopOnCanvasGroupChange', () => {
      it('go to previous canvas group when zoomed in should pan to upper left on previous canvas', () => {
        config.preserveZoomOnCanvasGroupChange = true;
        config.startOnTopOnCanvasGroupChange = true;
        canvasService.currentCanvasGroupIndex = 10;
        modeService.mode = ViewerMode.PAGE_ZOOMED;

        spy = spyOn(canvasService, 'constrainToRange').and.returnValue(9);
        spy = spyOn(canvasService, 'getCanvasGroupRect').and.returnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = spyOn(viewport, 'getCenter').and.returnValue({
          x: 50,
          y: 50,
        });
        spy = spyOn(viewport, 'getBounds').and.returnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = spyOn(viewport, 'panTo');

        const res = strategy.goToCanvasGroup({
          canvasGroupIndex: 9,
          immediately: false,
        });

        const args = viewport.panTo.calls.mostRecent().args;
        expect(args[0].x).toEqual(50);
        expect(args[0].y).toEqual(-30);
      });

      it('go to next canvas group when zoomed in should pan to upper left on next canvas', () => {
        config.preserveZoomOnCanvasGroupChange = true;
        config.startOnTopOnCanvasGroupChange = true;
        canvasService.currentCanvasGroupIndex = 10;
        modeService.mode = ViewerMode.PAGE_ZOOMED;

        spy = spyOn(canvasService, 'constrainToRange').and.returnValue(12);
        spy = spyOn(canvasService, 'getCanvasGroupRect').and.returnValue({
          x: 100,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = spyOn(viewport, 'getCenter').and.returnValue({
          x: 50,
          y: 50,
        });
        spy = spyOn(viewport, 'getBounds').and.returnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          centerX: 50,
          centerY: 50,
        });
        spy = spyOn(viewport, 'panTo');

        const res = strategy.goToCanvasGroup({
          canvasGroupIndex: 12,
          immediately: false,
        });

        const args = viewport.panTo.calls.mostRecent().args;
        expect(args[0].x).toEqual(150);
        expect(args[0].y).toEqual(-30);
      });
    });
  });
});

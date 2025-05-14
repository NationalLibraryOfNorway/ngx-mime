import { CanvasRenderer, getCanvasRenderType } from './drawer-utils';
import { mockIOS, mockLinux, mockMacDesktop, mockMacTouch, mockWindows } from '../../test/navigator-mocks';

describe('getCanvasDrawType', () => {
  afterEach(() => {
    mockWindows();
  });

  it('should return html for iOS device (userAgent)', () => {
    mockIOS();

    expectCanvasRenderTypeToBe(CanvasRenderer.HTML);
  });

  it('should return html for iOS via MacIntel + touch', () => {
    mockMacTouch();

    expectCanvasRenderTypeToBe(CanvasRenderer.HTML);
  });

  it('should return canvas for macOS desktop (no touch)', () => {
    mockMacDesktop();

    expectCanvasRenderTypeToBe(CanvasRenderer.CANVAS);
  });

  it('should return webgl for Linux platform', () => {
    mockLinux();

    expectCanvasRenderTypeToBe(CanvasRenderer.WEBGL);
  });

  it('should return webgl for Windows', () => {
    mockWindows();

    expectCanvasRenderTypeToBe(CanvasRenderer.WEBGL);
  });
});

function expectCanvasRenderTypeToBe(canvasRenderType: string) {
  expect(getCanvasRenderType()).toBe(canvasRenderType);
}

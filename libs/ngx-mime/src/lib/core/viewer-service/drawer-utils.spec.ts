import { CanvasRenderer, getCanvasRenderType } from './drawer-utils';
import { mockIOS, mockLinux, mockMacDesktop, mockMacTouch, mockWindows } from '../../test/navigator-mocks';

describe('getCanvasDrawType', () => {
  afterEach(() => {
    mockWindows();
  });

  it('should return html for iOS device (userAgent)', () => {
    mockIOS();

    expectCanvasDrawTypeToBe(CanvasRenderer.HTML);
  });

  it('should return html for iOS via MacIntel + touch', () => {
    mockMacTouch();

    expectCanvasDrawTypeToBe(CanvasRenderer.HTML);
  });

  it('should return canvas for macOS desktop (no touch)', () => {
    mockMacDesktop();

    expectCanvasDrawTypeToBe(CanvasRenderer.CANVAS);
  });

  it('should return webgl for Linux platform', () => {
    mockLinux();

    expectCanvasDrawTypeToBe(CanvasRenderer.WEBGL);
  });

  it('should return webgl for Windows', () => {
    mockWindows();

    expectCanvasDrawTypeToBe(CanvasRenderer.WEBGL);
  });
});

function expectCanvasDrawTypeToBe(platform: string) {
  expect(getCanvasRenderType()).toBe(platform);
}

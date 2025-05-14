// get-canvas-draw-type.spec.ts
import { getCanvasDrawType } from './drawer-utils';
import {
  mockIOS, mockLinux, mockMacDesktop,
  mockMacTouch,
  mockWindows
} from '../../test/navigator-mocks';

describe('getCanvasDrawType', () => {
  afterEach(() => {
    mockWindows();
  });

  it('should return html for iOS device (userAgent)', () => {
    mockIOS();
    expect(getCanvasDrawType()).toBe('html');
  });

  it('should return html for iOS via MacIntel + touch', () => {
    mockMacTouch();
    expect(getCanvasDrawType()).toBe('html');
  });

  it('should return canvas for macOS desktop (no touch)', () => {
    mockMacDesktop();
    expect(getCanvasDrawType()).toBe('canvas');
  });

  it('should return webgl for Linux platform', () => {
    mockLinux();
    expect(getCanvasDrawType()).toBe('webgl');
  });

  it('should return webgl for Windows', () => {
    mockWindows();
    expect(getCanvasDrawType()).toBe('webgl');
  });
});

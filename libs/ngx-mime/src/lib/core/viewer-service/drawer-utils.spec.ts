// get-canvas-draw-type.spec.ts
import { getCanvasDrawType } from './drawer-utils';

describe('getCanvasDrawType', () => {

  afterEach(() => {
    mockPlatform('Win32', '', undefined, 0); // reset to default (webgl)
  });

  it('should return html for iOS device (userAgent)', () => {
    mockPlatform('iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)', undefined, 5);
    expect(getCanvasDrawType()).toBe('html');
  });

  it('should return html for iOS via MacIntel + touch', () => {
    mockPlatform('MacIntel', '', undefined, 5);
    expect(getCanvasDrawType()).toBe('html');
  });

  it('should return canvas for macOS desktop (no touch)', () => {
    mockPlatform('MacIntel', '', { platform: 'macOS' }, 0);
    expect(getCanvasDrawType()).toBe('canvas');
  });

  it('should return webgl for Linux platform', () => {
    mockPlatform('Linux x86_64', '', { platform: 'Linux' }, 0);
    expect(getCanvasDrawType()).toBe('webgl');
  });

  it('should return webgl for Windows', () => {
    mockPlatform('Win32', '', { platform: 'Windows' }, 0);
    expect(getCanvasDrawType()).toBe('webgl');
  });
});

function mockPlatform(
  platform: string,
  userAgent: string = '',
  userAgentData: any = undefined,
  maxTouchPoints: number = 0,
) {
  Object.defineProperty(navigator, 'platform', {
    value: platform,
    configurable: true,
  });
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });
  Object.defineProperty(navigator, 'userAgentData', {
    value: userAgentData,
    configurable: true,
  });
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: maxTouchPoints,
    configurable: true,
  });
}

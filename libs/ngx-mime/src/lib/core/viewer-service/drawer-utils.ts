export enum CanvasRenderer {
  HTML = 'html',
  CANVAS = 'canvas',
  WEBGL = 'webgl',
}

export function getCanvasRenderType(): string {
  const userAgent = navigator.userAgent || '';
  const userAgentData = (navigator as any).userAgentData;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 1;

  const platform = (userAgentData?.platform ?? navigator.platform ?? '');

  const isIOS =
    /iPhone|iPad|iPod/.test(userAgent) ||
    platform.includes('iOS') ||
    (platform === 'MacIntel' && isTouchDevice);

  const isMac =
    platform.includes('macOS') ||
    (platform === 'MacIntel' && !isTouchDevice);

  if (isIOS) return CanvasRenderer.HTML;
  if (isMac) return CanvasRenderer.CANVAS;
  return CanvasRenderer.WEBGL;
  }

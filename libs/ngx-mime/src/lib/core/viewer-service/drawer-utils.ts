export enum DrawerType {
  HTML = 'html',
  CANVAS = 'canvas',
  WEBGL = 'webgl',
}

export function getDrawerType(): string {
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

  if (isIOS) return DrawerType.HTML;
  if (isMac) return DrawerType.CANVAS;
  return DrawerType.WEBGL;
  }

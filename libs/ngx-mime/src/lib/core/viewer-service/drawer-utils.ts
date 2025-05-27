export enum DrawerType {
  HTML = 'html',
  CANVAS = 'canvas',
  WEBGL = 'webgl',
}

export function getDrawerType(): DrawerType {
  const userAgent = navigator.userAgent ?? '';
  const platform =
    (navigator as any).userAgentData?.platform ?? navigator.platform ?? '';
  const touch = isTouchDevice();

  if (isIOS(userAgent, platform, touch)) {
    return DrawerType.HTML;
  } else if (isMacDesktop(platform, touch)) {
    return DrawerType.CANVAS;
  } else {
    // Temporary workaround: force Canvas rendering until OpenSeadragon has full WebGL support.
    // See: https://github.com/openseadragon/openseadragon/issues/2604
    return DrawerType.CANVAS;
  }
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 1;
}

function isIOS(userAgent: string, platform: string, touch: boolean): boolean {
  return (
    /iPhone|iPad|iPod/.test(userAgent) ||
    platform.includes('iOS') ||
    (platform === 'MacIntel' && touch)
  );
}

function isMacDesktop(platform: string, touch: boolean): boolean {
  return platform.includes('macOS') || (platform === 'MacIntel' && !touch);
}

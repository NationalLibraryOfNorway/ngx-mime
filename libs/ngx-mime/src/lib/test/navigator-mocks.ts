type NavigatorMockProps = {
  platform: string;
  userAgent?: string;
  userAgentData?: any;
  maxTouchPoints?: number;
};

export function mockIOS() {
  overrideNavigator({
    platform: 'iPhone',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    maxTouchPoints: 5,
  });
}

export function mockMacTouch() {
  overrideNavigator({
    platform: 'MacIntel',
    maxTouchPoints: 5,
  });
}

export function mockMacDesktop() {
  overrideNavigator({
    platform: 'MacIntel',
    userAgentData: { platform: 'macOS' },
  });
}

export function mockLinux() {
  overrideNavigator({
    platform: 'Linux x86_64',
    userAgentData: { platform: 'Linux' },
  });
}

export function mockWindows() {
  overrideNavigator({
    platform: 'Win32',
    userAgentData: { platform: 'Windows' },
  });
}

function overrideNavigator({ platform, userAgent = '', userAgentData = undefined, maxTouchPoints = 0 }: NavigatorMockProps) {
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

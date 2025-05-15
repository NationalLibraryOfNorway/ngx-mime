import { DrawerType, getDrawerType } from './drawer-utils';
import {
  mockIOS,
  mockLinux,
  mockMacDesktop,
  mockMacTouch,
  mockWindows,
} from '../../test/navigator-mocks';

const RENDERER_CASES: [string, () => void, DrawerType][] = [
  ['iOS device (userAgent)', mockIOS, DrawerType.HTML],
  ['iOS via MacIntel + touch', mockMacTouch, DrawerType.HTML],
  ['macOS desktop (no touch)', mockMacDesktop, DrawerType.CANVAS],
  ['Linux platform', mockLinux, DrawerType.WEBGL],
  ['Windows platform', mockWindows, DrawerType.WEBGL],
];

describe('getDrawerType', () => {
  afterEach(mockWindows);

  it.each(RENDERER_CASES)(
    'should return correct renderer for %s',
    (_description, setupMock, expected) => {
      setupMock();

      const drawerType = getDrawerType();

      expect(drawerType).toBe(expected);
    },
  );
});

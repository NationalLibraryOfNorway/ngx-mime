exports.customDesktopLaunchers = [
  {
    browserName: 'chrome',
    version: 'latest'
  },
  {
    browserName: 'firefox',
    version: 'latest'
  },
  {
    browserName: 'MicrosoftEdge',
    version: 'latest'
  }
  // {
  //   browserName: "internet explorer",
  //   platform: "Windows 10",
  //   version: "latest"
  // },
  // {
  //   browserName: "safari",
  //   platform: "macOS 10.12",
  //   version: "10.0"
  // }
];
exports.androidLaunchers = [
  {
    browserName: 'Chrome',
    deviceName: 'Android Emulator',
    platformVersion: '7.0',
    platformName: 'Android'
  }
];
exports.iphoneLaunchers = [
  {
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '10.3',
    platformName: 'iOS'
  }
];

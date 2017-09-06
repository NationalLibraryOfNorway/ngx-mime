exports.customDesktopLaunchers = [
  {
    browserName: "chrome",
    version: "latest",
    platform: "Windows 10",
  },/*
  {
    browserName: "firefox",
    version: "latest",
    platform: "Windows 10",
  },*/
  {
    browserName: "internet explorer",
    platform: "Windows 10",
    version: "latest"
  },
  {
    browserName: "MicrosoftEdge",
    platform: "Windows 10",
    version: "latest"
  },
  {
    browserName: "safari",
    platform: "macOS 10.12",
    version: "10.0"
  }
]
exports.androidLaunchers = [
  {
    browserName: "Chrome",
    deviceName: "Android Emulator",
    platformVersion: "6.0",
    platformName: "Android"
  }
]
exports.iphoneLaunchers = [
  {
    browserName: "Safari",
    deviceName: "iPhone Simulator",
    platformVersion: "10.3",
    platformName: "iOS"
  }
]
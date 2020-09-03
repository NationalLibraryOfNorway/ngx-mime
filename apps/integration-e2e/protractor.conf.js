// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const remoteBrowsers = require('./remote-browsers');
const basePath = './apps/integration-e2e/';

const config = {
  allScriptsTimeout: 50000,
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: false,
  localSeleniumStandaloneOpts: {
    jvmArgs: ['-Dwebdriver.gecko.driver=./node_modules/geckodriver/geckodriver'],
    loopback: true
  },
  specs: getFeatureFiles(),
  unknownFlags: ['cucumberOpts', 'device'],
  multiCapabilities: getMultiCapabilities(),
  baseUrl: 'http://127.0.0.1:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      path.resolve(process.cwd(), `${basePath}/helpers/cucumber.config.ts`),
      path.resolve(process.cwd(), `${basePath}/step-definitions/**/*.steps.ts`),
      path.resolve(process.cwd(), `${basePath}./helpers/hooks.ts`)
    ],
    format: 'json:.tmp/results.json',
    tags: getTags()
  },
  plugins: [
    {
      package: require.resolve(
        'protractor-multiple-cucumber-html-reporter-plugin'
      ),
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        removeOriginalJsonReportFile: true
      }
    }
  ],
  onPrepare: function() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    if (
      !config.multiCapabilities &&
      config.capabilities.platformName !== 'Android' &&
      config.capabilities.platformName !== 'iOS'
    ) {
      const width = 1024;
      const height = 768;
      browser.driver
        .manage()
        .window()
        .setSize(width, height);
    }
  },
  disableChecks: true,
  ignoreUncaughtExceptions: true
};

if (process.env.CI) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
}

config.maxSessions = process.env.CI ? 5 : 10;

function getMultiCapabilities() {
  const multiCapabilities = [];
  let browsers = remoteBrowsers.customDesktopLaunchers
    .concat(remoteBrowsers.androidLaunchers)
    .concat(remoteBrowsers.iphoneLaunchers);
  let capabilities = {
    name: 'Mime E2E Tests',
    shardTestFiles: true
  };

  if (argv.browser) {
    const cap = browsers.find(l => l.browserName === argv.browser);
    console.log('cap', cap);
    capabilities = {
      browserName: cap.browserName,
      version: cap.version,
      platformName: cap.platformName,
      deviceName: cap.deviceName,
      name: 'Mime E2E Tests',
      shardTestFiles: true,
      maxInstances: 10
    };
    if (argv.headless) {
      capabilities.chromeOptions = {
        args: [
          'disable-infobars',
          '--headless',
          '--disable-gpu',
          '--window-size=1024x768'
        ]
      };
    }
    multiCapabilities.push(capabilities);
  } else {
    if (argv.device === 'android') {
      browsers = remoteBrowsers.androidLaunchers;
    } else if (argv.device === 'iphone') {
      browsers = remoteBrowsers.iphoneLaunchers;
    } else {
      browsers = remoteBrowsers.customDesktopLaunchers;
    }
    for (const cap of browsers) {
      const capability = {
        browserName: cap.browserName,
        version: cap.version,
        platform: cap.platform,
        platformName: cap.platformName,
        platformVersion: cap.platformVersion,
        deviceName: cap.deviceName,
        name: 'Mime E2E Tests',
        shardTestFiles: true,
        build: process.env.CIRCLE_BUILD_NUM,
        tunnelIdentifier: process.env.TUNNEL_IDENTIFIER,
        maxInstances: 5
      };

      if (process.env.CI) {
        capability.build = process.env.CIRCLE_BUILD_NUM;
        capability.tunnelIdentifier = process.env.TUNNEL_IDENTIFIER;
      }
      multiCapabilities.push(capability);
    }
  }
  return multiCapabilities;
}

function getTags() {
  let tags = ['~@Ignore'];
  let firefoxTags = ['~@Ignore-firefox'];

  if (argv.tags) {
    tags = tags.concat(argv.tags.split(','));
  }
  if (argv.browser === 'firefox') {
    tags = tags.concat(firefoxTags);
  }
  if (argv.headless) {
    tags = tags.concat(`~@Fullscreen`);
  }

  return tags;
}

function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature
      .split(',')
      .map(
        feature => `${process.cwd()}/${basePath}/features/**/${feature}.feature`
      );
  }

  return [`${process.cwd()}/${basePath}/features/**/*.feature`];
}

exports.config = config;

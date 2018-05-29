// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const remoteBrowsers = require('./remote-browsers');

const config = {
  allScriptsTimeout: 50000,
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: false,
  localSeleniumStandaloneOpts: {
    jvmArgs: ['-Dwebdriver.gecko.driver=./node_modules/geckodriver/geckodriver']
  },
  specs: getFeatureFiles(),
  unknownFlags: ['cucumberOpts', 'device'],
  multiCapabilities: getMultiCapabilities(),
  baseUrl: 'http://localhost:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      path.resolve(process.cwd(), './e2e/helpers/cucumber.config.ts'),
      path.resolve(process.cwd(), './e2e/**/*.steps.ts'),
      path.resolve(process.cwd(), './e2e/helpers/hooks.ts')
    ],
    format: 'json:.tmp/results.json',
    tags: getTags()
  },
  plugins: [
    {
      package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
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
    if (!config.multiCapabilities && config.capabilities.platformName !== 'Android' && config.capabilities.platformName !== 'iOS') {
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

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.maxSessions = 5;
}

console.log('specs', config.specs);

function getMultiCapabilities() {
  const multiCapabilities = [];
  let capabilities = {
    name: 'Mime E2E Tests',
    shardTestFiles: true,
    idleTimeout: 180
  };
  capabilities.maxInstances = process.env.TRAVIS ? 1 : 10;

  if (argv.browser) {
    const cap = remoteBrowsers.customLaunchers.find(l => l.browserName === argv.browser);
    capabilities = Object.assign({}, capabilities, {
      browserName: cap.browserName,
      version: cap.version,
      platform: cap.platform,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName,
      maxInstances: 10
    });
    if (argv.headless) {
      capabilities.chromeOptions = {
        args: ['disable-infobars', '--headless', '--disable-gpu', '--window-size=1024x768']
      };
    }
    multiCapabilities.push(capabilities);
  } else {
    let browsers = remoteBrowsers.customLaunchers;
    for (const cap of browsers) {
      const capability = {
        browserName: cap.browserName,
        version: cap.version,
        platform: cap.platform,
        platformName: cap.platformName,
        platformVersion: cap.platformVersion,
        deviceName: cap.deviceName,
        name: 'Mime E2E Tests',
        build: process.env.TRAVIS_JOB_NUMBER,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        maxInstances: 2
      };

      if (process.env.TRAVIS) {
        capability.build = process.env.TRAVIS_JOB_NUMBER;
        capability.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
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
    return argv.feature.split(',').map(feature => `${process.cwd()}/e2e/**/${feature}.feature`);
  }

  return [`${process.cwd()}/e2e/**/*.feature`];
}

exports.config = config;

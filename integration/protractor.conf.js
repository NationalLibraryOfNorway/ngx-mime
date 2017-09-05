// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
const remoteBrowsers = require('./remote-browsers');

const config = {
  allScriptsTimeout: 11000,
  SELENIUM_PROMISE_MANAGER: false,
  specs: getFeatureFiles(),
  unknownFlags: [
    'cucumberOpts',
    'device'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu" ]
    }    
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      path.resolve(process.cwd(), './e2e/helpers/after.scenario.ts'),
      path.resolve(process.cwd(), './e2e/helpers/cucumber.config.ts'),
      path.resolve(process.cwd(), './e2e/helpers/reporter.ts'),
      path.resolve(process.cwd(), './e2e/**/*.steps.ts')
    ],
    format: 'pretty',
    tags: ['~@Ignore']
  },
  onPrepare: function() {
    const width = 1600;
    const height = 1200;
    browser.driver.manage().window().setSize(width, height);
  },
  afterLaunch: function () {
    multiCucumberHTLMReporter.generate({
      openReportInBrowser: true,
      jsonDir: '.tmp/json-output',
      reportPath: './.tmp/report/'
    });
  },
  disableChecks: true,
  ignoreUncaughtExceptions: true
};

if (argv.device === 'desktop') {
  config.cucumberOpts.tags = config.cucumberOpts.tags.concat('@desktop');
} else if (argv.device === 'mobile') {
  config.cucumberOpts.tags = config.cucumberOpts.tags.concat('@mobile');
}

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;

  config.capabilities = null,
    config.multiCapabilities = getCapabilities(),
    config.afterLaunch = function () { }
}

function getCapabilities() {
  const capabilities = [];
  let browsers = remoteBrowsers.customDesktopLaunchers
    .concat(remoteBrowsers.customMobileLaunchers);
  if (argv.device === 'desktop') {
    browsers = remoteBrowsers.customDesktopLaunchers;
  } else if (argv.device === 'mobile') {
    browsers = remoteBrowsers.customMobileLaunchers;
  }

  for (const cap of browsers) {
    capabilities.push({
      browserName: cap.browserName,
      version: cap.version,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName,
      name: 'Mime E2E Tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_JOB_NUMBER,
      seleniumVersion: '3.3.1',
      screenResolution: "1600x1200"
    });
  }
  return capabilities;
}

function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature.split(',').map(feature => `${process.cwd()}/e2e/**/${feature}.feature`);
  }

  return [`${process.cwd()}/e2e/**/*.feature`];
}

exports.config = config;

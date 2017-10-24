// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
const remoteBrowsers = require('./remote-browsers');

const config = {
  allScriptsTimeout: 50000,
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: false,
  localSeleniumStandaloneOpts: {
    jvmArgs: ['-Dwebdriver.gecko.driver=./node_modules/geckodriver/geckodriver']
  },
  specs: getFeatureFiles(),
  unknownFlags: [
    'cucumberOpts',
    'device'
  ],
  capabilities: getCapabilities(),
  baseUrl: 'http://localhost:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      path.resolve(process.cwd(), './e2e/helpers/cucumber.config.ts'),
      path.resolve(process.cwd(), './e2e/**/*.steps.ts'),
      path.resolve(process.cwd(), './e2e/helpers/after.scenario.ts'),
      path.resolve(process.cwd(), './e2e/helpers/reporter.ts')
    ],
    format: 'pretty',
    tags: getTags()
  },
  onPrepare: function () {
    if (config.capabilities.platformName !== 'Android' && config.capabilities.platformName !== 'iOS') {
      const width = 1024;
      const height = 768;
      browser.driver.manage().window().setSize(width, height);
    }
  },
  disableChecks: true,
  ignoreUncaughtExceptions: true
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = Object.assign(config.capabilities, {
    name: 'Mime E2E Tests',
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_JOB_NUMBER,
  });
} else {
  config.afterLaunch = function () {
    multiCucumberHTLMReporter.generate({
      openReportInBrowser: false,
      jsonDir: '.tmp/json-output',
      reportPath: './.tmp/report/'
    });
  }
}

function getCapabilities() {
  let capabilities = null;
  if (argv.browser) {
    const cap = remoteBrowsers.customLaunchers.find(l => l.browserName === argv.browser);
    capabilities = {
      browserName: cap.browserName,
      version: cap.version,
      platform: cap.platform,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName,
    }
  } else {
    capabilities = {
      browserName: 'chrome'
    }
  }

  if (argv.browser ===  'chrome' && argv.headless) {
    capabilities.chromeOptions = {
      args: ["--headless", "--disable-gpu", "--window-size=1024x768"]
    }
  }

  return capabilities;
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
  return tags;
}

function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature.split(',').map(feature => `${process.cwd()}/e2e/**/${feature}.feature`);
  }

  return [`${process.cwd()}/e2e/**/*.feature`];
}

exports.config = config;

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
  unknownFlags: [
    'cucumberOpts',
    'device'
  ],
  multiCapabilities: getMultiCapabilities(),
  baseUrl: 'http://localhost:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      path.resolve(process.cwd(), './e2e/helpers/cucumber.config.ts'),
      path.resolve(process.cwd(), './e2e/**/*.steps.ts'),
      path.resolve(process.cwd(), './e2e/helpers/hooks.ts')
    ],
    format: 'json:.tmp/results.json',
    tags: getTags()
  },
  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile: true
    }
  }],
  onPrepare: function () {
    if (!config.multiCapabilities && config.capabilities.platformName !== 'Android' && config.capabilities.platformName !== 'iOS') {
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
}

function getMultiCapabilities() {
  let capabilities = {
    name: 'Mime E2E Tests',
    shardTestFiles: true,
  }
  capabilities.maxInstances = process.env.TRAVIS ? 2 : 10;
  if (argv.browser) {
    const cap = remoteBrowsers.customLaunchers.find(l => l.browserName === argv.browser);
    capabilities = (Object).assign({}, capabilities, {
      browserName: cap.browserName,
      version: cap.version,
      platform: cap.platform,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName,
    });
  } else {
    capabilities = (Object).assign({}, capabilities, {
      browserName: 'chrome'
    });
  }

  if (argv.headless) {
    capabilities.chromeOptions = {
      args: ['disable-infobars', '--headless', '--disable-gpu', '--window-size=1024x768']
    }
  }

  if (process.env.TRAVIS) {
      capabilities.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
      capabilities.build = process.env.TRAVIS_JOB_NUMBER;
  }

  return [capabilities];
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

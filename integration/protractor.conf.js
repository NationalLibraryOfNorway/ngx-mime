// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
const remoteBrowsers = require('./remote-browsers');

const config = {
  allScriptsTimeout: 11000,
  specs: getFeatureFiles(),
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:4200/',
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
    tags: ''
  },
  onPrepare() { },
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

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;

  config.capabilities = null,
  config.multiCapabilities = getCapabilities(),
  config.afterLaunch = function () {}
}

function getCapabilities() {
  const capabilities = [];
  for (const cap of remoteBrowsers.customLaunchers) {
    capabilities.push({
      browserName: cap.browserName,
      version: cap.version,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName,
      'name': 'Mime E2E Tests',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_JOB_NUMBER,
      shardTestFiles: true,
      maxInstances: 5,
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
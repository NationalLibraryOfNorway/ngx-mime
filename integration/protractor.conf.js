// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');

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
  config.capabilities = {
    'browserName': 'chrome',
    'version': 'latest',
    'chromedriverVersion': '2.28',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_JOB_NUMBER,
    'name': 'Mime E2E Tests',
  };
}

function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature.split(',').map(feature => `${process.cwd()}/e2e-tests/**/${feature}.feature`);
  }

  return [`${process.cwd()}/e2e/**/*.feature`];
}

exports.config = config;
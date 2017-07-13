// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
exports.config = {
  allScriptsTimeout: 11000,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    'e2e/features/**/*.feature'
  ],
  cucumberOpts: {
    require: [
      'e2e/helpers/after.scenario.ts',
      'e2e/support/cucumber.config.ts',
      'e2e/helpers/reporter.ts',
      'e2e/step-definitions/**/*.steps.ts'
    ],
    tags: ['~@Ignore']
  },
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:4200/',
  chromeDriver: './node_modules/chromedriver/bin/chromedriver',
  useAllAngular2AppRoots: true,
  afterLaunch: function () {
    multiCucumberHTLMReporter.generate({
      openReportInBrowser: true,
      jsonDir: '.tmp/json-output',
      reportPath: './.tmp/report/'
    });
  },
  onPrepare: function() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: './integration/e2e/tsconfig.e2e.json'
    });
  }
};

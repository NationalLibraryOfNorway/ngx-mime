const config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine'
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'browserName': 'chrome',
    'version': 'latest',
    'chromedriverVersion': '2.28',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_JOB_ID,
    'name': 'Mime E2E Tests',
  };
}

exports.config = config;
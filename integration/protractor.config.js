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

if (process.env['TRAVIS']) {
  config.sauceUser = 'ronnymikalsen',
  config.sauceKey = 'fa5b212d-466a-4e29-b593-957164bfc10b'
  config.capabilities = {
    'browserName': 'chrome',
    'version': 'latest',
    'chromedriverVersion': '2.28',
    'tunnel-identifier': process.env['TRAVIS_JOB_ID'],
    'build': process.env['TRAVIS_JOB_ID'],
    'name': 'Mime E2E Tests',
  };
}

exports.config = config;
const config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  sauceUser: 'ronnymikalsen',
  sauceKey: 'fa5b212d-466a-4e29-b593-957164bfc10b'
};

exports.config = config;
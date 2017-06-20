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
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY  
};



exports.config = config;
var fs = require('fs');
var reportDir = '.tmp/report/';

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const format = [`summary`, `html:${reportDir}/cucumber-report.html`];

const common = {
  requireModule: ['ts-node/register'],
  require: [
    './apps/integration-e2e/src/test.setup.js',
    './apps/integration-e2e/src/support/**/*.ts',
    './apps/integration-e2e/src/step-definitions/**/*.ts',
  ],
  paths: ['./apps/integration-e2e/src/features/**/*.feature'],
  publishQuiet: true,
  parallel: 10,
  failFast: false,
  format: format,
  tags: '(@desktop and not (@Ignore or @Fullscreen))',
  worldParameters: {
    appUrl: process.env.APP_URL || 'http://localhost:8080',
  },
};

module.exports = {
  default: {
    ...common,
  },
  ci: {
    ...common,
    parallel: 6,
    failFast: true,
    worldParameters: {
      ...common.worldParameters,
      ...{
        ci: true,
      },
    },
  },
};

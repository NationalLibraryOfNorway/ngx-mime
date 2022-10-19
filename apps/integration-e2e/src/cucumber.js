const fs = require('fs');
const args = require('yargs').argv;
const reportDir = '.tmp/report/';

const createFormat = () => {
  createReportDirectory();
  return [`progress-bar`, `html:${reportDir}/cucumber-report.html`];
};

const createTags = () => {
  const mode = process.env['MODE'];
  let tags = 'not @Ignore';
  const profile = args.p;

  if (args.tags) {
    tags = args.tags;
  } else {
    switch (mode) {
      case 'mobile':
        tags = '@android and not @Ignore';
        break;
      case 'iphone':
        tags = '@iphone and not @Ignore';
        break;
      default:
        tags = '@desktop and not @Ignore';
    }

    if (!profile || profile !== 'ci') {
      tags = `${tags} and not @Fullscreen`;
    }
  }

  return tags;
};

const createAppUrl = () => {
  return process.env['APP_URL'] || 'http://localhost:8080';
};

const createReportDirectory = () => {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
};

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
  failFast: true,
  format: createFormat(),
  strict: false,
  tags: createTags(),
  worldParameters: {
    appUrl: createAppUrl(),
  },
};

const ci = {
  ...common,
  parallel: 6,
  failFast: true,
  worldParameters: {
    ...common.worldParameters,
    ...{
      ci: true,
    },
  },
};

module.exports = {
  default: common,
  ci: ci,
};

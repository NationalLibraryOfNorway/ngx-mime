var fs = require('fs');
var reportDir = '.tmp/report/';

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const format = [`progress-bar`, `html:${reportDir}/cucumber-report.html`];

const mode = process.env['MODE'];
let tags = 'not @Ignore';

switch (mode) {
  case 'desktop':
    tags = '@desktop and not (@Ignore or @Fullscreen)';
    break;
  case 'mobile':
    tags = '@android and not (@Ignore or @Fullscreen)';
    break;
  case 'iphone':
    tags = '@iphone and not (@Ignore or @Fullscreen)';
    break;
  default:
    tags = 'not @Ignore';
}

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
  strict: false,
  tags: tags,
  worldParameters: {
    appUrl: process.env['APP_URL'] || 'http://localhost:8080',
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

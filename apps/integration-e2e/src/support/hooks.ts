import {
  After,
  Before,
  ITestCaseHookParameter,
  IWorld,
  setDefaultTimeout,
  setWorldConstructor,
  Status,
} from '@cucumber/cucumber';
import { TestStepResultStatus } from '@cucumber/messages';
import { test } from '@playwright/test';

// eslint-disable-next-line
// @ts-ignore
import withMessage from 'jest-expect-message/dist/withMessage';
import { Browser, chromium, devices } from 'playwright';
import { CustomWorld } from './custom-world';

const expect = withMessage(test.expect);
const AxeBuilder = require('@axe-core/playwright').default;

const reportsDir = '.tmp/report';
const desktopDescriptor = devices['Desktop Chrome'];
const androidDescriptor = devices['Pixel 5'];
const iphoneDescriptor = devices['iPhone 13'];

setDefaultTimeout(120 * 1000);

Before(async function (scenario: ITestCaseHookParameter): Promise<void> {
  const mode = process.env['MODE'];

  let deviceDescriptor = desktopDescriptor;
  let browserName = 'pw-chromium';
  let platform = 'Windows 10';
  if (mode === 'mobile') {
    deviceDescriptor = androidDescriptor;
  } else if (mode === 'iphone') {
    platform = 'MacOS Catalina';
    browserName = 'pw-webkit';
    deviceDescriptor = iphoneDescriptor;
  } else if (mode === 'firefox') {
    browserName = 'pw-firefox';
  } else if (mode === 'edge') {
    browserName = 'MicrosoftEdge';
  }

  if (isCi(this.parameters)) {
    const capabilities = {
      browserName: browserName,
      browserVersion: 'latest',
      'LT:Options': {
        platform: platform,
        build: `ngx-mime-${
          process.env['CI_PIPELINE_IID']
            ? process.env['CI_PIPELINE_IID']
            : 'local'
        }`,
        name: scenario.pickle.name,
        user: process.env['LT_USERNAME'],
        accessKey: process.env['LT_ACCESS_KEY'],
        network: true,
        video: true,
        console: true,
        tunnel: true,
        tunnelName: process.env['TUNNEL_IDENTIFIER'],
      },
    };
    this['browser'] = await connect(capabilities);
  } else {
    this['browser'] = await chromium.launch({
      slowMo: 0,
      headless: true,
    });
  }
  this['context'] = await this['browser'].newContext({
    ...deviceDescriptor,
    recordVideo: process.env['PWVIDEO']
      ? { dir: `${reportsDir}/videos` }
      : undefined,
  });
  await this['context'].tracing.start({ screenshots: true, snapshots: true });
  this.page = await this['context'].newPage();

  this.init(this);
});

After(async function (result: ITestCaseHookParameter): Promise<void> {
  let status = result.result?.status;
  let remark = result.result?.message;
  try {
    if (this.page && status === Status.PASSED) {
      const a11y = await a11yAnalyze(this, remark, status);
      status = a11y.status;
      remark = a11y.remark;
      expect(status).toBe(Status.PASSED);
    }
  } finally {
    await setStatus(this, status, remark);
    await this['page']?.close();
    await this['context']?.close();
    await this['browser']?.close();
  }
});

setWorldConstructor(CustomWorld);

const isCi = (parameters: any) => {
  return parameters.ci ? parameters.ci : false;
};

const connect = async (capabilities: any) => {
  let browser: Browser | undefined = undefined;
  for (let i = 0; i < 3; i++) {
    try {
      browser = await chromium.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities)
        )}`
      );
      break;
    } catch (e) {
      console.log(e);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  return browser;
};

const a11yAnalyze = async (
  _this: IWorld<CustomWorld>,
  remark: string | undefined,
  status: TestStepResultStatus | undefined
) => {
  const results = await new AxeBuilder({ page: _this.page })
    .disableRules('landmark-one-main')
    .analyze();
  const violations: [] = results.violations;

  if (violations.length > 0) {
    remark = JSON.stringify(violations, null, 2);
    status = Status.FAILED;
  }

  return {
    remark,
    status,
  };
};

const setStatus = async (
  _this: IWorld<any>,
  status: TestStepResultStatus | undefined,
  remark: string | undefined
): Promise<void> => {
  try {
    if (status !== Status.PASSED) {
      const image = await _this.page?.screenshot();
      image && (await _this.attach(image, 'image/png'));
    }
    await _this['context']?.tracing.stop({
      path: `${reportsDir}/traces/${_this.testName}-${
        _this.startTime?.toISOString().split('.')[0]
      }trace.zip`,
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await _this.page.evaluate(() => {},
    `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`);
  } catch (e) {
    console.warn('Could not send test result', e);
  }
};

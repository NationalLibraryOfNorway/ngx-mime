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

setDefaultTimeout(120 * 1000);

Before(async function (scenario: ITestCaseHookParameter): Promise<void> {
  if (isCi(this.parameters)) {
    this.browser = await connectToTestingCloud(scenario);
  } else {
    this.browser = await launchChromium();
  }
  this.context = await createContext(this);
  await startTracing(this.context);
  this.page = await this.context.newPage();

  this.init(this);
});

After(async function (result: ITestCaseHookParameter): Promise<void> {
  let status = result.result?.status;
  let remark = result.result?.message;
  const name = result.pickle.name.replace(/\s/g, '_');

  try {
    if (this.page && status === Status.PASSED) {
      const a11y = await a11yAnalyze(this, remark, status);
      status = a11y.status;
      remark = a11y.remark;
      expect(status).toBe(Status.PASSED);
    }
  } finally {
    await setStatus(this, name, status, remark);
    await stopTracing(this);
    await close(this);
  }
});

setWorldConstructor(CustomWorld);

const isCi = (parameters: any) => {
  return parameters.ci ? parameters.ci : false;
};

const launchChromium = () => {
  return chromium.launch({
    slowMo: 0,
    headless: true,
  });
};

const connectToTestingCloud = async (scenario: ITestCaseHookParameter) => {
  const mode = process.env['MODE'];

  let deviceDescriptor = devices['Desktop Chrome'];
  let browserName = 'pw-chromium';
  let platform = 'Windows 10';
  if (mode === 'mobile') {
    deviceDescriptor = devices['Pixel 5'];
  } else if (mode === 'iphone') {
    platform = 'MacOS Catalina';
    browserName = 'pw-webkit';
    deviceDescriptor = devices['iPhone 13'];
  } else if (mode === 'firefox') {
    browserName = 'pw-firefox';
  } else if (mode === 'edge') {
    browserName = 'MicrosoftEdge';
  }

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

const createContext = (_this: IWorld<CustomWorld>) => {
  return _this.browser.newContext({
    ...devices['Pixel 5'],
    recordVideo: process.env['PWVIDEO']
      ? { dir: `${reportsDir}/videos` }
      : undefined,
  });
};

const startTracing = async (_this: IWorld<CustomWorld>) => {
  return _this.context.tracing.start({ screenshots: true, snapshots: true });
};

const stopTracing = async (_this: IWorld<CustomWorld>) => {
  const time = new Date().toISOString();
  const tracePath = `${reportsDir}/traces/${name}-${time}-trace.zip`;
  await _this.context?.tracing.stop({
    path: tracePath,
  });

  let message = `Trace: npx playwright show-trace ${tracePath}`;
  if (process.env['PWVIDEO']) {
    const path: string = await _this.page.video().path();
    message = `${message}\nVideo: vlc ${path}`;
  }
  _this.attach(message);
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
  _this: IWorld<CustomWorld>,
  name: string,
  status: TestStepResultStatus | undefined,
  remark: string | undefined
): Promise<void> => {
  try {
    if (status !== Status.PASSED) {
      const image = await _this.page?.screenshot();
      image && (await _this.attach(image, 'image/png'));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await _this.page.evaluate(() => {},
    `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`);
  } catch (e) {
    console.warn('Could not send test result', e);
  }
};

const close = async (_this: IWorld<CustomWorld>) => {
  await _this.page?.close();
  await _this.context?.close();
  await _this.browser?.close();
};

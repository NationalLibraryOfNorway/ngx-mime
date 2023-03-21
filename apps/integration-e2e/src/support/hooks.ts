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
import {
  Browser,
  BrowserContext,
  chromium,
  ConsoleMessage,
  devices,
  test,
} from '@playwright/test';

// eslint-disable-next-line
// @ts-ignore
import withMessage from 'jest-expect-message/dist/withMessage';
import { CustomWorld } from './custom-world';

const expect = withMessage(test.expect);
const AxeBuilder = require('@axe-core/playwright').default;
const reportsDir = '.tmp/report';
const mode = process.env['MODE'];

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
  this.page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      console.log(msg.text() + ' | ' + msg.location().url);
    }
  });
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
      expect(status, remark).toEqual(Status.PASSED);
    }
  } finally {
    await setStatus(this, status, remark);
    await stopTracing(this, name);
    await close(this);
  }
});

setWorldConstructor(CustomWorld);

const isCi = (parameters: any): boolean => {
  return parameters.ci ? parameters.ci : false;
};

const launchChromium = () => {
  return chromium.launch({
    channel: 'chrome',
    slowMo: 0,
    headless: true,
  });
};

const getDeviceDescriptor = () => {
  let deviceDescriptor = devices['Desktop Chrome'];
  if (mode === 'mobile') {
    deviceDescriptor = devices['Pixel 5'];
  } else if (mode === 'iphone') {
    deviceDescriptor = devices['iPhone 13'];
  }
  return deviceDescriptor;
};

const connectToTestingCloud = async (
  scenario: ITestCaseHookParameter
): Promise<Browser | undefined> => {
  let browserName = 'Chrome';
  let platform = 'Windows 11';
  if (mode === 'iphone') {
    platform = 'MacOS Monterey';
    browserName = 'pw-webkit';
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
        process.env['CIRCLE_BUILD_NUM']
          ? process.env['CIRCLE_BUILD_NUM']
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

const createContext = (_this: IWorld<CustomWorld>): Promise<BrowserContext> => {
  return _this.browser.newContext({
    ...getDeviceDescriptor(),
    recordVideo: process.env['PWVIDEO']
      ? { dir: `${reportsDir}/videos` }
      : undefined,
  });
};

const startTracing = async (context: BrowserContext): Promise<void> => {
  return context.tracing.start({ screenshots: true, snapshots: true });
};

const stopTracing = async (_this: IWorld<CustomWorld>, name: string) => {
  try {
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
  } catch (e) {
    console.error('Error in stopTrace', e);
  }
};

const a11yAnalyze = async (
  _this: IWorld<CustomWorld>,
  remark: string | undefined,
  status: TestStepResultStatus | undefined
): Promise<RemarkAndStatus> => {
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

const close = async (_this: IWorld<CustomWorld>): Promise<void> => {
  await _this.page?.close();
  await _this.context?.close();
  await _this.browser?.close();
};

interface RemarkAndStatus {
  remark: string | undefined;
  status: TestStepResultStatus | undefined;
}

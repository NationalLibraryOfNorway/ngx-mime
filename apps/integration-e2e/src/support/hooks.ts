import {
  After,
  Before,
  ITestCaseHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status,
} from '@cucumber/cucumber';
import { TestStepResultStatus } from '@cucumber/messages';
import { test } from '@playwright/test';

// eslint-disable-next-line
// @ts-ignore
import withMessage from 'jest-expect-message/dist/withMessage';
import { chromium, Page } from 'playwright';
import { CustomWorld } from './custom-world';
const expect = withMessage(test.expect);
const AxeBuilder = require('@axe-core/playwright').default;

const reportsDir = '.tmp/report';

setDefaultTimeout(60 * 1000);

Before({ tags: '@Ignore' }, async function (): Promise<TestStepResultStatus> {
  return Status.SKIPPED;
});

Before(async function (scenario: ITestCaseHookParameter): Promise<void> {
  const isCi: boolean = this.parameters.ci ? this.parameters.ci : false;

  if (isCi) {
    const capabilities = {
      browserName: 'Chrome',
      browserVersion: 'latest',
      'LT:Options': {
        platform: 'Windows 10',
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

    this['browser'] = await chromium.connect(
      `wss://tools.nb.no/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`
    );
  } else {
    this['browser'] = await chromium.launch({
      channel: 'chrome',
      slowMo: 0,
      headless: true,
    });
  }

  this.context = await this.browser.newContext({
    recordVideo: process.env['PWVIDEO']
      ? { dir: `${reportsDir}/videos` }
      : undefined,
  });
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();

  this.init(this);
});

After(async function (result: ITestCaseHookParameter): Promise<void> {
  let status = result.result?.status;
  let remark = result.result?.message;

  const setStatus = async (
    page: Page,
    status: TestStepResultStatus | undefined,
    remark: string | undefined
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await page.evaluate(() => {},
    `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`);
  };

  if (this.page) {
    if (result.result?.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
      await this.context?.tracing.stop({
        path: `${reportsDir}/traces/${this.testName}-${
          this.startTime?.toISOString().split('.')[0]
        }trace.zip`,
      });
      await setStatus(this.page, status, remark);
    } else {
      const results = await new AxeBuilder({ page: this.page })
        .disableRules('landmark-one-main')
        .analyze();
      const violations = results.violations;

      if (violations.length > 0) {
        remark = JSON.stringify(violations, null, 2);
        status = Status.FAILED;
      }

      await setStatus(this.page, status, remark);
      //TODO expect(violations.length, remark).toBe(0);
    }
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});

setWorldConstructor(CustomWorld);

import AxeBuilder from '@axe-core/playwright';
import {
  Browser,
  BrowserContext,
  ConsoleMessage,
  Page,
  TestInfo,
  chromium,
  devices,
  expect,
} from '@playwright/test';
import { createBdd, test as base } from 'playwright-bdd';
import { CustomWorld } from './custom-world';

const isRemoteExecution = process.env['E2E_EXECUTION'] === 'remote';
const reportsDir = '.tmp/report';

type TestMode =
  | 'chrome'
  | 'edge'
  | 'firefox'
  | 'mobile'
  | 'iphone'
  | 'elements';

type Fixtures = {
  world: CustomWorld;
};

export const test = base.extend<Fixtures>({
  world: async ({ $testInfo: testInfo }, use) => {
    const mode = getMode(testInfo);
    const browser = isRemoteExecution
      ? await connectToTestingCloud(testInfo, mode)
      : await launchChromium();
    const context = await createContext(browser, mode);

    const page = await context.newPage();
    page.on('console', logBrowserError);

    const world = new CustomWorld(page, browser, context);

    let accessibilityError: unknown;
    try {
      await use(world);
      if (testInfo.status === testInfo.expectedStatus) {
        await assertNoAccessibilityViolations(page);
      }
    } catch (error) {
      accessibilityError = error;
    } finally {
      const failure = accessibilityError ?? testInfo.error;
      if (isRemoteExecution) {
        await setTestingCloudStatus(page, failure);
      }
      await attachFailureScreenshot(page, testInfo, failure);
      await closeBrowser(browser, context, page, testInfo);
    }

    if (accessibilityError) {
      throw accessibilityError;
    }
  },
});

export const { Given, Then, When } = createBdd(test, {
  worldFixture: 'world',
});

function launchChromium(): Promise<Browser> {
  return chromium.launch({
    channel: 'chrome',
    slowMo: 0,
    headless: true,
  });
}

function getMode(testInfo: TestInfo): TestMode {
  const projectName = testInfo.project.name;
  if (projectName === 'android') {
    return 'mobile';
  }
  if (
    projectName === 'chrome' ||
    projectName === 'edge' ||
    projectName === 'firefox' ||
    projectName === 'iphone' ||
    projectName === 'elements'
  ) {
    return projectName;
  }

  return 'chrome';
}

function getDeviceDescriptor(mode: TestMode) {
  if (mode === 'mobile') {
    return devices['Pixel 5'];
  }
  if (mode === 'iphone') {
    return devices['iPhone 13'];
  }

  return devices['Desktop Chrome'];
}

async function connectToTestingCloud(
  testInfo: TestInfo,
  mode: TestMode,
): Promise<Browser> {
  let browserName = 'Chrome';
  let platform = 'Windows 11';
  if (mode === 'iphone') {
    platform = 'MacOS Sequoia';
    browserName = 'pw-webkit';
  } else if (mode === 'firefox') {
    browserName = 'pw-firefox';
  } else if (mode === 'edge') {
    browserName = 'MicrosoftEdge';
  }

  const capabilities = {
    browserName,
    browserVersion: 'latest',
    'LT:Options': {
      platform,
      build: `ngx-mime-${process.env['GITHUB_RUN_NUMBER'] ?? 'local'}`,
      name: testInfo.title,
      user: process.env['LT_USERNAME'],
      accessKey: process.env['LT_ACCESS_KEY'],
      network: true,
      video: true,
      console: true,
      tunnel: true,
      tunnelName: process.env['TUNNEL_IDENTIFIER'],
    },
  };

  let connectionError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await chromium.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities),
        )}`,
      );
    } catch (error) {
      connectionError = error;
      console.warn('Could not connect to LambdaTest', error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  throw connectionError;
}

function createContext(
  browser: Browser,
  mode: TestMode,
): Promise<BrowserContext> {
  return browser.newContext({
    ...getDeviceDescriptor(mode),
    baseURL: process.env['BASE_URL'] ?? 'http://localhost:8080',
    recordVideo: process.env['PWVIDEO']
      ? { dir: `${reportsDir}/videos` }
      : undefined,
  });
}

function logBrowserError(message: ConsoleMessage): void {
  if (message.type() === 'error') {
    console.log(`${message.text()} | ${message.location().url}`);
  }
}

async function assertNoAccessibilityViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .disableRules('landmark-one-main')
    .analyze();

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([]);
}

async function setTestingCloudStatus(
  page: Page,
  failure: unknown,
): Promise<void> {
  try {
    const status = failure ? 'failed' : 'passed';
    const remark =
      failure === undefined
        ? undefined
        : failure instanceof Error
          ? failure.message
          : String(failure);
    await page.evaluate(
      () => {},
      `lambdatest_action: ${JSON.stringify({
        action: 'setTestStatus',
        arguments: { status, remark },
      })}`,
    );
  } catch (error) {
    console.warn('Could not send test result', error);
  }
}

async function attachFailureScreenshot(
  page: Page,
  testInfo: TestInfo,
  failure: unknown,
): Promise<void> {
  if (!failure) {
    return;
  }

  try {
    await testInfo.attach('screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  } catch (error) {
    console.warn('Could not capture failure screenshot', error);
  }
}

async function closeBrowser(
  browser: Browser,
  context: BrowserContext,
  page: Page,
  testInfo: TestInfo,
): Promise<void> {
  const video = page.video();
  try {
    await context.close();
    if (video) {
      await testInfo.attach('video', {
        path: await video.path(),
        contentType: 'video/webm',
      });
    }
  } finally {
    await browser.close();
  }
}

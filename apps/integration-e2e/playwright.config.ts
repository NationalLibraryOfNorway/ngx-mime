import { defineConfig } from '@playwright/test';
import { hostname } from 'node:os';
import path from 'node:path';
import { cucumberReporter, defineBddProject } from 'playwright-bdd';

const isCi = process.env['CI'] === 'true';
const isRemoteExecution = process.env['E2E_EXECUTION'] === 'remote';
const workspaceRoot = path.resolve(__dirname, '../..');
const wiremockRoot = path.join(__dirname, 'src/wiremock');
const customTags = process.env['BDD_TAGS'];

if (isRemoteExecution && !process.env['TUNNEL_IDENTIFIER']) {
  process.env['TUNNEL_IDENTIFIER'] = `${hostname()}-tunnel`;
}

export default defineConfig({
  outputDir: path.join(workspaceRoot, '.tmp/test-results'),
  fullyParallel: true,
  workers: isCi ? 5 : 10,
  retries: isCi ? 2 : 0,
  maxFailures: isCi ? 1 : 0,
  timeout: 120_000,
  projects: createProjects(),
  webServer: createWebServers(),
  reporter: isCi
    ? [['line']]
    : [
        ['line'],
        cucumberReporter('html', {
          outputFile: path.join(
            workspaceRoot,
            '.tmp/report/cucumber-report.html',
          ),
        }),
      ],
});

function createWebServers() {
  const servers = [
    {
      command:
        'npx wiremock --disable-banner --enable-stub-cors --disable-request-logging --port 4040',
      cwd: wiremockRoot,
      url: 'http://127.0.0.1:4040/__admin/health',
      reuseExistingServer: !isCi,
      timeout: 300_000,
      gracefulShutdown: {
        signal: 'SIGTERM' as const,
        timeout: 5_000,
      },
    },
    {
      command: 'npx nx serve integration',
      cwd: workspaceRoot,
      url: 'http://127.0.0.1:8080',
      reuseExistingServer: !isCi,
      timeout: 300_000,
    },
  ];

  return isRemoteExecution ? [...servers, createRemoteTunnel()] : servers;
}

function createRemoteTunnel() {
  return {
    command: 'npx nx run integration-e2e:remote-tunnel',
    cwd: workspaceRoot,
    url: 'http://127.0.0.1:15000/api/v1.0/info',
    reuseExistingServer: !isCi,
    timeout: 300_000,
    gracefulShutdown: {
      signal: 'SIGTERM' as const,
      timeout: 5_000,
    },
  };
}

function createProjects() {
  const projects = [
    createProject(
      'chrome',
      isRemoteExecution ? '@desktop' : '@desktop and not @fullscreen',
    ),
    createProject('android', '@android and not @fullscreen'),
    createProject('iphone', '@iphone and not @fullscreen'),
    createProject('elements', '@elements'),
  ];

  if (isRemoteExecution) {
    projects.splice(
      1,
      0,
      createProject('edge', '@desktop and not @fullscreen'),
      createProject('firefox', '@desktop and not @fullscreen'),
    );
  }

  return projects;
}

function createProject(name: string, tags: string) {
  return {
    ...defineBddProject({
      name,
      features: './src/features/**/*.feature',
      steps: [
        './src/support/fixtures.ts',
        './src/step-definitions/**/*.steps.ts',
      ],
      tags: `${customTags ?? tags} and not @ignore`,
    }),
  };
}

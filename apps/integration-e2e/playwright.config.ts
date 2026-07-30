import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { cucumberReporter, defineBddProject } from 'playwright-bdd';

const isCi = process.env['CI'] === 'true';
const workspaceRoot = path.resolve(__dirname, '../..');
const customTags = process.env['BDD_TAGS'];

export default defineConfig({
  outputDir: path.join(workspaceRoot, '.tmp/test-results'),
  fullyParallel: true,
  workers: isCi ? 5 : 10,
  retries: isCi ? 2 : 0,
  maxFailures: isCi ? 1 : 0,
  timeout: 120_000,
  projects: createProjects(),
  webServer: [
    {
      command: 'npx nx run integration-e2e:mocks',
      cwd: workspaceRoot,
      url: 'http://127.0.0.1:4040/catalog/v1/iiif/a-ltr-book/manifest',
      reuseExistingServer: !isCi,
      timeout: 300_000,
    },
    {
      command: 'npx nx serve integration',
      cwd: workspaceRoot,
      url: 'http://127.0.0.1:8080',
      reuseExistingServer: !isCi,
      timeout: 300_000,
    },
  ],
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

function createProjects() {
  const projects = [
    createProject('chrome', isCi ? '@desktop' : '@desktop and not @fullscreen'),
    createProject('android', '@android and not @fullscreen'),
    createProject('iphone', '@iphone and not @fullscreen'),
    createProject('elements', '@elements'),
  ];

  if (isCi) {
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

# Integration end-to-end tests

The integration end-to-end tests use Playwright with Cucumber feature files.
Run all commands from the workspace root.

## Run local tests

Install the Chrome browser once:

```bash
yarn playwright install chrome
```

Run all local tests:

```bash
nx e2e integration-e2e
```

Nx builds the integration application before the tests run. Playwright starts
the application and WireMock automatically.

Local runs provide these Playwright projects:

- `chrome`
- `android`
- `iphone`
- `elements`

## Disable the Nx cache

Force a fresh test run instead of using a cached result:

```bash
nx e2e integration-e2e --skip-nx-cache
```

## Filter tests

Use Playwright's `--grep` option to filter tests by a Cucumber tag:

```bash
nx e2e integration-e2e --grep @content-search
```

Filter by scenario name:

```bash
nx e2e integration-e2e --grep "Display metadata"
```

## Select a Playwright project

Run the tests for one browser or device:

```bash
nx e2e integration-e2e -- --project=android
```

Combine `--grep` and `--project` to run a specific test on a specific project:

```bash
nx e2e integration-e2e -- --grep @content-search --project=chrome
```

## Use Playwright UI mode

Open Playwright's interactive UI to explore, run, and debug tests:

```bash
nx e2e integration-e2e --ui
```

## Run tests remotely

Remote tests run on LambdaTest. Set your LambdaTest credentials before
starting the run:

```bash
export LT_USERNAME="<username>"
export LT_ACCESS_KEY="<access-key>"
nx e2e integration-e2e -c remote
```

Remote runs add the `edge` and `firefox` projects to the projects available
locally. Select one with Playwright's `--project` option:

```bash
nx e2e integration-e2e -c remote -- --project=firefox
```

The LambdaTest tunnel starts automatically. A unique tunnel name is generated
from the hostname unless `TUNNEL_IDENTIFIER` is set.

## Environment variables

- `BASE_URL` changes the application URL used by the tests. It defaults to
  `http://localhost:8080`.
- `PWVIDEO` enables local Playwright video recording when set.
- `TUNNEL_IDENTIFIER` sets a custom LambdaTest tunnel name.

## Test output

Local runs write the HTML Cucumber report to
`.tmp/report/cucumber-report.html`. Playwright test artifacts are written to
`.tmp/test-results`.

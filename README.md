# Mime IIIF Viewer for Angular

[![npm version](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime.svg)](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime)
[![CI](https://github.com/NationalLibraryOfNorway/ngx-mime/actions/workflows/ci.yml/badge.svg)](https://github.com/NationalLibraryOfNorway/ngx-mime/actions/workflows/ci.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<a href="https://www.lambdatest.com/hyperexecute" target="_blank"><img width="209" alt="HE Badge" src="https://user-images.githubusercontent.com/10496433/203929571-69077a63-1928-435e-b8ba-f4cdcb9d960b.png"></a>

This repository contains the `@nationallibraryofnorway/ngx-mime` Angular
library, its demo applications, and its test infrastructure. See the
[library README](libs/ngx-mime/README.md) if you want to install and use the
published package.

## Workspace projects

| Project                                   | Purpose                                               |
| ----------------------------------------- | ----------------------------------------------------- |
| [`ngx-mime`](libs/ngx-mime)               | Publishable Angular IIIF viewer library               |
| [`demo`](apps/demo)                       | Interactive development and demonstration application |
| [`elements`](apps/elements)               | Angular Elements build of the viewer                  |
| [`integration`](apps/integration)         | Host application used by the integration tests        |
| [`integration-e2e`](apps/integration-e2e) | Playwright and Cucumber end-to-end tests              |

List all available Nx projects with:

```bash
nx show projects
```

## Development setup

Install Node.js and enable Corepack, then install the workspace dependencies:

```bash
corepack enable
yarn install --immutable
```

Start the demo application:

```bash
nx serve demo
```

## Common tasks

Build the published library:

```bash
nx build ngx-mime
```

Run its unit tests:

```bash
nx test ngx-mime
```

Lint it:

```bash
nx lint ngx-mime
```

Run the main checks for all projects affected by your changes:

```bash
nx affected -t lint test build
```

See the [integration end-to-end test guide](apps/integration-e2e/README.md)
for local, filtered, interactive, and LambdaTest test runs.

## Contributing

The viewer is under active development. Before submitting a change, read the
[contribution guidelines](CONTRIBUTING.md) and the
[Developer Setup Guide](https://github.com/NationalLibraryOfNorway/ngx-mime/wiki/Developer-Setup).

## Maintainer releases

Maintainers publishing a new package version should follow the
[release runbook](RELEASING.md).

## License

Mime is available under the [MIT License](LICENSE).

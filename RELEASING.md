# Releasing ngx-mime

This runbook is for maintainers publishing
`@nationallibraryofnorway/ngx-mime` to npm.

Nx Release manages the version, changelog, release commit, Git tag, build, and
npm publication. The release configuration lives in
[`nx.json`](nx.json) and [`libs/ngx-mime/project.json`](libs/ngx-mime/project.json).
Do not update package versions or `CHANGELOG.md` manually.

## What a release changes

The current configuration:

- releases only the `ngx-mime` project;
- determines the current version from the latest Git tag, falling back to the
  version on disk;
- determines the next version from Conventional Commits unless a version
  specifier is provided;
- builds the `ngx-mime` library and the `elements` application before
  versioning;
- updates the source and built package manifests;
- updates `CHANGELOG.md`;
- includes the generated library and Angular Elements output in the release
  commit;
- creates a `chore(release): <version>` commit and an annotated
  `v<version>` tag; and
- publishes the package from
  `dist/libs/@nationallibraryofnorway/ngx-mime` with public access.

## Prerequisites

Before starting:

1. Confirm that the latest CI run on `main` passed.
2. Use Node.js 24 and the repository's Corepack-managed Yarn version.
3. Use a clone whose `origin` remote points to the official repository and for
   which you have push access.
4. Authenticate to npm with an account that can publish the package.
5. Start from an up-to-date, clean `main` branch with all tags available.

Nx Release uses the `origin` remote when generating repository and commit links
for the changelog. Verify that it is the official repository before continuing:

```bash
git remote get-url origin
```

The result must be either
`git@github.com:NationalLibraryOfNorway/ngx-mime.git` or
`https://github.com/NationalLibraryOfNorway/ngx-mime.git`. If `origin` points to
a personal fork, use a dedicated release clone or reconfigure the remotes before
continuing.

```bash
corepack enable
yarn install --immutable
npm whoami --registry=https://registry.npmjs.org
git switch main
git pull --ff-only origin main
git fetch origin --tags
git status --short
```

`git status --short` must produce no output.

## Preview the release

Always begin with a dry run:

```bash
nx release --dry-run
```

Review the proposed version and changelog. The default version is calculated
from Conventional Commits since the latest release tag.

To intentionally override that calculation, provide a SemVer keyword or exact
version:

```bash
nx release patch --dry-run
nx release minor --dry-run
nx release major --dry-run
nx release 21.0.0 --dry-run
```

The configured release build is skipped during a dry run. The normal CI build
must therefore already be passing.

## Create and inspect the local release

Run the same command without `--dry-run`, but initially skip publication:

```bash
nx release --skip-publish
```

If the dry run used an explicit specifier, use the same specifier here:

```bash
nx release 21.0.0 --skip-publish
```

Nx builds the release artifacts and creates the release commit and tag locally.
Inspect them before publishing:

```bash
git show --stat --decorate HEAD
git tag --points-at HEAD
git status --short
```

Confirm that:

- the commit is named `chore(release): <version>`;
- the expected `v<version>` tag points at that commit;
- the version and changelog are correct;
- the generated library and Elements artifacts are included; and
- the worktree is clean.

Do not amend the release commit or move the tag after publication.

## Publish and push

Publish the already-versioned package:

```bash
nx release publish
```

If npm requires a one-time password:

```bash
nx release publish --otp=<code>
```

After publication succeeds, push the release commit and annotated tag:

```bash
git push origin main --follow-tags
```

## Verify the release

Confirm that npm and GitHub show the new version:

```bash
npm view @nationallibraryofnorway/ngx-mime version
git ls-remote --tags origin v<version>
```

Also verify that the changelog comparison links and the package installation
instructions in [`libs/ngx-mime/README.md`](libs/ngx-mime/README.md) remain
correct.

## Recover from an interrupted release

If versioning succeeds but npm publication fails, keep the release commit and
tag unchanged. Fix the authentication or registry problem and retry only:

```bash
nx release publish
```

If npm publication succeeds but the Git push fails, retry the push. Do not
create another version or publish the same version again.

If the release has not been published and the generated version, commit, or tag
is wrong, stop and coordinate with another maintainer before rewriting release
history.

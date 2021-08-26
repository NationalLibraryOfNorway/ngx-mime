#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout main; git pull origin main
yarn build:libs
yarn build:elements
CURRENT_VERSION=$(node -p "require('./package.json').version")
cd dist/libs/@nationallibraryofnorway/ngx-mime

echo "Version: $CURRENT_VERSION"
npm version $CURRENT_VERSION

cd ../../../..
cp README.md dist/libs/@nationallibraryofnorway/ngx-mime
git add -f dist && standard-version -a
git push --follow-tags origin main
npm publish dist/libs/@nationallibraryofnorway/ngx-mime

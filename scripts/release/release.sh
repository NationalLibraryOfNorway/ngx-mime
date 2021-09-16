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

cp README.md dist/libs/@nationallibraryofnorway/ngx-mime
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Version: $CURRENT_VERSION"

cd dist/libs/@nationallibraryofnorway/ngx-mime
npm version $CURRENT_VERSION
cd ../../../..

git add -f dist && standard-version -a
git push --follow-tags origin main

npm login
npm publish dist/libs/@nationallibraryofnorway/ngx-mime

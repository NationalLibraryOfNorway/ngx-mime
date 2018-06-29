#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout master; git pull origin master
yarn build:prod
standard-version

CURRENT_VERSION=$(node -p "require('./package.json').version")
cd dist/libs/@nationallibraryofnorway/ngx-mime

echo "Version: $CURRENT_VERSION"
npm version $CURRENT_VERSION

cd ../../..
git push --follow-tags origin master; npm publish dist/libs/@nationallibraryofnorway/ngx-mime

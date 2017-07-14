#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout master; git pull origin master
npm run build
standard-version -- --prerelease alpha
cp package.json dist/package.json
git push --follow-tags origin master; npm publish dist

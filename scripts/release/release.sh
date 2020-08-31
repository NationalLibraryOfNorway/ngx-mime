#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout master; git pull origin master
yarn build:libs
yarn build:elements
git add -f dist && standard-version -a --dry-run

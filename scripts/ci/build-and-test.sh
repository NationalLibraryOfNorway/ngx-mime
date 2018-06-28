#!/bin/bash

set -e

echo ""
echo "Building sources and running tests"
echo ""

# Go to project dir
cd $(dirname $0)/../..

# Include sources.
source ./scripts/ci/sources/tunnel.sh

yarn affected:lint --all
npm run test:once
npm run coverage

start_tunnel
wait_for_tunnel

npm run integration

teardown_tunnel

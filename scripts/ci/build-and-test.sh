#!/bin/bash

set -e

echo ""
echo "Building sources and running tests"
echo ""

# Go to project dir
cd $(dirname $0)/../..

# Include sources.
source ./scripts/ci/sources/tunnel.sh

start_tunnel
wait_for_tunnel

npm run lint
npm run test:once
npm run integration

teardown_tunnel
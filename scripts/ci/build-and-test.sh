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
yarn affected:test --all

start_tunnel
wait_for_tunnel

yarn e2e

teardown_tunnel

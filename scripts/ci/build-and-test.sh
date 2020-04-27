#!/bin/bash

set -e

echo ""
echo "Building sources and running tests"
echo ""
export TUNNEL_IDENTIFIER="ngx-mime-${CIRCLE_BUILD_NUM}"
export TUNNEL_DIR="/tmp/ngx-mime-saucelabs"

# Cleanup and create the folder structure for the tunnel connector.
rm -rf ${TUNNEL_DIR}
mkdir -p ${TUNNEL_DIR}

# Go to project dir
cd $(dirname $0)/../..

# Include sources.
source ./scripts/ci/sources/tunnel.sh

yarn build:libs

yarn affected:lint --all
yarn affected:test --all

start_tunnel &
wait_for_tunnel

yarn e2e:ci

teardown_tunnel

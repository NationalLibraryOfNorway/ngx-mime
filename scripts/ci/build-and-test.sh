#!/bin/bash

set -e

echo ""
echo "Building sources, linting and running tests"
echo ""
export TUNNEL_IDENTIFIER="ngx-mime-${CIRCLE_BUILD_NUM}"


# Include sources.
source ./scripts/ci/sources/tunnel.sh

function finish {
    echo "teardown"
    teardown_tunnel
}

rm -rf dist

yarn format:check
yarn affected --base=$NX_BASE --head=$NX_HEAD -t lint,test --parallel=4

yarn build
yarn build:libs
yarn build:elements


trap finish EXIT
start_tunnel &
wait_for_tunnel

yarn e2e:ci

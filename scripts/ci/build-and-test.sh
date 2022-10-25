#!/bin/bash

set -e

echo ""
echo "Building sources and running tests"
echo ""
export TUNNEL_IDENTIFIER="ngx-mime-${CIRCLE_BUILD_NUM}"


# Include sources.
source ./scripts/ci/sources/tunnel.sh

function finish {
    echo "teardown"
    teardown_tunnel
}

yarn affected:lint
yarn affected:test

trap finish EXIT
start_tunnel &
wait_for_tunnel

yarn e2e:ci

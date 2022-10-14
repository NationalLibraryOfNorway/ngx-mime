#!/bin/bash

set -e

echo ""
echo "Building sources and running tests"
echo ""
export TUNNEL_IDENTIFIER="ngx-mime-${CIRCLE_BUILD_NUM}"
export PROXY_HOST="158.39.103.138"
export PROXY_PORT="3128"
export NO_PROXY=localhost,127.0.0.1,localhost.nb.no


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

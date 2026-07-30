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

npx nx format:check
npx nx affected --base="$NX_BASE" --head="$NX_HEAD" -t lint,test,build --parallel=2

trap finish EXIT
start_tunnel &
wait_for_tunnel

npx nx affected --base="$NX_BASE" --head="$NX_HEAD" -t e2e --configuration=ci

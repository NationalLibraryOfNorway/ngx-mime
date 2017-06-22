#!/usr/bin/env bash

start_tunnel() {
  ./tools/scripts/saucelabs/start-tunnel.sh
}

wait_for_tunnel() {
  ./tools/scripts/saucelabs/wait-tunnel.sh
  sleep 10
}

teardown_tunnel() {
  ./tools/scripts/saucelabs/stop-tunnel.sh
}
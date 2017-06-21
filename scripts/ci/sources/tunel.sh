#!/usr/bin/env bash

start_tunnel() {
  ./scripts/saucelabs/start-tunnel.sh
}

wait_for_tunnel() {
  ./scripts/saucelabs/wait-tunnel.sh
  sleep 10
}

teardown_tunnel() {
  ./scripts/saucelabs/stop-tunnel.sh
}
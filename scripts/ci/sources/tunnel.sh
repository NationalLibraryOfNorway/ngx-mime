#!/usr/bin/env bash

start_tunnel() {
  ./scripts/lambdatest/start-tunnel.sh
}

wait_for_tunnel() {
  ./scripts/lambdatest/wait-tunnel.sh
  sleep 10
}

teardown_tunnel() {
  ./scripts/lambdatest/stop-tunnel.sh
}

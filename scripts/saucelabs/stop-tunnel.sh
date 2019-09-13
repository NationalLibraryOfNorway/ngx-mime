#!/bin/bash

set -e -o pipefail

tunnelPidFile="${TUNNEL_DIR}/pidfile"

if [[ ! -f ${tunnelPidFile} ]]; then
  echo "Could not find Saucelabs tunnel PID file. Cannot stop tunnel.."
  exit 1
fi

echo "Shutting down Sauce Connect tunnel"

# The process id for the sauce-connect instance is stored inside of the pidfile.
tunnelProcessId=$(cat ${tunnelPidFile})

# Kill the process by using the PID that has been read from the pidfile.
kill ${tunnelProcessId}

echo ""
echo "Sauce Connect tunnel interrupt signal has been sent."

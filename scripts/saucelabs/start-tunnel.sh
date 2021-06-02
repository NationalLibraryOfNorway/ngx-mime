#!/bin/bash

set -e -o pipefail

tunnelFileName="sc-4.6.5-linux.tar.gz"
tunnelUrl="https://saucelabs.com/downloads/${tunnelFileName}"

tunnelReadyFile="${TUNNEL_DIR}/readyfile"
tunnelPidFile="${TUNNEL_DIR}/pidfile"

# Go into the temporary tunnel directory.
cd ${TUNNEL_DIR}

# Download the saucelabs connect binaries.
curl ${tunnelUrl} -o ${tunnelFileName} 2> /dev/null 1> /dev/null

# Extract the saucelabs connect binaries from the tarball.
mkdir -p sauce-connect
tar --extract --file=${tunnelFileName} --strip-components=1 --directory=sauce-connect > /dev/null

# Cleanup the download directory.
rm ${tunnelFileName}

# Command arguments that will be passed to sauce-connect.
sauceArgs="--readyfile ${tunnelReadyFile} --pidfile ${tunnelPidFile}"

sauceArgs="${sauceArgs} --tunnel-identifier ${TUNNEL_IDENTIFIER}"


echo "Starting Sauce Connect in the background. Passed arguments: ${sauceArgs}"
sauce-connect/bin/sc -u ${SAUCE_USERNAME} -k ${SAUCE_ACCESS_KEY} ${sauceArgs}

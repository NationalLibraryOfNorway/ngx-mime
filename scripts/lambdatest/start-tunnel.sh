#!/bin/bash

set -e -o pipefail
TUNNEL_DIR="/tmp/ngx-mime-lambdatest"
tunnelFileName="LT_Linux.zip"
PROXY_HOST="158.39.103.138"
PROXY_PORT="3128"

tunnelUrl="https://downloads.lambdatest.com/tunnel/v3/linux/64bit/${tunnelFileName}"

# Cleanup and create the folder structure for the tunnel connector.
rm -rf ${TUNNEL_DIR}
mkdir -p ${TUNNEL_DIR}

# Go into the temporary tunnel directory.
cd ${TUNNEL_DIR}

# Download the LT binaries.
curl ${tunnelUrl} -o ${tunnelFileName} 2> /dev/null 1> /dev/null

# Extract the LT binaries from the tarball.
unzip -o ${tunnelFileName} -d bin > /dev/null

# Cleanup the download directory.
rm ${tunnelFileName}

# Command arguments that will be passed to lambdatest cli.
ltArgs="${ltArgs} --tunnelName ${TUNNEL_IDENTIFIER} --user ${LT_USERNAME} --key ${LT_ACCESS_KEY} --proxy-host $PROXY_HOST --proxy-port $PROXY_PORT --infoAPIPort 15000 --allowHosts localhost"

echo "Starting LT in the background. Passed arguments: ${ltArgs}"
${TUNNEL_DIR}/bin/LT ${ltArgs}

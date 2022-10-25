#!/bin/bash

STATUS=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:15000/api/v1.0/info)
if [ $STATUS -eq 200 ]; then
    echo "Shutting down LT tunnel"

    # Kill the process by using the PID that has been read from the pidfile.
    curl -s -o /dev/null -X DELETE http://127.0.0.1:15000/api/v1.0/stop

    echo "LT tunnel interrupt signal has been sent."
else
    echo "Could not find LT tunnel. Cannot stop tunnel.."
    exit 1
fi

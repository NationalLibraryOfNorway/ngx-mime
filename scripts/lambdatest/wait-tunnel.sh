#!/bin/bash

# Wait for LD to be ready before exiting
# Time out if we wait for more than 2 minutes, so the process won't run forever.
counter=1
while [ $counter -le 120 ]
do
    response=$(curl -s -w "\n%{http_code}" http://127.0.0.1:15000/api/v1.0/info)
    response=(${response[@]}) # convert to array
    body=${response[@]::${#response[@]}-1} # get all elements except last
    if [[ "$body" == *"\"status\":\"SUCCESS\""* ]]; then
        echo "Connected to LT"
        exit 0
    fi

    # Counter needs to be multiplied by two because the while loop only sleeps a half second.
    # This has been made in favor of better progress logging (printing dots every half second)

    printf "."
    sleep 1
    counter=$(( $counter + 1 ))
done

echo "Timed out after 2 minutes waiting for LT"
exit 5

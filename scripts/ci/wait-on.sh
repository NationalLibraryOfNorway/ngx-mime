#!/usr/bin/env bash
#!/bin/bash

while true
do
  STATUS=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080)
  if [ $STATUS -eq 200 ]; then
    echo "Got 200! All done!"
    break
  else
    echo "Got $STATUS :( Not done yet..."
  fi
  sleep 10
done

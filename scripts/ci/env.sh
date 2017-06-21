#!/bin/bash

if [[ -z "${TRAVIS}" ]]; then
  echo "This script can only setup the environment inside of Travis builds"
  exit 0
fi

export SAUCE_USERNAME=ronnymikalsen
export SAUCE_ACCESS_KEY=fa5b212d-466a-4e29-b593-957164bfc10b
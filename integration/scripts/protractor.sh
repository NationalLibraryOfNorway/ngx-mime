#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --browser)
    BROWSER="$2"
    shift # past argument
    shift # past value
    ;;
    --tags)
    TAGS="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

npm run wait && protractor --browser=${BROWSER} --tags=${TAGS} > .tmp/${BROWSER}_result.txt

if [ $? -eq 0 ]
then
  cat .tmp/${BROWSER}_result.txt
  exit 0
else
  cat .tmp/${BROWSER}_result.txt
  exit 1
fi

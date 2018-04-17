#!/bin/bash

npm run wait && protractor --browser=chrome --tags=@desktop --headless ./e2e/protractor.conf.js > .tmp/chrome_result.txt

if [ $? -eq 0 ]
then
  cat .tmp/chrome_result.txt
  exit 0
else
  cat .tmp/chrome_result.txt
  exit 1
fi

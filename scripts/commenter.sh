#!/bin/bash

PUBLISH_TEXT="Published to https://exp.host/@workpasssg/sg-workpass?release-channel=${TRAVIS_PULL_REQUEST}"
QR_CODE="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=exp://exp.host/@workpasssg/sg-workpass?release-channel=${TRAVIS_PULL_REQUEST}"

curl -X POST \
  https://${GITHUB_ACCESS_TOKEN_COMMENTER}@api.github.com/repos/sgworkpass/mobile/issues/${TRAVIS_PULL_REQUEST}/comments \
  -H 'Content-Type: application/json' \
  -d '{ "body": "![Expo QR]('"$QR_CODE"')\n'"$PUBLISH_TEXT"'" }'

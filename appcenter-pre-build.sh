#!/usr/bin/env bash

npx jetify
rm -rf android/.gradle/*

#Copy s3 env files
aws s3 cp s3://$ENVIRONMENT_BUCKET/mobile-app/.env $APPCENTER_SOURCE_DIRECTORY/
aws s3 cp s3://$ENVIRONMENT_BUCKET/mobile-app/bureau.keystore $APPCENTER_SOURCE_DIRECTORY/android/app/
aws s3 cp s3://$ENVIRONMENT_BUCKET/mobile-app/gradle.properties $APPCENTER_SOURCE_DIRECTORY/android/
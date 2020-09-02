#!/usr/bin/env bash

#Copy s3 env files
aws s3 cp s3://$ENVIRONMENT_BUCKET/mobile-app/.env $APPCENTER_SOURCE_DIRECTORY/
#!/bin/bash

BASEDIR=$(dirname "$0")
SETTINGS=$BASEDIR/marcdown_project/marcdown_project/settings.py

# Set static files location
# Depends on your server's file system structure and policy
echo "STATIC_ROOT = '/var/www/app/public/static'" >> $SETTINGS

# Disable debug setting
sed -i "s/DEBUG = True/DEBUG = False/" $SETTINGS
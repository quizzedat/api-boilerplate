#!/bin/bash

# any future command that fails will exit the script
set -e

npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

cd /home/ubuntu/api
git reset --hard

git pull

#install npm packages
echo "Running npm install"
yarn install

# Restart the node server
pm2 reload pm2.json --update-env

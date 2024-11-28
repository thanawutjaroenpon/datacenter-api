#!/usr/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use 18

npm install

# npm run migration:run
rm -rf dist

npm run build

pm2 restart upos-api

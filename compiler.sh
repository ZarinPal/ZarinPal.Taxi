#!/usr/bin/env bash

npm install -g gulp
npm install
git config --global user.email "ZarinPal@Travis"
git config --global user.name "ZarinPal@Travis"
git config --global push.default simple
eval "$(ssh-agent -s)"
chmod 600 .deploy_key
ssh-add .deploy_key
git clone -b gh-pages git@github.com:ZarinPal/ZarinPal.taxi.git public
npm start production
cp -a assets/. public/assets/
cp index.html public/index.html
cd public
git add --all .
git commit -m "new release"
git push origin HEAD:gh-pages

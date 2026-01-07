#!/usr/bin/env sh

# This script updates pinned version from sub dependencies to avoid peer
# issues when resolving types and other tools between these dependencies.

# TypeScript

ts_version=$(cat ./node_modules/@angular/build/package.json | yq -r '.peerDependencies.typescript')

echo -e "\n\e[44;30m INFO \e[0m Updating TypeScript version to: \e[33m$ts_version\e[0m\n"

pnpm update -r "typescript@$ts_version"

# RxJS

rx_version=$(cat ./node_modules/@angular/common/package.json | yq -r '.peerDependencies.rxjs')

echo -e "\n\e[44;30m INFO \e[0m Updating RxJS version to: \e[33m$rx_version\e[0m\n"

pnpm update -r "rxjs@$rx_version"

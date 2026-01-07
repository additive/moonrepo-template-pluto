#!/usr/bin/env sh

pnpm ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION
pnpm ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION

# Other libs
pnpm ng update --allow-dirty \
	@fortawesome/angular-fontawesome@latest \
	angular-router-menus@latest

set shell := ["zsh", "-o", "nullglob", "-uc"]
export PATH := "./node_modules/.bin:" + env_var('PATH')

_default:
	@just --list --unsorted --list-heading ''

## ---------------------------------------------------------------------------------------------
## Dev

# Start the Pluto dev server
[group('dev')]
dev:
	@moon run pluto:dev

# Run all tests
[group('dev')]
test:
	@moon run :test

## ---------------------------------------------------------------------------------------------
## Setup

# First-time setup
[group('setup')]
setup:
	proto use
	sfw pnpm install

# Reconcile dependencies after editing a moon.yml
[group('setup')]
sync: clean
	moon sync
	sfw pnpm install
	@just reorder-objects

# Sort tsconfig paths, package dependencies and moon dependsOn
[group('setup')]
reorder-objects:
	@sh scripts/reorder-objects.sh

## ---------------------------------------------------------------------------------------------
## Quality

# Lint and check all files
[group('quality')]
lint:
	oxlint --type-aware --type-check
	oxfmt --check
	moon run :lint

# Format all files
[group('quality')]
format:
	oxlint --type-aware --fix
	oxfmt

# Lint and check the staged files, run by the pre-commit hook
[group('quality')]
lint-staged:
	git diff --cached --name-only --diff-filter=ACMR -z | xargs -0 -r oxlint --type-aware --type-check --no-error-on-unmatched-pattern
	git diff --cached --name-only --diff-filter=ACMR -z | xargs -0 -r oxfmt --check --no-error-on-unmatched-pattern

## ---------------------------------------------------------------------------------------------
## Maintenance

# Clean caches and build output
[group('maintenance')]
clean:
	@moon clean
	del-cli -v '.moon/cache/' '**/.angular/' '**/dist/' '**/node_modules/.cache/'

# Upgrade dependencies within their ranges. Angular goes through `ng update` by hand.
[group('maintenance')]
upgrade:
	sfw pnpm update -r
	proto outdated --update --yes
	proto install
	@pnpm outdated -r || true
	@pnpm audit || true

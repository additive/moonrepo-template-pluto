set shell := ["zsh", "-o", "nullglob", "-uc"]
export PATH := "./node_modules/.bin:" + env_var('PATH')

# Start Pluto development server
dev:
	@moon pluto:dev

# Clean cache and stores
clean:
	@moon clean
	@echo -e "\e[44;30m INFO \e[0m Cleaning more \n"
	del-cli -v '.moon/cache/'
	del-cli -v '**/.angular/'
	del-cli -v '**/.dist/'
	del-cli -v '**/node_modules/.cache/'
	del-cli -v '**/.*cache'

# Format all files
format:
	biome check --write --unsafe scripts templates *.{js,mjs,ts}
	prettier --write {.,scripts,templates}/*.{yml,yaml,json,md}
	moon :format

# Lint and check all files
lint:
	biome check scripts templates *.{js,mjs,ts}
	prettier --check {.,scripts,templates}/*.{yml,yaml,json,md}
	moon :lint

# Run all tests
test:
	@moon :test

# Sync project dependencies
sync:
	moon sync
	pnpm install
	@just reorder-objects

# Re-order paths
reorder-objects:
	@sh scripts/reorder-objects.sh
	moon :format --affected

# Pin versions for Angular to have better compatibility
export ANGULAR_VERSION := "^21.0.1"

# Upgrade deps safely
upgrade:
	@zsh scripts/task-deps-workspace.zsh
	@echo -e "\n\e[44;30m INFO \e[0m Running regular update \n"
	@pnpm update -r
	@zsh scripts/upgrade-pinned.zsh
	@just clean
	@echo -e "\n\e[44;30m INFO \e[0m Updating Playwright browsers \n"
	@playwright install
	@echo -e "\n\e[44;30m INFO \e[0m Further upgrade manual please \n"
	@proto outdated --update --yes
	@proto install
	@pnpm outdated -r || echo
	@pnpm audit || echo

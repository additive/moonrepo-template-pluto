#!/usr/bin/env sh

# Simple scripts that goes through all config and package files
# and reorder certain sub paths of the object using yq in parallel.

# TS Configs
echo "TS Configs"

tsconfig_files=$(
	find . -type d \( -path "*/node_modules" -o -path "*/dist" -o -path "*/tmp" -o -path '*/.*' \) -prune \
		-o -not -name '.*' \
		-type f -name "tsconfig*.json" \
		-print
)

for tsconfig_file in $tsconfig_files; do
	echo "Reordering paths in $tsconfig_file"

	(
		yq -i '
( select(.compilerOptions | has("paths")) | .compilerOptions.paths) |= sort_keys(.) |
( select(has("references")) | .references) |= sort_by(.path)
		' "$tsconfig_file"
	) &
done

wait

echo "$tsconfig_files" | xargs oxfmt

# NPM Packages
echo "NPM Packages"

package_files=$(
	find . -type d \( -path "*/node_modules" -o -path "*/dist" -o -path "*/tmp" -o -path '*/.*' \) -prune \
		-o -not -name '.*' \
		-type f -name "package.json" \
		-print
)

for package_file in $package_files; do
	echo "Reordering paths in $package_file"

	(
		yq -i '
( select(has("dependencies")) | .dependencies ) |= sort_keys(.) |
( select(has("devDependencies")) | .devDependencies ) |= sort_keys(.) |
( select(has("peerDependencies")) | .peerDependencies ) |= sort_keys(.) |
( select(has("optionalDependencies")) | .optionalDependencies ) |= sort_keys(.)
		' "$package_file"
	) &
done

wait

echo "$package_files" | xargs oxfmt

# Moon Configs
echo "Moon Configs"

moon_files=$(
	find . -type d \( -path "*/node_modules" -o -path "*/dist" -o -path "*/tmp" -o -path '*/.*' \) -prune \
		-o -not -name '.*' \
		-type f -name "moon.yml" \
		-print
)

for moon_file in $moon_files; do
	echo "Reordering paths in $moon_file"

	(
		yq -i '( select(has("dependsOn")) | .dependsOn ) |= sort' "$moon_file"
	) &
done

wait

echo "$moon_files" | xargs oxfmt

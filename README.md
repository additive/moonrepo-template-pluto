<br>
<h1 align="center">
  <img src="assets/pluto.png" alt="Pluto" width="200" />
  <br>
</h1>
<br>

# Moonrepo template **_Pluto_**

This moonrepo template is a copy of our companies enterprise application project to provide a solid base for others. It mainly has the possibility to create multiple applications that share the same core structure and configuration. We have done it this way to provide customized applications for our customers.

Please note, that we have not cleaned everything to the moon and that some parts might be missing. Due to our policies we cannot share everything but provide a good base hopefully.

The reason for the `angular.json` to sit in the root of the monorepo is because otherwise workspace installed Angular dependencies would not be updateable by `ng` update command. Other apps can just have their `angular.json` as usual in the apps folder.

Read more about our custom solutions here: https://www.additive-net.de/de/solutions

## Features

- moonrepo
- moonrepo templates
- prototools
- prettier
- eslint
- stylelint
- biome
- pnpm
- node
- justfile
- editorconfig
- vscode settings
- zed settings
- very strict tsconfig settings
- easy project upgrades
- AI agent setup and instructions

## Libs

- app-assets: Angular assets to share
- app-build: Angular build related
- app-config: Angular config related
- app-environment: Angular shared environment
- app-http: Application http client and configuration
- app-layout: Main application layout components
- app-theme: Application shared theme
- feature-not-found: Application not-found page
- feature-example: Example feature to showcase how they might be added to your application
- moon-project: Custom plugin to get access to `moon.yml` configuration inside the application and other build steps or in scripts
- plugin-eslint: Base configuration for eslint setup, super useful to not have redundant configuration like NX does it
- types: Global TypeScript types and resets for any lib and app

## AI

We are using a local LLM model for our project together with `opencode`. Claude is just used here so I can easily port our parts into this project together with tailwind. This way we also benefit from improvements from Claude here ^^.

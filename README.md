[![Tests](https://github.com/OMICRONEnergyOSS/oscd-background-wizard-events/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-background-wizard-events/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-background-wizard-events)

# \<oscd-background-wizard-events>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## What is this?

This is an OpenSCD backgroun plugin for [OpenSCD](https://openscd.org) which provides backwards compatability for other plugins which are reliant on the wizard events:
* oscd-create-wizard-request
* oscd-edit-wizard-request
* oscd-close-wizard

If your distro uses plugins which fire these events, you need to include this background plugin to intercept these events and open up the appropriate wizard dialog.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

> This demo plugin does nothing much that could be tested as it relies exclusively on built-in browser components to do its job. We therefore currently have no tests. If you find something that could be tested, please feel free!

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)

# masonrygrid

A flexible masonry grid for **React, Vue, and Angular**.

Build responsive masonry layouts with framework-specific packages, powered by a shared layout engine.

## Installation

Install the package for your framework:

| Framework | Package                                    |
| --------- | ------------------------------------------ |
| React     | [`@masonrygrid/react`](packages/react)     |
| Vue       | [`@masonrygrid/vue`](packages/vue)         |
| Angular   | [`@masonrygrid/angular`](packages/angular) |

Each framework package includes everything needed to use MasonryGrid. **No additional `@masonrygrid/core` dependency is required.**

### React

```bash
npm install @masonrygrid/react
```

See the [React package](packages/react) for usage and props.

### Vue

```bash
npm install @masonrygrid/vue
```

See the [Vue package](packages/vue) for usage and props.

### Angular

```bash
npm install @masonrygrid/angular
```

See the [Angular package](packages/angular) for usage and props.

## How it works

MasonryGrid uses a shared, framework-agnostic layout engine internally, with lightweight packages for each supported framework.

The core package is an internal workspace dependency and does not need to be installed separately.

## Development

This repository is an npm workspaces monorepo.

```bash
npm install
npm run build
```

The workspaces are built in dependency order, with `core` built before the framework packages that depend on it.

### Releasing

Versions are managed with [Changesets](https://github.com/changesets/changesets). All `@masonrygrid/*` packages are versioned together.

```bash
npm run changeset
npm run version-packages
npm run release
```

## License

MIT

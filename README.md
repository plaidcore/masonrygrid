# masonrygrid

A masonry grid for every framework. A shared core handles the layout, and each framework package is a thin wrapper around it.

| Package | Description |
| --- | --- |
| [`@masonrygrid/react`](packages/react) | Masonry grid component for React. |
| [`@masonrygrid/core`](packages/core) | Framework-agnostic layout engine, installed automatically by the framework packages. |

More frameworks and a web component are planned.

## Using it

```bash
npm install @masonrygrid/react
```

See the [React package](packages/react) for usage and props.

## Development

This is an npm workspaces monorepo.

```bash
npm install
npm run build
```

The workspaces are built in the order they are listed in the root `package.json`, so `core` goes before the packages that depend on it.

### Releasing

Versions are managed with [changesets](https://github.com/changesets/changesets). All `@masonrygrid/*` packages are versioned together.

```bash
npm run changeset
npm run version-packages
npm run release
```

## License

ISC

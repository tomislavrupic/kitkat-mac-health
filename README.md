# KITKAT Mac Health Landing Page

A responsive PIX-7 product page for KITKAT Mac Health 0.7.0, including the
native screen-and-system-audio recorder, live Codex/system usage, reviewed
Sirius connection proposals, local memory workspaces, and optional encrypted
local-first sync between Macs. The current app icon and social-preview
image are included under `public/`; versioned installers and checksums are
published as GitHub Release assets.

## Run locally

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
npm run audit:security
npm run lint
npm run typecheck
```

## GitHub Pages

The repository includes an Actions workflow that audits dependencies, runs the
maintained Biome linter, tests the static export and deploys it whenever `main`
is updated. The public URL is:

<https://tomislavrupic.github.io/kitkat-mac-health/>

In the repository settings, Pages must use **GitHub Actions** as its source.

## Portable folder

After building the Pages version, generate a dependency-free handoff folder:

```sh
npm run build:pages
npm run export:portable
```

The output is written beside this repository as `KITKAT-Landing-Page-Portable`.
It contains only static HTML, CSS, artwork, the DMG, and its checksum. All paths
are relative, so the complete folder can be moved into another website project.

## Add to another site

- The page structure is in `app/page.tsx`.
- The complete visual system is in `app/globals.css`.
- Product media is under `public/`.
- Release download URLs and the displayed version are defined together at the
  top of `app/page.tsx`.
- Portable export assets are read from `../dist/release/` and copied into the
  standalone folder so the handoff remains self-contained.

The page uses no database, authentication, analytics, or remote runtime data.
Development and production now both use Next.js. The retired Cloudflare/Vinext
and database starter files remain in `examples/legacy-cloudflare/` as inactive
references, with no runtime dependencies installed for them. See
[dependency security notes](SECURITY-DEPENDENCIES.md) for audit results and the
maintained lint-toolchain migration. Biome is lint-only: it does not format or
rewrite source, and does not start a background server. TypeScript independently
checks types through `npm run typecheck` and the production build.

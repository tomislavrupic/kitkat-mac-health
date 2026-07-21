# KITKAT Mac Health Landing Page

A responsive PIX-7 product page for KITKAT Mac Health. The current app icon and
social-preview image are included under `public/`; versioned installers and
checksums are published as GitHub Release assets.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm test
```

## GitHub Pages

The repository includes an Actions workflow that builds and deploys the static
site whenever `main` is updated. The public URL is:

<https://tomislavrupic.github.io/kitkat-mac-health/>

In the repository settings, Pages must use **GitHub Actions** as its source.

## Portable folder

After building the Pages version, generate a dependency-free handoff folder:

```sh
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

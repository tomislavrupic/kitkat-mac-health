# KITKAT Mac Health Landing Page

A responsive PIX-7 product page for KITKAT Mac Health. The current app icon,
versioned DMG, checksum, and social-preview image are included under `public/`.

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
- Product and download files are under `public/`.
- Keep the `/downloads/KITKAT-Mac-Health-0.1.0.dmg` path or update both download
  links when publishing a newer app version.

The page uses no database, authentication, analytics, or remote runtime data.

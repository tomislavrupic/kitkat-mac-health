# Website dependency security

## Remediation on 2026-10-15

The initial full `npm audit` reported 32 vulnerable dependency entries: one
critical, 24 high, six moderate and one low. Compatible upgrades reduced this to
15, but some remaining dependency chains had no fully patched release.

With the owner's approval, the landing page now uses Next.js directly for both
development and the existing GitHub Pages static export:

- Next.js 16.4.1 and React/React DOM 19.3.1 replace the affected pinned versions.
- Unused Vinext, Vite, Cloudflare/Wrangler and Drizzle dependencies were removed.
  Their original starter files are preserved as inactive examples, not executed
  or installed. No application feature used these database/Worker paths.
- The Next-specific ESLint preset was replaced with recommended JavaScript,
  TypeScript, React, hooks and JSX accessibility rules. This removes its
  unpatched `fast-glob`/`micromatch`/`braces` chain without suppressing advisories.
- The lockfile was refreshed and a clean `npm ci` reproduced the installation.
  No forced downgrades, advisory ignores, overrides or install-script patches
  are used to obtain a clean audit.
- `npm run audit:security` checks all dependencies, including development
  dependencies, and fails at low severity or higher. GitHub Pages deployment
  runs this gate before building/testing the static export.

The final full npm audit reports zero known vulnerabilities. This is a dated
dependency-advisory result, not a guarantee that the site or dependencies have
no undiscovered security defects. Re-run the audit before future publication.

## Verification

- Static-export tests cover product content, current release links, exported
  media/stylesheets, navigation targets and exact signed-feed preservation.
- The visual design, stylesheet, media, release assets and signed updater feed
  are unchanged by this remediation. The native installed app is unchanged.
- Reproduction: `npm ci`, `npm run audit:security`, `npm test`, `npm run lint`.

## Supported lint toolchain

The initial remediation temporarily retained deprecated ESLint 9.39.5 because
the React and JSX accessibility plugins did not declare ESLint 10 compatibility.
That follow-up is now resolved: Biome 2.5.15 replaces ESLint and its entire
plugin/config dependency chain, without forcing incompatible peer versions.

Biome runs recommended JavaScript/TypeScript/React/accessibility checks with
explicit error-level rules for unused/undeclared variables, explicit `any`,
React list keys, hook placement, effect dependencies and image alternative text.
Tests invoke the actual configured CLI against temporary source fixtures, prove
each error is rejected by its intended rule, accept valid typed React code, and
verify that lint does not rewrite input. A lockfile check prevents ESLint 9
from returning. TypeScript checking remains independent; this is not a claim
that Biome implements every historical ESLint rule identically.

Formatting and import rewriting are disabled. Static artwork and retired
examples remain outside source-lint scope, as before. `noImgElement` is disabled
deliberately: this is a portable static site with ordinary local images, not an
image-optimization server. Image alternative-text validation remains enforced.
No linter daemon, watcher, Git hook or automatic maintenance task was added.

The migration also fixes two labelled generic containers by making them named
semantic sections and assigns stable IDs to the fixed decorative waveform.
These preserve the visual layout, bar count and heights. CSS, media, native app
release assets and the signed updater feed are unchanged.

Reproduction: `npm ci`, `npm run audit:security`, `npm run lint`, `npm test`,
`npm run typecheck`. A clean install no longer emits the ESLint deprecation.

Reference: [Biome migration and rule compatibility](https://biomejs.dev/installation/migrate-eslint-prettier/).

## Advisory references

- [Next.js ImageResponse advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)
- [React server-component advisory](https://github.com/advisories/GHSA-wx67-qw84-cm4g)
- [Unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

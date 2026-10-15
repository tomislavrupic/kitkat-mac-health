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
- The existing app page, stylesheet, media, release assets and signed updater
  feed are unchanged by this remediation. The native installed app is unchanged.
- Reproduction: `npm ci`, `npm run audit:security`, `npm test`, `npm run lint`.

## Lint compatibility boundary

ESLint 9.39.5 is the final compatible 9.x release used here. npm marks this line
as unsupported; the current React and JSX accessibility plugins do not declare
ESLint 10 compatibility. It is development-only and has no reported advisory
in this audit, but migration to a supported lint stack remains a maintenance
follow-up. It does not run in the deployed static website. Do not bypass plugin
peer requirements with `--force` to conceal this compatibility boundary.

## Advisory references

- [Next.js ImageResponse advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)
- [React server-component advisory](https://github.com/advisories/GHSA-wx67-qw84-cm4g)
- [Unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

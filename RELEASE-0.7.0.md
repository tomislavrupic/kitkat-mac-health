# KITKAT Mac Health 0.7.0

- Native PIX-7 storage explorer with interactive rings, largest-first browsing,
  folder navigation, Finder reveal and a half-free capacity target.
- Explicit, cancellable metadata scans with bounded memory and incomplete
  coverage warnings. No background disk indexing or automatic deletion.
- Sirius proposal imports and cloud vault synchronization are user-driven,
  without periodic polling or session-restoration sync.
- Includes account recovery, capture and local document-conversion reliability
  improvements from the source repository.

macOS 15 or later, Apple silicon. Build 13.

## Website verification and follow-up

The rendered-page tests and GitHub Pages static-export build passed locally.
The public page no longer presents earlier-version CPU, memory or test-count
measurements as current release benchmarks.

At initial publication, the website dependency lockfile reported 32 npm audit
advisories, including a critical Next.js advisory. The website was subsequently
updated on 2026-10-15: the approved Next.js-only toolchain reports zero known npm
vulnerabilities, with a deployment audit gate and static-export regression
checks. Native release assets and the signed feed were not changed. See
[dependency security notes](https://github.com/tomislavrupic/kitkat-mac-health/blob/main/SECURITY-DEPENDENCIES.md)
for verification. The development-only ESLint compatibility caveat was also
resolved on 2026-10-15 by replacing that stack with maintained Biome and adding
real lint-rule regression fixtures; native release assets remain unchanged.

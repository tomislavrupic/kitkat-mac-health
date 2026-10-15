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

The unchanged website dependency lockfile reports 32 npm audit advisories,
including a critical Next.js advisory. GitHub Pages deploys the static export,
not the Node server or development tools. Dependency remediation remains a
separate follow-up; this release does not claim those advisories are resolved.

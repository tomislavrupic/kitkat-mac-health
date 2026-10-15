# Inactive Cloudflare starter reference

These files preserve the former root-level starter layout. They are not part of
the active Next.js build, lint input or dependency tree. The landing page has no
database or Cloudflare Worker deployment; production is a GitHub Pages static
export. The sibling `../d1/` example is likewise inactive.

Do not run these snapshots as-is. To reintroduce Cloudflare/database support,
restore the relevant root paths from Git history and first select a maintained,
security-audited toolchain. The former dependencies intentionally are no longer
installed, including Vinext, Vite, Wrangler and Drizzle.

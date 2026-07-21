import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildRoot = join(projectRoot, "out");
const outputRoot = resolve(projectRoot, "..", "KITKAT-Landing-Page-Portable");
const version = "0.3.0";
const releaseRoot = `https://github.com/tomislavrupic/kitkat-mac-health/releases/download/v${version}`;
const releaseAssets = resolve(projectRoot, "..", "dist", "release");

const sourceHTML = readFileSync(join(buildRoot, "index.html"), "utf8");
const headMatch = sourceHTML.match(/<head>([\s\S]*?)<\/head>/);
const bodyMatch = sourceHTML.match(/<body>([\s\S]*?)<\/body>/);

if (!headMatch || !bodyMatch) {
  throw new Error("The static build did not contain a complete HTML document.");
}

const cleanFragment = (fragment) =>
  fragment
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\bas=["']script["'])[^>]*\/?>(?:<\/link>)?/gi, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "")
    .replace(/=(["'])\/kitkat-mac-health\//g, "=$1./");

const head = cleanFragment(headMatch[1])
  .replace(
    /<link rel="stylesheet"[^>]*>/,
    '<link rel="stylesheet" href="./styles.css"/>',
  )
  .replace(
    /<meta property="og:url"[^>]*>/,
    '<meta property="og:url" content="./"/>',
  )
  .replace(
    /<meta (property="og:image"|name="twitter:image")[^>]*>/g,
    '<meta $1 content="./og.png"/>',
  );

const body = cleanFragment(bodyMatch[1])
  .replace(/<div hidden="">\s*<\/div>/, "")
  .replaceAll(
    `${releaseRoot}/KITKAT-Mac-Health-${version}.dmg.sha256`,
    `./downloads/KITKAT-Mac-Health-${version}.dmg.sha256`,
  )
  .replaceAll(
    `${releaseRoot}/KITKAT-Mac-Health-${version}.dmg`,
    `./downloads/KITKAT-Mac-Health-${version}.dmg`,
  );

const portableHTML = `<!DOCTYPE html>
<html lang="en">
<head>${head}</head>
<body>${body}</body>
</html>
`;

const cssFiles = readdirSync(join(buildRoot, "_next", "static", "chunks"))
  .filter((file) => file.endsWith(".css"));

if (cssFiles.length !== 1) {
  throw new Error(`Expected one compiled stylesheet, found ${cssFiles.length}.`);
}

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(join(outputRoot, "media"), { recursive: true });
mkdirSync(join(outputRoot, "downloads"), { recursive: true });

writeFileSync(join(outputRoot, "index.html"), portableHTML);
copyFileSync(
  join(buildRoot, "_next", "static", "chunks", cssFiles[0]),
  join(outputRoot, "styles.css"),
);
copyFileSync(join(buildRoot, "media", "kitkat-icon.png"), join(outputRoot, "media", "kitkat-icon.png"));
copyFileSync(
  join(buildRoot, "media", "kitkat-character.jpg"),
  join(outputRoot, "media", "kitkat-character.jpg"),
);
copyFileSync(join(buildRoot, "og.png"), join(outputRoot, "og.png"));
copyFileSync(
  join(releaseAssets, `KITKAT-Mac-Health-${version}.dmg`),
  join(outputRoot, "downloads", `KITKAT-Mac-Health-${version}.dmg`),
);
copyFileSync(
  join(releaseAssets, `KITKAT-Mac-Health-${version}.dmg.sha256`),
  join(outputRoot, "downloads", `KITKAT-Mac-Health-${version}.dmg.sha256`),
);

writeFileSync(join(outputRoot, ".nojekyll"), "");
writeFileSync(
  join(outputRoot, "README.txt"),
  `KITKAT MAC HEALTH / PORTABLE LANDING PAGE

This folder is a complete static website with no build step or dependencies.

To use it:
1. Move this entire folder into the destination website project.
2. Open index.html directly, or serve the folder from any static web host.
3. Keep media/ and downloads/ beside index.html so all relative links continue to work.

Files:
- index.html: complete page markup
- styles.css: complete PIX-7 visual system and animations
- media/: KITKAT app icon and character portrait
- downloads/: DMG installer and SHA-256 checksum
- og.png: social sharing image

The source application and framework files are intentionally not included.
`,
);

console.log(outputRoot);

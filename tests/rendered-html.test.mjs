import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

test("statically exports the finished KITKAT product page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>KITKAT Mac Health — Your Mac\. Under Control\.<\/title>/i);
  assert.match(html, /YOUR MAC\./);
  assert.match(html, /UNDER CONTROL\./);
  assert.match(html, />CLEAN</i);
  assert.match(html, />WITHOUT</i);
  assert.match(html, />REGRET\.</i);
  assert.match(html, /releases\/download\/v0\.7\.0\/KITKAT-Mac-Health-0\.7\.0\.dmg/);
  assert.match(html, /Codex usage/i);
  assert.match(html, /Sirius/i);
  assert.match(html, /encrypted sync/i);
  assert.match(html, /GPU \/ ACTIVE/);
  assert.match(html, /THERMAL/);
  assert.match(html, /RECORD THE WORK\./);
  assert.match(html, /SYSTEM AUDIO ARMED/);
  assert.match(html, /MOVIES \/ KITKAT RECORDINGS/);
  assert.match(html, /STORAGE EXPLORER \/ ON DEMAND/);
  assert.match(html, /interactive radial map/);
  assert.match(html, /SIRIUS \+ VAULT SYNC/);
  assert.match(html, /MAX 24 CANDIDATES/);
  assert.match(html, /SERIOUS TOOLS\./);
  assert.match(html, /DEEPLY UNSERIOUS CAT\./);
  assert.match(html, /kitkat-core-surgery-v1\.jpg/);
  assert.match(html, /kitkat-beachball-rave-v1\.jpg/);
  assert.match(html, /kitkat-desktop-rodeo-v1\.jpg/);
  assert.match(html, /kitkat-character\.jpg/);
  assert.match(html, /CREW DOSSIER \/ LGG-KK7/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the release links, icon, character, and social card", async () => {
  const root = new URL("../out/", import.meta.url);
  const icon = new URL("media/kitkat-icon.png", root);
  const character = new URL("media/kitkat-character.jpg", root);
  const social = new URL("og.png", root);

  await Promise.all([access(icon), access(character), access(social)]);
  assert.ok((await stat(icon)).size > 10_000);

  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.match(packageJson, /kitkat-mac-health-landing/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("exports every local stylesheet, image and section linked by the page", async () => {
  const root = new URL("../out/", import.meta.url);
  const html = await readFile(new URL("index.html", root), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/kitkat-mac-health";
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  const localAssets = urls.filter((url) => url.startsWith("/") && !url.startsWith("//"));
  for (const url of localAssets) {
    assert.ok(url.startsWith(`${basePath}/`), `local asset preserves the deployment prefix: ${url}`);
  }
  assert.ok(localAssets.some((url) => url.endsWith(".css")), "export includes a stylesheet");
  assert.ok(localAssets.some((url) => url.endsWith(".jpg")), "export includes character images");
  for (const url of localAssets) {
    await access(new URL(url.slice(basePath.length + 1).split("?")[0], root));
  }
  for (const url of urls.filter((url) => url.startsWith("#"))) {
    assert.ok(html.includes(`id="${url.slice(1)}"`), `section target exists: ${url}`);
  }
});

test("preserves the signed updater feed byte-for-byte in the static export", async () => {
  const source = await readFile(new URL("../public/appcast.xml", import.meta.url));
  const exported = await readFile(new URL("../out/appcast.xml", import.meta.url));
  assert.deepEqual(exported, source);
  assert.match(source.toString(), /<sparkle:shortVersionString>0\.7\.0<\/sparkle:shortVersionString>/);
  assert.match(source.toString(), /sparkle-signatures:/);
});

test("exports named semantic preview regions", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  for (const label of ["KITKAT system health preview", "Bounded cross-project connection preview"]) {
    assert.match(html, new RegExp(`<section\\b[^>]*aria-label="${label}"`));
  }
});

test("preserves all 38 decorative waveform bars and their heights", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const waveform = html.match(/<div class="capture-wave" aria-hidden="true">([\s\S]*?)<\/div>/);
  assert.ok(waveform, "the decorative waveform is present");
  const heights = [...waveform[1].matchAll(/style="height:([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(heights, Array.from({ length: 38 }, (_, index) => `${18 + ((index * 17) % 68)}%`));
});

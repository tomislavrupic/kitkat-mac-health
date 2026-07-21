import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished KITKAT product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>KITKAT Mac Health — Your Mac\. Under Control\.<\/title>/i);
  assert.match(html, /YOUR MAC\./);
  assert.match(html, /UNDER CONTROL\./);
  assert.match(html, />CLEAN</i);
  assert.match(html, />WITHOUT</i);
  assert.match(html, />REGRET\.</i);
  assert.match(html, /KITKAT-Mac-Health-0\.1\.0\.dmg/);
  assert.match(html, /kitkat-character\.jpg/);
  assert.match(html, /CREW DOSSIER \/ LGG-KK7/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the real download, checksum, icon, and social card", async () => {
  const root = new URL("../public/", import.meta.url);
  const dmg = new URL("downloads/KITKAT-Mac-Health-0.1.0.dmg", root);
  const checksum = new URL("downloads/KITKAT-Mac-Health-0.1.0.dmg.sha256", root);
  const icon = new URL("media/kitkat-icon.png", root);
  const character = new URL("media/kitkat-character.jpg", root);
  const social = new URL("og.png", root);

  await Promise.all([access(dmg), access(checksum), access(icon), access(character), access(social)]);
  const dmgStats = await stat(dmg);
  assert.ok(dmgStats.size > 2_000_000);

  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.match(packageJson, /kitkat-mac-health-landing/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

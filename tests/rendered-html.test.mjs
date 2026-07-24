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
  assert.match(html, /releases\/download\/v0\.4\.0\/KITKAT-Mac-Health-0\.4\.0\.dmg/);
  assert.match(html, /GPU \/ ACTIVE/);
  assert.match(html, /THERMAL/);
  assert.match(html, /RECORD THE WORK\./);
  assert.match(html, /SYSTEM AUDIO ARMED/);
  assert.match(html, /MOVIES \/ KITKAT RECORDINGS/);
  assert.match(html, /24 \/ 24/);
  assert.match(html, /kitkat-character\.jpg/);
  assert.match(html, /CREW DOSSIER \/ LGG-KK7/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the release links, icon, character, and social card", async () => {
  const root = new URL("../public/", import.meta.url);
  const icon = new URL("media/kitkat-icon.png", root);
  const character = new URL("media/kitkat-character.jpg", root);
  const social = new URL("og.png", root);

  await Promise.all([access(icon), access(character), access(social)]);
  assert.ok((await stat(icon)).size > 10_000);

  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.match(packageJson, /kitkat-mac-health-landing/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const cli = fileURLToPath(new URL("../node_modules/@biomejs/biome/bin/biome", import.meta.url));

async function lint(source, extension = "tsx") {
  // Biome's stdin mode echoes source instead of emitting JSON diagnostics.
  const directory = await mkdtemp(join(root, "tests/.lint-fixture-"));
  try {
    const file = join(directory, `fixture.${extension}`);
    await writeFile(file, source);
    const result = spawnSync(process.execPath, [cli, "lint", "--error-on-warnings",
      "--reporter=json", file], { cwd: root, encoding: "utf8", timeout: 15_000 });
    assert.equal(result.error, undefined, "the real linter starts successfully");
    assert.equal(result.signal, null, "the real linter finishes within its deadline");
    assert.ok([0, 1].includes(result.status), result.stderr);
    assert.equal(await readFile(file, "utf8"), source, "lint never rewrites source");
    return { status: result.status, report: JSON.parse(result.stdout) };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("the dependency lockfile contains no unsupported ESLint 9 packages", async () => {
  const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
  const legacy = Object.entries(lock.packages).filter(([path, entry]) =>
    path.endsWith("/eslint") && /^9\./.test(entry.version),
  );
  assert.deepEqual(legacy, [], "retire ESLint 9 instead of suppressing its deprecation");
});

const invalidCases = [
  ["unused JavaScript variables", "js", "correctness/noUnusedVariables",
    "export function demo() { const unused = 1; return 2; }"],
  ["undeclared JavaScript variables", "js", "correctness/noUndeclaredVariables",
    "export const value = missingValue;"],
  ["explicit TypeScript any", "ts", "suspicious/noExplicitAny",
    "export function demo(value: any) { return value; }"],
  ["missing React list keys", "tsx", "correctness/useJsxKeyInIterable",
    "export function List({items}: {items: string[]}) { return <ul>{items.map(item => <li>{item}</li>)}</ul>; }"],
  ["React list index keys", "tsx", "suspicious/noArrayIndexKey",
    "export function List({items}: {items: string[]}) { return <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>; }"],
  ["conditional React hooks", "tsx", "correctness/useHookAtTopLevel",
    "import {useState} from 'react'; export function Demo({active}: {active: boolean}) { if (active) { useState(0); } return null; }"],
  ["missing React effect dependencies", "tsx", "correctness/useExhaustiveDependencies",
    "import {useEffect} from 'react'; export function Demo({value}: {value: number}) { useEffect(() => { console.log(value); }, []); return null; }"],
  ["missing image alternative text", "tsx", "a11y/useAltText",
    "export function Demo() { return <img src='/fixture.jpg' />; }"],
  ["labels on elements without a supported role", "tsx", "a11y/useAriaPropsSupportedByRole",
    "export function Demo() { return <div aria-label='Preview'>Content</div>; }"],
];

for (const [name, extension, rule, source] of invalidCases) {
  test(`the configured linter rejects ${name}`, async () => {
    const result = await lint(source, extension);
    assert.equal(result.status, 1);
    assert.ok(result.report.diagnostics.some((diagnostic) => diagnostic.category === `lint/${rule}`),
      `the expected rule catches the fixture: ${rule}`);
  });
}

test("the configured linter accepts a valid typed React component with hooks", async () => {
  const result = await lint("import {useState} from 'react'; export function Demo() { const [count, setCount] = useState(0); return <button type='button' onClick={() => setCount(count + 1)}>Count {count}</button>; }");
  assert.equal(result.status, 0);
  assert.deepEqual(result.report.diagnostics, []);
});

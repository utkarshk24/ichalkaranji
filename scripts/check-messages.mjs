// Fails if mr.json or hi.json is missing a key that en.json has (or has extra keys),
// or if an ICU placeholder such as {date} differs between languages.
import { readdirSync, readFileSync } from "node:fs";

const load = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, String(v)]],
  );
const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

const en = new Map(flatten(load("en")));
let failed = false;

for (const locale of ["mr", "hi"]) {
  const other = new Map(flatten(load(locale)));
  for (const [key, value] of en) {
    if (key.startsWith("_meta")) continue;
    if (!other.has(key)) {
      console.error(`[${locale}] missing key: ${key}`);
      failed = true;
    } else if (placeholders(value) !== placeholders(other.get(key))) {
      console.error(`[${locale}] placeholder mismatch in ${key}`);
      failed = true;
    }
  }
  for (const key of other.keys()) {
    if (!en.has(key)) {
      console.error(`[${locale}] extra key not in en.json: ${key}`);
      failed = true;
    }
  }
}

// Content rule: Western digits everywhere (Indian grouping is applied by the formatter).
const devanagariDigits = /[\u0966-\u096F]/;
const scan = (dir) =>
  readdirSync(new URL(dir, import.meta.url), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? scan(`${dir}${e.name}/`) : e.name.endsWith(".json") ? [`${dir}${e.name}`] : [],
  );
for (const file of [...scan("../messages/"), ...scan("../data/")]) {
  const text = readFileSync(new URL(file, import.meta.url), "utf8");
  if (devanagariDigits.test(text)) {
    console.error(`${file.replace("../", "")}: uses Devanagari digits — use Western digits (0-9)`);
    failed = true;
  }
  // ICU "#" is formatted with the locale's own numerals (Devanagari for mr); write {count} instead.
  if (file.includes("messages/") && /plural,[^"]*#/.test(text)) {
    console.error(`${file.replace("../", "")}: plural uses "#" — write {count} so digits stay Western`);
    failed = true;
  }
}

// Trilingual data: every { en, … } text object in data/ must also have non-empty mr and hi.
const checkLocalized = (node, file, path = "") => {
  if (Array.isArray(node)) return node.forEach((v, i) => checkLocalized(v, file, `${path}[${i}]`));
  if (!node || typeof node !== "object") return;
  if (typeof node.en === "string") {
    for (const l of ["en", "mr", "hi"]) {
      if (typeof node[l] !== "string" || !node[l].trim()) {
        console.error(`${file}${path}: missing "${l}" text`);
        failed = true;
      }
    }
    return;
  }
  for (const [k, v] of Object.entries(node)) checkLocalized(v, file, `${path}.${k}`);
};
for (const file of scan("../data/")) checkLocalized(JSON.parse(readFileSync(new URL(file, import.meta.url), "utf8")), file.replace("../", ""));

if (failed) process.exit(1);
console.log(`Messages OK: ${en.size} keys in en, mr, hi; all data/ text is trilingual.`);

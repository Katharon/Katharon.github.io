import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const origin = "https://katharon.github.io";
const routes = { en: "/", de: "/de/" };
const read = (path) => readFileSync(resolve(root, path), "utf8");

// These small helpers inspect the known HTML/XML emitted by this project, not arbitrary HTML.
function decode(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" };
    if (entity.toLowerCase() in named) return named[entity.toLowerCase()];
    const hex = entity.toLowerCase().startsWith("&#x");
    return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10));
  });
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
      match[1].toLowerCase(),
      decode(match[2] ?? match[3]),
    ]),
  );
}

const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]));

function one(items, predicate, label) {
  const matches = items.filter(predicate);
  assert.equal(matches.length, 1, `${label}: expected exactly one, found ${matches.length}`);
  return matches[0];
}

function checkPng(url, expectedPath, width, height) {
  const parsed = new URL(url, origin);
  assert.equal(parsed.origin, origin, `${expectedPath}: image must be self-hosted`);
  assert.equal(parsed.pathname, expectedPath, "Image URL must use the stable .png path");
  assert.equal(parsed.search, "", "Image URL must not depend on a generated query string");
  const png = readFileSync(resolve(root, `.${parsed.pathname}`));
  assert.ok(png.length >= 24, `${expectedPath}: PNG header is missing`);
  assert.ok(
    png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    `${expectedPath}: invalid PNG signature`,
  );
  assert.equal(png.toString("ascii", 12, 16), "IHDR", `${expectedPath}: missing IHDR`);
  assert.equal(png.readUInt32BE(16), width, `${expectedPath}: unexpected width`);
  assert.equal(png.readUInt32BE(20), height, `${expectedPath}: unexpected height`);
}

for (const [locale, route] of Object.entries(routes)) {
  const html = read(route === "/" ? "index.html" : "de/index.html");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, `${route}: missing head element`);
  assert.equal(tags(html, "html")[0]?.lang, locale, `${route}: wrong HTML language`);
  const links = tags(head, "link");
  const metas = tags(head, "meta");
  const meta = (name) =>
    one(metas, (item) => item.name === name || item.property === name, name).content;
  const canonical = one(links, (item) => item.rel === "canonical", `${route} canonical`).href;
  assert.equal(canonical, `${origin}${route}`, `${route}: incorrect canonical`);
  for (const [language, path] of [...Object.entries(routes), ["x-default", "/"]]) {
    const alternate = one(
      links,
      (item) => item.rel === "alternate" && item.hreflang === language,
      `${route} hreflang=${language}`,
    );
    assert.equal(alternate.href, `${origin}${path}`, "Language alternates must be reciprocal");
  }
  assert.match(meta("description"), /\S+/, `${route}: missing description`);
  assert.match(head, /<title>Lukas Stumpfel\s*\|/, `${route}: name missing from title`);
  for (const name of ["robots", "googlebot"]) {
    const directives = meta(name)
      .toLowerCase()
      .split(/\s*,\s*/);
    assert.ok(directives.includes("index") && directives.includes("follow"), `${route}: ${name}`);
    assert.ok(!directives.includes("noindex"), `${route}: accidentally excluded from indexing`);
  }
  assert.match(
    meta("googlebot"),
    /max-image-preview:large/,
    "Large image previews must be allowed",
  );
  const icon = one(links, (item) => item.rel === "icon", `${route} favicon`);
  const apple = one(links, (item) => item.rel === "apple-touch-icon", `${route} Apple icon`);
  for (const image of [icon, apple]) assert.equal(image.type, "image/png");
  assert.equal(icon.sizes, "64x64");
  assert.equal(apple.sizes, "180x180");
  checkPng(icon.href, "/favicon.png", 64, 64);
  checkPng(apple.href, "/apple-touch-icon.png", 180, 180);
  assert.equal(meta("og:url"), canonical);
  assert.equal(meta("og:type"), "website");
  assert.equal(meta("og:image:type"), "image/png");
  assert.equal(meta("og:image:width"), "1200");
  assert.equal(meta("og:image:height"), "630");
  assert.ok(meta("og:image:alt").length > 0);
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert.equal(meta("twitter:image"), meta("og:image"));
  assert.ok(meta("twitter:image:alt").length > 0);
  checkPng(meta("og:image"), `/images/social-preview-${locale}.png`, 1200, 630);

  const scripts = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(
    (match) => attributes(match[1]).type === "application/ld+json",
  );
  assert.equal(scripts.length, 1, `${route}: expected one structured-data graph`);
  assert.ok(!scripts[0][2].includes("<"), "JSON-LD must escape '<' in HTML script content");
  const data = JSON.parse(scripts[0][2]);
  assert.equal(data["@context"], "https://schema.org");
  assert.ok(Array.isArray(data["@graph"]), `${route}: missing graph`);
  const graph = data["@graph"];
  const website = one(graph, (item) => item["@type"] === "WebSite", "WebSite");
  const person = one(graph, (item) => item["@type"] === "Person", "Person");
  const page = one(graph, (item) => item["@type"] === "ProfilePage", "ProfilePage");
  assert.equal(
    new Set(graph.map((item) => item["@id"])).size,
    graph.length,
    "Duplicate entity IDs",
  );
  assert.equal(website.url, `${origin}/`);
  assert.equal(website.name, "Lukas Stumpfel Portfolio");
  assert.equal(person["@id"], `${origin}/#person`);
  assert.equal(person.name, "Lukas Stumpfel");
  assert.deepEqual(person.sameAs, [
    "https://github.com/Katharon",
    "https://www.linkedin.com/in/lukas-stumpfel/",
  ]);
  assert.ok(!("image" in person), "Do not substitute a logo or artwork for a Person portrait");
  assert.equal(page.url, canonical);
  assert.equal(page.inLanguage, locale);
  assert.equal(page.mainEntity["@id"], person["@id"]);
  assert.equal(page.isPartOf["@id"], website["@id"]);
  console.log(`SEO OK: ${route} (language, canonical, metadata, PNGs and structured data)`);
}

const robots = read("robots.txt");
assert.match(robots, /^User-Agent:\s*\*/im);
assert.match(robots, /^Allow:\s*\/$/im);
assert.ok(!/^Disallow:\s*\/\*?\s*$/im.test(robots), "Portfolio must remain crawlable");
assert.match(robots, /^Sitemap:\s*https:\/\/katharon\.github\.io\/sitemap\.xml\s*$/im);
const sitemap = read("sitemap.xml");
assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
assert.equal(entries.length, 2, "Sitemap must contain exactly the two public language pages");
for (const path of Object.values(routes)) {
  const entry = one(
    entries,
    (item) => item.includes(`<loc>${origin}${path}</loc>`),
    `Sitemap ${path}`,
  );
  for (const [language, alternate] of [...Object.entries(routes), ["x-default", "/"]]) {
    const link = one(tags(entry, "xhtml:link"), (item) => item.hreflang === language, language);
    assert.equal(link.rel, "alternate");
    assert.equal(link.href, `${origin}${alternate}`);
  }
}
assert.equal(
  read("google1ef336e444d8d25d.html").trim(),
  "google-site-verification: google1ef336e444d8d25d.html",
  "Existing Search Console verification file must remain unchanged",
);
for (const path of ["styleguide/index.html", "styleguide.html"]) {
  const meta = one(tags(read(path), "meta"), (item) => item.name === "robots", `${path} robots`);
  assert.equal(meta.content, "noindex, follow", `${path}: internal reference should not rank`);
}
console.log("SEO OK: robots.txt, sitemap, verification and styleguide indexing policy");
console.log(
  "Local export checks passed. Google indexing, rankings and live HTTP headers are not tested.",
);

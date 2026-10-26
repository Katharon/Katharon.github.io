import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const guideDirectory = resolve(root, "public/styleguide");
const mimeTypes = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".css": "text/css",
  ".js": "text/javascript",
  ".pdf": "application/pdf",
};
const dataUrl = (path) =>
  "data:" +
  (mimeTypes[extname(path)] ?? "application/octet-stream") +
  ";base64," +
  readFileSync(path).toString("base64");
let html = readFileSync(resolve(guideDirectory, "index.html"), "utf8");
html = html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g, (_, href) => {
  const cssPath = resolve(guideDirectory, href);
  let css = readFileSync(cssPath, "utf8");
  css = css.replace(/url\(["']?([^)"']+)["']?\)/g, (match, url) =>
    url.startsWith("data:") ? match : 'url("' + dataUrl(resolve(dirname(cssPath), url)) + '")',
  );
  return "<style>\n" + css + "\n</style>";
});
const scripts = [];
html = html.replace(/<script\s+src="([^"]+)"\s+defer><\/script>/g, (_, src) => {
  scripts.push(
    "<script>\n" +
      readFileSync(resolve(guideDirectory, src), "utf8").replace(/<\/script/gi, "<\\/script") +
      "\n</script>",
  );
  return "";
});
html = html.replace(
  /(data-theme-src-light|data-theme-src-dark|src|href)="(\.\.\/(?:images|cv)\/[^"]+)"/g,
  (_, attribute, href) => attribute + '="' + dataUrl(resolve(guideDirectory, href)) + '"',
);
html = html.replace(
  /href="(\.\.\/design\/(?:tokens\.json|tokens\.css))"/g,
  (_, href) => 'href="' + dataUrl(resolve(guideDirectory, href)) + '"',
);
html = html.replace("</body>", scripts.join("\n") + "\n</body>");
writeFileSync(resolve(root, "styleguide.html"), html);
if (existsSync(resolve(root, "out"))) writeFileSync(resolve(root, "out/styleguide.html"), html);
console.log("Exported standalone styleguide.html with embedded local assets.");
